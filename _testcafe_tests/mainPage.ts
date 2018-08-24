/*
    Main Page Sanity Test - Check the follow elements are on the page
        sidebar
        logo
        homepageTitle
        donation button
        language dropdown
        search input
        search button
        archive thumbnails (length = 5)
        thumbnails (lenght = 2)
        update thumbnails (lenght = 4)
        footer
*/

// BB Archive predefined constants
const texts = require('../src/texts');
const selectors = require('../src/selectors');
const tcUtils = require('../src/tc_utils');

import {Selector} from 'testcafe';

fixture`Main page`
    .page('https://kabbalahmedia.info/');


test('Main page sanity test', async t => {

    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);
    const logo = await Selector(selectors.common.logo).innerText;
    const homepageTitle = await Selector(selectors.main.homepageTitle).innerText;
    const languageDropDown = await Selector(selectors.common.languageDropDown).innerText;
    const donationButton = await Selector(selectors.common.donateButton).innerText;
    const searchButton = await Selector(selectors.main.searchButton).innerText;
    const searchInput = await Selector(selectors.main.searchInput).exists;
    const footer = await Selector(selectors.common.footer).innerText;
    const thumbnails = await tcUtils.multipleSelect(selectors.main.thumbnail);
    const lastUpdateThumbnails = await tcUtils.multipleSelect(selectors.main.lastUpdateThumbnails);
    const archiveThumbnails = await tcUtils.multipleSelect(selectors.main.archiveThumbnails);

    // run test
    await t
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(tcUtils.replaceSpaces(logo)).eql(texts.common.logo)
        .expect(homepageTitle).eql(texts.main.title)
        .expect(donationButton).eql(texts.common.donateButton)
        .expect(searchInput).ok()
        .expect(searchButton).eql(texts.main.searchButton)
        .expect(tcUtils.replaceSpaces(languageDropDown)).eql(texts.common.languageDropDown)
        .expect(archiveThumbnails.length).eql(5)
        .expect(thumbnails.length).eql(2)
        .expect(lastUpdateThumbnails.length).eql(4)
        .expect(tcUtils.replaceSpaces(footer)).eql(texts.common.footer);
});
