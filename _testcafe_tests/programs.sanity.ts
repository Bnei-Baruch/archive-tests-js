/*
    Programs Sanity Test - Check the follow elements are on the page
    ---------------------------------------------
    - Sidebar
    - Title and Subtitle
    - Filters
    - Header pagination title (Results 1-10)
    - Header pagination items
    - Footer
*/

// BB Archive predefined constants
const texts = require('../src/texts');
const selectors = require('../src/selectors');
const tcUtils = require('../src/tc_utils');

import {Selector} from 'testcafe';

fixture`Programs`
    .page('https://kabbalahmedia.info/programs');


test('Programs Sanity test', async t => {
    // select tabs
    const title = await Selector(selectors.common.title).innerText;
    const subtitle = await Selector(selectors.common.subtitle).innerText;
    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);
    const filterTabs = await tcUtils.multipleSelect(selectors.common.filterTabsNames);
    const headerPagination = await Selector(selectors.common.headerPagination).innerText;
    const paginationItems = await tcUtils.multipleSelect(selectors.programs.paginationItem);
    const pagination = await Selector(selectors.common.pagination);
    const footerTxt = await Selector(selectors.common.footer).innerText;

    // run test
    await t
        .maximizeWindow()
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(title).eql(texts.programs.title)
        .expect(subtitle).eql(texts.programs.subtitle)
        .expect(headerPagination).contains(texts.common.paginationResults)
        .expect(paginationItems.length).eql(10)
        .expect(filterTabs).eql(texts.programs.filterTabNames)
        .expect(pagination.exists).ok()
        .expect(tcUtils.replaceSpaces(footerTxt)).eql(texts.common.footer);
});

