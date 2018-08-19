/*
    Common Sanity Test - Check the follow elements are on the page
    ---------------------------------------------
    1. Sidebar
    2. Title
    3. Header
    4. Footer
*/

// BB Archive predefined constants
const texts = require('../src/texts');
const selectors = require('../src/selectors');
const tcUtils = require('../src/tc_utils');

import {Selector} from 'testcafe';

fixture`Project Status`
    .page('https://kabbalahmedia.info/en/project-status');


test('Sanity test - Project Status', async t => {
    // select tabs
    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);
    const title = await Selector(selectors.projectStatus.title).innerText;
    const uiStatus = await tcUtils.multipleSelect(selectors.projectStatus.uiStatus);
    const footerTxt = await Selector(selectors.common.footer).innerText;


    // run test
    await t
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(title).eql(texts.projectStatus.title)
        .expect(uiStatus).eql(texts.projectStatus.uiStatus)
        .expect(Selector(selectors.common.pagination).exists).notOk()
        .expect(footerTxt.replace(/\n|\r/g, '')).eql(texts.common.footer);

});

