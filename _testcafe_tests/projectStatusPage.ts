/*
    Common Sanity Test - Check the follow elements are on the page
    ---------------------------------------------
    1. Sidebar
    2. Title
    3. Header
    4. Footer
*/

import {Selector} from 'testcafe';
import selectors from '../src/selectors.js'
import texts from '../src/texts.js'
import config from '../src/config.js'

const tcUtils = require('../src/tc_utils');

const link = `${config.basePath}/${config.lang}/project-status`;

fixture`Project Status`.page(link);

test('Smoke Test - Project Status', async t => {

    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);
    const title = await Selector(selectors.projectStatus.title).innerText;
    const uiStatus = await tcUtils.multipleSelect(selectors.projectStatus.uiStatus);
    const footerTxt = await Selector(selectors.common.footer).innerText;

    await t
        .maximizeWindow()
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(title).eql(texts.projectStatus.title)
        .expect(uiStatus).eql(texts.projectStatus.uiStatus)
        .expect(Selector(selectors.common.pagination).exists).notOk()
        .expect(tcUtils.replaceSpaces(footerTxt)).eql(texts.common.footer);
});

