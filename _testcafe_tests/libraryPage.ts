/*
    Common Sanity Test - Chceck the follow elements are on the page
    ---------------------------------------------
    1. Sidebar
    2. Title and Subtitle
    3. Header
    4. Tabs
    5. Filters
    6. Footers
*/

// BB Archive predefined constants
import {Selector} from 'testcafe';

const texts = require('../src/texts');
const selectors = require('../src/selectors');
const tcUtils = require('../src/tc_utils');

fixture`Library`
    .page('https://kabbalahmedia.info/en/sources');

test('Sanity tests - Library', async t => {
    // selectors
    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);
    const authorsList = await tcUtils.multipleSelect(selectors.sources.authorsList);
    const paginationBar = await Selector(selectors.common.pagination).exists;
    const footerTxt = await Selector(selectors.common.footer).innerText;

    // prepare test data
    const sourcesListFromTest = await tcUtils.fetchAllSourcesFromTest();
    const sourcesListFromPage = await tcUtils.fetchAllSourcesFromPage();

    // test run
    await t
        .maximizeWindow()
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(Selector(selectors.common.title).innerText).eql(texts.sources.title)
        .expect(Selector(selectors.common.subtitle).innerText).eql(texts.sources.subtitle)
        .expect(authorsList).eql(texts.sources.authors)
        .expect(sourcesListFromPage).eql(sourcesListFromTest)
        .expect(paginationBar).notOk()
        .expect(tcUtils.replaceSpaces(footerTxt)).eql(texts.common.footer);
});


