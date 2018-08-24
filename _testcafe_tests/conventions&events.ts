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

fixture`Conventions & Events`
    .page('https://kabbalahmedia.info/en/events');


test('Sanity tests - Conventions & Events', async t => {
    // select tabs
    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);
    const headerTabs = await tcUtils.multipleSelect(selectors.events.headerTabs);
    const filterTabs = await tcUtils.multipleSelect(selectors.common.filterTabsNames);
    const paginationBar = await Selector(selectors.common.pagination).exists;
    const footerTxt = await Selector(selectors.common.footer).innerText;

    //run test
    await t
        .maximizeWindow()
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(Selector(selectors.common.title).innerText).eql(texts.events.title)
        .expect(Selector(selectors.common.subtitle).innerText).eql(texts.events.subtitle)
        .expect(Selector(selectors.common.headerPagination).innerText).contains(texts.events.paginationResults)
        .expect(headerTabs).eql(texts.events.headerTabNames)
        .expect(filterTabs).eql(texts.events.filterTabNames)
        .expect(paginationBar).notOk()
        .expect(footerTxt.replace(/\n|\r/g, '')).eql(texts.common.footer);
});


