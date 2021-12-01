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

import {Variables} from './variable-descriptions';

function mapConfiguration (item) {
  if (typeof item === 'string') {
    return {
      key: item,
      advanced: false
    };
  }
  return item;
}

const alerts = [
  Variables.alertErrorBackground,
  {
    key: Variables.alertErrorBorder,
    advanced: true
  },
  Variables.alertErrorIcon,
  Variables.alertInfoBackground,
  {
    key: Variables.alertInfoBorder,
    advanced: true
  },
  Variables.alertInfoIcon,
  Variables.alertWarningBackground,
  {
    key: Variables.alertWarningBorder,
    advanced: true
  },
  Variables.alertWarningIcon,
  Variables.alertSuccessBackground,
  {
    key: Variables.alertSuccessBorder,
    advanced: true
  },
  Variables.alertSuccessIcon
];

const buttons = [
  Variables.primaryColor,
  Variables.primaryTextColor,
  {
    key: Variables.primaryHoverColor,
    advanced: true
  },
  {
    key: Variables.btnPrimaryActive,
    advanced: true
  },
  {
    key: Variables.btnDangerActiveColor,
    advanced: true
  },
  Variables.btnDangerBackgroundColor,
  Variables.btnDangerColor,
  Variables.btnDisabledBackgroundColor,
  Variables.btnDisabledColor
];

const cards = [
  Variables.cardBackgroundColor,
  {
    key: Variables.cardHeaderBackground,
    advanced: true
  },
  Variables.cardBorderColor,
  {
    key: Variables.cardServiceBackgroundColor,
    advanced: true
  }
];

const input = [
  Variables.inputBackground,
  Variables.inputColor,
  Variables.inputBorder,
  Variables.inputPlaceholderColor,
  {
    key: Variables.inputBorderHoverColor,
    advanced: true
  }, {
    key: Variables.inputAddon,
    advanced: true
  },
  {
    key: Variables.inputBackgroundDisabled,
    adnaved: true
  }
];

const main = [
  Variables.applicationBackgroundColor,
  Variables.panelBackgroundColor,
  Variables.applicationColor
];

const menus = [
  Variables.menuBorderColor,
  Variables.menuColor,
  {
    key: Variables.elementHoverColor,
    advanced: true
  }, {
    key: Variables.elementHoverBackgroundColor,
    advanced: true
  }
];

const navigation = [
  Variables.navigationPanelColor,
  Variables.navigationItemColor,
  Variables.navigationItemRunsColor,
  {key: Variables.navigationPanelColorImpersonated, advanced: true},
  {key: Variables.navigationPanelHighlightedColor, advanced: true},
  {key: Variables.navigationPanelHighlightedColorImpersonated, advanced: true}
];

const tables = [
  Variables.tableBorderColor,
  Variables.tableHeadColor,
  {
    key: Variables.tableElementHoverColor,
    advanced: true
  }, {
    key: Variables.tableElementSelectedBackgroundColor,
    advanced: true
  }, {
    key: Variables.tableElementSelectedColor,
    advanced: true
  }
];

const sections = {
  alerts: 'Alerts',
  buttons: 'Buttons',
  cards: 'Cards',
  input: 'Forms',
  main: 'Main',
  menu: 'Menu',
  navigation: 'Navigation panel',
  tables: 'Tables'
};

const sectionsConfiguration = {
  [sections.alerts]: alerts.map(mapConfiguration),
  [sections.buttons]: buttons.map(mapConfiguration),
  [sections.cards]: cards.map(mapConfiguration),
  [sections.input]: input.map(mapConfiguration),
  [sections.main]: main.map(mapConfiguration),
  [sections.menu]: menus.map(mapConfiguration),
  [sections.navigation]: navigation.map(mapConfiguration),
  [sections.tables]: tables.map(mapConfiguration)
};

const orderedSections = [
  sections.main,
  sections.navigation,
  sections.menu,
  sections.cards,
  sections.tables,
  sections.buttons,
  sections.input,
  sections.alerts
];

export {
  orderedSections as sections,
  sections as sectionNames,
  sectionsConfiguration
};
