# Copyright 2017-2021 EPAM Systems, Inc. (https://www.epam.com/)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import os
import shutil
import traceback
import uuid

from fsbrowser.src.api.cloud_pipeline_api_provider import CloudPipelineApiProvider
from fsbrowser.src.git.git_client import GitClient
from fsbrowser.src.git.git_task import GitTask
from fsbrowser.src.model.git_repo_status import GitRepositoryStatus
from fsbrowser.src.model.versioned_storage import VersionedStorage

VERSION_STORAGE_IDENTIFIER = 'id'


class GitManager:

    def __init__(self, pool, tasks, logger, vs_working_directory, git_token, git_user):
        self.pool = pool
        self.tasks = tasks
        self.logger = logger
        self.root_folder = vs_working_directory
        self._create_dir_if_needed(self.root_folder)
        self.api_client = CloudPipelineApiProvider()
        self.git_client = GitClient(git_token, git_user, logger)

    def clone(self, versioned_storage_id, revision=None):
        versioned_storage = self.api_client.get_pipeline(versioned_storage_id)
        folder_name = versioned_storage.get(VERSION_STORAGE_IDENTIFIER)
        full_repo_path = os.path.join(self.root_folder, str(folder_name))
        if self._is_latest_version(versioned_storage, revision):
            revision = None
        if self._is_dir_exists(full_repo_path):
            raise RuntimeError('Repository already exists!')
        git_url = versioned_storage.get('repository')
        task_id = str(uuid.uuid4().hex)
        task = GitTask(task_id, self.logger)
        self.tasks.update({task_id: task})
        self.pool.apply_async(task.clone, [self.git_client, full_repo_path, git_url, revision])
        return task_id

    def is_head_detached(self, versioned_storage_id):
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        return self.git_client.head(full_repo_path)

    def pull(self, versioned_storage_id):
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        is_head_detached = self.is_head_detached(versioned_storage_id)
        task_id = str(uuid.uuid4().hex)
        task = GitTask(task_id, self.logger)
        self.tasks.update({task_id: task})
        self.pool.apply_async(task.pull, [self.git_client, full_repo_path, is_head_detached])
        return task_id

    def list(self):
        items = []
        for item_name in os.listdir(self.root_folder):
            full_item_path = os.path.join(self.root_folder, item_name)
            if os.path.isfile(full_item_path):
                continue
            try:
                versioned_storage = self.api_client.get_pipeline(item_name)
            except Exception:
                self.logger.log(traceback.format_exc())
                continue
            if not versioned_storage:
                self.logger.log("Versioned storage '%s' was not found" % item_name)
                continue
            versioned_storage_name = versioned_storage.get('name')
            repo_path = os.path.join(self.root_folder, item_name)
            repo = self.git_client.get_repo(repo_path)
            items.append(VersionedStorage(item_name, versioned_storage_name, repo_path,
                                          repo.get('revision'), repo.get('detached'))
                         .to_json())
        return items

    def status(self, versioned_storage_id):
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        items = self.git_client.status(full_repo_path)
        local_commits_count, _ = self.git_client.ahead_behind(full_repo_path)
        repo_status = GitRepositoryStatus()
        repo_status.files = [item.to_json() for item in items]
        repo_status.unsaved = local_commits_count > 0
        repo_status.merge_in_progress = self.git_client.merge_in_progress(full_repo_path)
        return repo_status.to_json()

    def diff(self, versioned_storage_id, file_path, show_raw_flag, lines_count=3):
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        if not file_path:
            raise RuntimeError('File path shall be specified')
        git_file_diff = self.git_client.diff(full_repo_path, file_path, show_raw_flag, context_lines=lines_count)
        if not git_file_diff:
            return None
        return git_file_diff.to_json()

    def conflicts_diff(self, versioned_storage_id, file_path, revision, show_raw_flag, fetch_conflicts=False,
                       lines_count=3):
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        if not file_path:
            raise RuntimeError('File path shall be specified')
        if not self.git_client.merge_in_progress(full_repo_path):
            if not fetch_conflicts:
                raise RuntimeError('Merge is not in progress')
            git_file_diff = self.git_client.diff(full_repo_path, file_path, show_raw_flag,
                                                 fetch_conflicts=fetch_conflicts, context_lines=lines_count)
        else:
            if not revision:
                revision = self.git_client.get_head_id(full_repo_path)
            remote_revision = self.git_client.get_last_pushed_commit_id(full_repo_path)
            git_file_diff = self.git_client.diff_between_revisions(full_repo_path, file_path, remote_revision, revision,
                                                                   show_raw_flag, context_lines=lines_count)
        if not git_file_diff:
            return None
        return git_file_diff.to_json()

    def push(self, versioned_storage_id, message, files_to_add=None):
        if self.is_head_detached(versioned_storage_id):
            raise RuntimeError('HEAD detached')
        if not message:
            raise RuntimeError('Message shall be specified')
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        task_id = str(uuid.uuid4().hex)
        task = GitTask(task_id, self.logger)
        self.tasks.update({task_id: task})
        self.pool.apply_async(task.push, [self.git_client, full_repo_path, message, files_to_add])
        return task_id

    def save_file(self, versioned_storage_id, path, content):
        if self.is_head_detached(versioned_storage_id):
            raise RuntimeError('HEAD detached')
        if not path:
            raise RuntimeError('File path shall be specified')
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        task_id = str(uuid.uuid4().hex)
        task = GitTask(task_id, self.logger)
        self.tasks.update({task_id: task})
        self.pool.apply_async(task.save_file, [full_repo_path, path, content])
        return task_id

    def get_file_path(self, versioned_storage_id, path):
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        if not path:
            raise RuntimeError('File path shall be specified')
        path_to_file = os.path.join(full_repo_path, path)
        if not os.path.exists(path_to_file):
            raise RuntimeError("Requested file does not exists")
        return path_to_file

    def revert(self, versioned_storage_id):
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        self.git_client.revert(full_repo_path)

    def remove(self, versioned_storage_id):
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        shutil.rmtree(full_repo_path)

    def checkout(self, versioned_storage_id, revision):
        if not revision:
            raise RuntimeError("Checkout revision must be specified")
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        self.git_client.checkout(full_repo_path, revision)

    def add(self, versioned_storage_id, file_path):
        full_repo_path = self._build_path_to_repo(versioned_storage_id)
        if not file_path:
            raise RuntimeError('File path shall be specified')
        git_files = self.git_client.status(full_repo_path)
        git_file = [git_file for git_file in git_files if git_file.path == file_path and git_file.is_conflicted()]
        if not git_file:
            raise RuntimeError("Path '%s' did not match any conflicted files" % file_path)
        self.git_client.add(full_repo_path, git_file[0])

    def _build_path_to_repo(self, versioned_storage_id):
        versioned_storage = self.api_client.get_pipeline(versioned_storage_id)
        folder_name = versioned_storage.get(VERSION_STORAGE_IDENTIFIER)
        return os.path.join(self.root_folder, str(folder_name))

    @staticmethod
    def _create_dir_if_needed(dir_path):
        if not dir_path:
            raise RuntimeError("Working directory for versioned storages shall be specified")
        if GitManager._is_dir_exists(dir_path):
            return
        os.makedirs(dir_path)

    @staticmethod
    def _is_dir_exists(dir_path):
        return os.path.exists(dir_path) and os.path.isdir(dir_path)

    @staticmethod
    def _is_latest_version(pipeline, revision):
        current_version = pipeline.get('currentVersion')
        return revision and current_version and current_version.get('commitId') == revision
