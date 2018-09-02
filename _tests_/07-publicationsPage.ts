/*
    Publications Sanity Test - Check the follow elements are on the page
    ---------------------------------------------
    - Sidebar
    - Title and Subtitle
    - Header pagination [Results 1 - 10]
    - Header tabs
    - Pagination [items = 10]
    - Filters
    - Footer pagintaion
    - Footer text
*/

import {Selector} from 'testcafe';
import selectors from '../src/selectors'
import texts from '../src/texts'
import config from '../src/config'
import tcUtils from '../src/tc_utils'

const link = `${config.basePath}/${config.lang}`;
fixture`Publications`.page(`${link}/publications`);

test('Smoke Test - Publications', async t => {

    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);
    const title = await Selector(selectors.common.title).innerText;
    const subtitle = await Selector(selectors.common.subtitle).innerText;
    const headerPagination = await Selector(selectors.common.headerPagination).innerText;
    const paginationItems = await tcUtils.multipleSelect(selectors.publications.paginationItem);
    const headerTabs = await tcUtils.multipleSelect(selectors.publications.headerTabs);
    const filterTabs = await tcUtils.multipleSelect(selectors.common.filterTabsNames);
    const pagination = await Selector(selectors.common.pagination);
    const footerTxt = await Selector(selectors.common.footer).innerText;

    await t
        .maximizeWindow()
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(title).eql(texts.publications.title)
        .expect(subtitle).eql(texts.publications.subtitle)
        .expect(headerPagination).contains(texts.common.paginationResults)
        .expect(paginationItems.length).eql(10)
        .expect(headerTabs).eql(texts.publications.headerTabNames)
        .expect(filterTabs).eql(texts.publications.filterTabNames)
        .expect(pagination.exists).ok()
        .expect(tcUtils.replaceSpaces(footerTxt)).eql(texts.common.footer);
});

