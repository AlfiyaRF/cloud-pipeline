# Copyright 2021 EPAM Systems, Inc. (https://www.epam.com/)
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
import jwt


def auth(request):
    jwt_token = request.headers.get('Authorization', None)
    if jwt_token:
        try:
            payload = jwt.decode(
                jwt_token.replace("Bearer ", ""),
                open(
                    os.getenv("CP_API_JWT_PUB_KEY",
                              os.path.join(
                                os.getenv("CP_GITLAB_READER_HOME", "/opt/gitlab-reader/gitreader"),
                                "pub-jwt-key.pem"
                              )
                    )
                ).read(),
                algorithms=["RS512"]
            )
            if not payload or 'roles' not in payload or 'ROLE_ADMIN' not in payload['roles']:
                raise RuntimeError("Token is not an admin token.")
            else:
                return True
        except (jwt.DecodeError, jwt.ExpiredSignatureError):
            raise RuntimeError("Token verification error.")
    else:
        raise RuntimeError("No JWT token is provided")
