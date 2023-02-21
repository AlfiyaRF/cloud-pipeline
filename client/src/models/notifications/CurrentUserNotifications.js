/*
 * Copyright 2017-2023 EPAM Systems, Inc. (https://www.epam.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {action, computed, observable} from 'mobx';
import moment from 'moment-timezone';
import continuousFetch from '../../utils/continuous-fetch';
import CurrentUserNotificationsPaging from './CurrentUserNotificationsPaging';

const DEFAULT_PAGE_SIZE = 20;
const FETCH_INTERVAL_SECONDS = 60;

class CurrentUserNotifications extends CurrentUserNotificationsPaging {
  @observable _hideNotificationsTill;

  constructor () {
    super(0, DEFAULT_PAGE_SIZE, false);
    this.readHideNotificationsTill();
    continuousFetch({
      request: this,
      intervalMS: FETCH_INTERVAL_SECONDS * 1000
    });
  }

  @computed
  get hideNotificationsTill () {
    return this._hideNotificationsTill;
  }

  @action
  hideNotifications () {
    const timestamp = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    localStorage.setItem('hideNotificationsTill', timestamp);
    this._hideNotificationsTill = timestamp;
  }

  readHideNotificationsTill () {
    try {
      const till = localStorage.getItem('hideNotificationsTill');
      if (typeof till === 'string') {
        const date = moment.utc(till);
        if (date.isValid()) {
          this._hideNotificationsTill = date.format('YYYY-MM-DD HH:mm:ss');
        }
      }
    } catch (_) {
      // empty
    }
  }

  onFetched;
}

export {DEFAULT_PAGE_SIZE};

export default new CurrentUserNotifications();
