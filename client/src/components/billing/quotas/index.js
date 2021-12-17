/*
 * Copyright 2017-2019 EPAM Systems, Inc. (https://www.epam.com/)
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

import React from 'react';
import QuotasSection from './quotas-section';
import {observer} from 'mobx-react';
import {Alert} from 'antd';
import roleModel from '../../../utils/roleModel';
import * as billing from '../../../models/billing';
import LoadingView from '../../special/LoadingView';
import styles from './quotas.css';

@roleModel.authenticationInfo
@observer
class Quotas extends React.Component {
  render () {
    const {authenticatedUserInfo} = this.props;
    if (
      !authenticatedUserInfo.loaded && authenticatedUserInfo.pending
    ) {
      return (<LoadingView />);
    }
    if (authenticatedUserInfo.error) {
      return (
        <Alert
          message={authenticatedUserInfo.error}
          type="error"
        />
      );
    }
    if (!roleModel.isManager.billing(this)) {
      return (
        <Alert
          message="Access denied"
          type="error"
        />
      );
    }
    return (
      <div className={styles.container}>
        <QuotasSection quotaType={billing.quotas.keys.global} title="Global" />
        <QuotasSection quotaType={billing.quotas.keys.billingCenters} title="Billing centers" />
        <QuotasSection quotaType={billing.quotas.keys.group} title="Groups" />
        <QuotasSection quotaType={billing.quotas.keys.user} title="Users" />
      </div>
    );
  }
}

export default Quotas;
