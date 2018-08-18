/*
    Main Page Sanity Test - Check the follow elements are on the page
    ---------------------------------------------
    - Test Common block
    -   Sidebar
    -   Title 
    -   Logo
    -   Donation button
    -   Search box
    -   Footer
    - Archive section
    - Latest updates
*/

// BB Archive predefined constants
const texts = require('../src/texts');
const selectors = require('../src/selectors');
const tcUtils = require('../src/tc_utils');

import {Selector} from 'testcafe';

fixture `Main page`
    .page('https://kabbalahmedia.info/');


test('Main page sanity test', async t => {

    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);
    const logoTxt = await Selector(selectors.common.logo).innerText;
    const logo = logoTxt.replace(/\n|\r/g, '');

    // standard block
   // await tcUtils.commonBlock(t);

    // run test
    await t
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(Selector(selectors.main.title).innerText).eql(texts.main.title)
        .expect(logo).eql(texts.common.logo)
        .expect(Selector(selectors.main.lastUpdateThumbnails).length).eql(4);
});
