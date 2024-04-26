/*
 * Copyright 2017-2020 EPAM Systems, Inc. (https://www.epam.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {
  OmicsClient,
  CreateMultipartReadSetUploadCommand,
  UploadReadSetPartCommand,
  ListReadSetUploadPartsCommand,
  CompleteMultipartReadSetUploadCommand,
  AbortMultipartReadSetUploadCommand
} from '@aws-sdk/client-omics';
import {observable} from 'mobx';
import fetchTempCredentials from '../s3-upload/fetch-temp-credentials';
import Credentials from '../s3-upload/credentials';
import displaySize from '../../utils/displaySize';

const KB = 1024;
const MB = 1024 * KB;
const GB = 1024 * MB;
const TB = 1024 * GB;
const MAX_FILE_SIZE_TB = 5;

const KiB = 1024;
const MiB = 1024 * KiB;

const MAX_PART_SIZE = 100 * MiB;

const MAX_FILE_SIZE = MAX_FILE_SIZE_TB * TB;
const MAX_FILE_SIZE_DESCRIPTION = displaySize(MAX_FILE_SIZE, false);

const FETCH_CREDENTIALS_MAX_ATTEMPTS = 12;
const UPLOAD_PART_MAX_ATTEMPTS = 5;

const SOURCE1 = 'SOURCE1';
const SOURCE2 = 'SOURCE2';

export {MAX_FILE_SIZE_DESCRIPTION, SOURCE1, SOURCE2};

class OmicsStorage {
  _omics;
  _credentials;
  regionName;
  _storage;
  @observable uploadPercentageSource1 = 0;
  @observable uploadPercentageSource2 = 0;
  @observable uploadError = null;

  get omics () {
    return this._omics;
  }

  constructor (config) {
    this.regionName = config.region;
    this._storage = config.storage;
  }

  async createClient () {
    await this.setCredentials();
    if (this._credentials) {
      return this.setOmicsClient();
    }
  }

  async getCredentials () {
    try {
      const updateCredentialsAttempt = (attempt = 0, error = undefined) => {
        if (attempt >= FETCH_CREDENTIALS_MAX_ATTEMPTS) {
          return Promise.reject(error || new Error('credentials API is not available'));
        }
        return new Promise((resolve, reject) => {
          fetchTempCredentials(
            this._storage.id,
            {
              read: this._storage.read === undefined ? true : this._storage.read,
              write: this._storage.write === undefined ? true : this._storage.write
            })
            .then(resolve)
            .catch((e) => {
              updateCredentialsAttempt(attempt + 1, e)
                .then(resolve)
                .catch(reject);
            });
        });
      };
      const {error, payload} = await updateCredentialsAttempt();
      if (error) {
        return Promise.reject(error);
      }
      return Promise.resolve(payload);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async setCredentials () {
    const credentials = await this.getCredentials()
      .then(cred => cred)
      .catch(err => {
        this.uploadError = err;
        return undefined;
      });
    if (!this._credentials) {
      this._credentials = new Credentials(
        credentials.keyID,
        credentials.accessKey,
        credentials.token,
        credentials.expiration,
        this.getCredentials
      );
    } else if (this._credentials.needsRefresh) {
      this._credentials.update(
        credentials.keyID,
        credentials.accessKey,
        credentials.token,
        credentials.expiration
      );
    }
  }

  setOmicsClient () {
    if (this._credentials && this.regionName) {
      this._omics = new OmicsClient({
        omics: '2022-11-28',
        region: this.regionName,
        credentials: this._credentials
      });
      return true;
    }
    return false;
  }

  createUpload = async (params) => {
    if (!this._omics) return;
    try {
      const command = new CreateMultipartReadSetUploadCommand(params);
      const response = await this._omics.send(command);
      if (response) {
        this.uploadId = response.uploadId;
        this.sequenceStoreId = params.sequenceStoreId;
      }
      return true;
    } catch (err) {
      this.uploadId = undefined;
      this.sequenceStoreId = undefined;
      this.uploadError = err;
      return false;
    }
  }

  getParts = (file, partCounts) => {
    const parts = [];
    for (let partNumber = 1; partNumber <= partCounts; partNumber++) {
      const start = (partNumber - 1) * MAX_PART_SIZE;
      let end = Math.min(start + MAX_PART_SIZE, file.size);
      parts.push({
        filePart: file.slice(start, end),
        partNumber,
        name: file.name
      });
    }
    return parts;
  }

  uploadFile = async (file, source) => {
    if (this.uploadId) {
      const partCounts = Math.ceil(file.size / MAX_PART_SIZE);
      const parts = this.getParts(file, partCounts);
      for (let i = 0; i < parts.length; i++) {
        const uploaded = await this.uploadPart(parts[i], source, 1);
        if (uploaded) {
          let percentage = (parts[i].partNumber * 100) / partCounts;
          if (source === SOURCE1) {
            this.uploadPercentageSource1 = percentage;
          }
          if (source === SOURCE2) {
            this.uploadPercentageSource2 = percentage;
          }
        } else {
          return false;
        }
      }
      this.listParts = await this.getListParts(source);
      if (this.listParts && this.listParts.length && this.listParts.length === partCounts) {
        if (source === SOURCE1) {
          this.uploadPercentageSource1 = 100;
        }
        if (source === SOURCE2) {
          this.uploadPercentageSource2 = 100;
        }
        return true;
      } else {
        return false;
      }
    }
  }

  uploadPart = async (part, source, attempt) => {
    try {
      if (attempt <= UPLOAD_PART_MAX_ATTEMPTS) {
        const input = {
          sequenceStoreId: this.sequenceStoreId,
          uploadId: this.uploadId,
          partSource: source,
          partNumber: part.partNumber,
          payload: part.filePart
        };
        const command = new UploadReadSetPartCommand(input);
        const response = await this._omics.send(command);
        console.log(response)
        return response.checksum;
      }
    } catch (err) {
      console.log(err)
      this.uploadError = err;
      if (attempt < (UPLOAD_PART_MAX_ATTEMPTS - 1)) {
        await this.uploadPart(part, source, attempt + 1);
      } else {
        return null;
      }
    }
  }

  getListParts = async (source) => {
    try {
      const input = {
        sequenceStoreId: this.sequenceStoreId,
        uploadId: this.uploadId,
        partSource: source
      };
      const command = new ListReadSetUploadPartsCommand(input);
      const response = await this._omics.send(command);
      return response.parts;
    } catch (err) {
      this.uploadError = err;
      return false;
    }
  }

  completeUpload = async () => {
    try {
      const input = {
        sequenceStoreId: this.sequenceStoreId,
        uploadId: this.uploadId,
        parts: this.listParts.map(part => ({
          partNumber: part.partNumber,
          partSource: part.partSource,
          checksum: part.checksum
        }))
      };
      const command = new CompleteMultipartReadSetUploadCommand(input);
      const response = await this._omics.send(command);
      this.readSetId = response.readSetId;
      return true;
    } catch (err) {
      this.uploadError = err;
      return false;
    }
  }

  abortUpload = async () => {
    try {
      const input = {
        sequenceStoreId: this.sequenceStoreId,
        uploadId: this.uploadId
      };
      const command = new AbortMultipartReadSetUploadCommand(input);
      await this._omics.send(command);
    } catch (err) {
      this.uploadError = err;
    }
  }
}

export default OmicsStorage;
