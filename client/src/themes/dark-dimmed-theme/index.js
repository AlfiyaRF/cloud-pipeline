/*
 * Copyright 2017-2021 EPAM Systems, Inc. (https://www.epam.com/)
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

/* eslint-disable max-len */

export default {
  identifier: 'dark-dimmed-theme',
  name: 'Dark dimmed',
  extends: 'dark-theme',
  predefined: true,
  configuration: {
    '@application-background-color': 'rgb(40, 44, 50)',
    '@application-color': 'rgb(202, 202, 216)',
    '@application-color-faded': 'fadeout(@application-color, 20%)',
    '@application-color-disabled': 'fadeout(@application-color, 60%)',
    '@application-color-accent': 'lighten(@application-color, 10%)',
    '@primary-color': '#108ee9',
    '@primary-hover-color': 'lighten(@primary-color, 10%)',
    '@primary-active-color': '@primary-color',
    '@primary-text-color': '@application-background-color',
    '@primary-color-semi-transparent': 'fade(@primary-color, 20%)',
    '@color-green': '#118a4e',
    '@color-red': 'rgb(235, 99, 94)',
    '@color-yellow': '#c28b15',
    '@color-blue': '#108ee9',
    '@color-violet': '#c942ff',
    '@color-sensitive': '#ff5c33',
    '@color-aqua': '#008080',
    '@color-aqua-light': '#7dccc0',
    '@color-pink': '#f25e83',
    '@color-pink-dusty': '#4f4f4f',
    '@color-pink-light': '#fef0ef',
    '@color-blue-dimmed': '#458',
    '@color-grey': '#777',
    '@spinner': '@application-color',
    '@panel-background-color': 'rgb(44, 49, 55)',
    '@panel-border-color': 'rgb(28, 30, 33)',
    '@element-hover-color': '@application-color',
    '@element-hover-background-color': 'lighten(@panel-background-color, 3%)',
    '@element-selected-color': '@application-color',
    '@element-selected-background-color': 'lighten(@panel-background-color, 5%)',
    '@input-background': '@panel-background-color',
    '@input-background-disabled': 'lighten(@input-background, 5%)',
    '@input-addon': 'lighten(@input-background, 5%)',
    '@input-border': 'lighten(@application-background-color, 15%)',
    '@input-color': '@application-color',
    '@input-placeholder-color': 'fadeout(@application-color, 40%)',
    '@input-border-hover-color': '@primary-hover-color',
    '@input-shadow-color': 'rgba(202, 202, 216, 0.05)',
    '@input-search-icon-color': 'rgba(202, 202, 216, 0.3)',
    '@input-search-icon-hovered-color': '@primary-hover-color',
    '@card-background-color': 'lighten(@panel-background-color, 2%)',
    '@card-border-color': 'darken(@panel-background-color, 4%)',
    '@card-hovered-shadow-color': '@card-border-color',
    '@card-actions-active-background': '@card-background-color',
    '@card-header-background': '@card-border-color',
    '@card-service-background-color': 'lighten(@card-background-color, 5%)',
    '@card-service-border-color': '@card-service-background-color',
    '@card-service-hovered-shadow-color': 'transparent',
    '@card-service-actions-active-background': '@card-service-background-color',
    '@card-service-header-background': '@card-service-background-color',
    '@navigation-panel-color': '@application-background-color',
    '@navigation-panel-color-impersonated': '#914519',
    '@navigation-panel-highlighted-color': 'darken(@navigation-panel-color, 5%)',
    '@navigation-panel-highlighted-color-impersonated': 'darken(@navigation-panel-color-impersonated, 10%)',
    '@navigation-item-color': '@application-color',
    '@navigation-item-runs-color': '@color-green',
    '@tag-key-background-color': 'lighten(@card-background-color, 5%)',
    '@tag-key-value-divider-color': '@card-background-color',
    '@tag-value-background-color': 'lighten(@card-background-color, 5%)',
    '@nfs-icon-color': '@color-green',
    '@aws-icon': "@static_resource('icons/providers/aws-light.svg')",
    '@aws-icon-contrast': "@static_resource('icons/providers/aws-light.svg')",
    '@gcp-icon': "@static_resource('icons/providers/gcp.svg')",
    '@gcp-icon-contrast': "@static_resource('icons/providers/gcp.svg')",
    '@azure-icon': "@static_resource('icons/providers/azure.svg')",
    '@azure-icon-contrast': "@static_resource('icons/providers/azure.svg')",
    '@modal-mask-background': 'rgba(0, 0, 0, 0.6)',
    '@even-element-background': 'lighten(@card-background-color, 5%)',
    '@alert-success-background': 'darken(@color-green, 15%)',
    '@alert-success-border': '@color-green',
    '@alert-success-icon': '@color-green',
    '@alert-warning-background': 'darken(@color-yellow, 15%)',
    '@alert-warning-border': '@color-yellow',
    '@alert-warning-icon': '@color-yellow',
    '@alert-error-background': 'darken(@color-red, 15%)',
    '@alert-error-border': '@color-red',
    '@alert-error-icon': '@color-red',
    '@alert-info-background': 'darken(@color-blue, 15%)',
    '@alert-info-border': '@color-blue',
    '@alert-info-icon': '@color-blue',
    '@table-element-selected-background-color': '@element-selected-background-color',
    '@table-element-selected-color': '@element-selected-color',
    '@table-element-hover-background-color': '@element-hover-background-color',
    '@table-element-hover-color': '@element-hover-color',
    '@table-border-color': '@card-border-color',
    '@table-head-color': '@application-color-accent',
    '@menu-color': '@application-color',
    '@menu-active-color': '@application-color',
    '@menu-border-color': '@panel-border-color',
    '@btn-color': '@primary-text-color',
    '@btn-primary-active': '@primary-active-color',
    '@btn-danger-color': '@color-red',
    '@btn-danger-background-color': '@btn-disabled-background-color',
    '@btn-danger-active-color': 'darken(@btn-danger-color, 20%)',
    '@btn-disabled-color': 'lighten(@panel-background-color, 40%)',
    '@btn-disabled-background-color': 'lighten(@panel-background-color, 4%)',
    '@code-background-color': 'lighten(@card-background-color, 5%)',
    '@search-highlight-text-color': '@application-color',
    '@search-highlight-text-background-color': '@navigation-panel-color-impersonated'
  }
};
