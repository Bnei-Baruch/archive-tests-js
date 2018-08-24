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
    -   Archive section
    -   Latest updates (thumbnails)
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

    const logo = await Selector(selectors.common.logo).innerText;
    const title = await Selector(selectors.main.title).innerText;
    const language = await Selector(selectors.common.languageDropDown).innerText;
    const donationButton = await Selector(selectors.common.donateButton).innerText;
    const footer = await Selector(selectors.common.footer).innerText;

    // const logo = logoTxt.replace(/\n|\r/g, '');

    // const logoTxt = await Selector(selectors.common.logo).innerText;
    // const logo = logoTxt.replace(/\n|\r/g, '');


    const thumbnails = await tcUtils.multipleSelect(selectors.main.thumbnail);
    const lastUpdateThumbnails = await tcUtils.multipleSelect(selectors.main.lastUpdateThumbnails);
    
    // console.log('thumbnails', thumbnails);

    // standard block
   // await tcUtils.commonBlock(t);

    // run test
    await t
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(tcUtils.replaceSpaces(logo)).eql(texts.common.logo)
        .expect(title).eql(texts.main.title)
        .expect(donationButton).eql(texts.common.donateButton)
        .expect(tcUtils.replaceSpaces(language)).eql(texts.common.languageDropDown)
        .expect(thumbnails.length).eql(2)
        .expect(lastUpdateThumbnails.length).eql(4)
        .expect(tcUtils.replaceSpaces(footer)).eql(texts.common.footer);
});
