/*
    Common Sanity Test - Check the follow elements are on the page
    ---------------------------------------------
    1. Sidebar
    2. Title and Subtitle
    3. Header
    4. Tabs
    5. Filters
    6. Footer
*/

import {Selector} from 'testcafe';
import selectors from '../src/selectors'
import texts from '../src/texts'
import config from '../src/config'
import tcUtils from '../src/tc_utils'
import {debug} from "util";

const link = `${config.basePath}/${config.lang}`;
fixture`Lectures & Lessons`.page(`${link}/lessons`);

test('Smoke Test - Lectures & Lessons', async t => {

    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);
    const headerTabs = await tcUtils.multipleSelect(selectors.lessons.headerTabs);
    const filterTabs = await tcUtils.multipleSelect(selectors.common.filterTabsNames);
    const footerTxt = await Selector(selectors.common.footer).innerText;

    await t
        .maximizeWindow()
        .expect(sidebarTabs).eql(texts.common.sideBar)
        .expect(Selector(selectors.common.title).innerText).eql(texts.lessons.title)
        .expect(Selector(selectors.common.subtitle).innerText).eql(texts.lessons.subtitle)
        .expect(Selector(selectors.common.headerPagination).innerText).contains(texts.common.paginationResults)
        .expect(headerTabs).eql(texts.lessons.headerTabNames)
        .expect(filterTabs).eql(texts.lessons.filterTabNames)
        .expect(Selector(selectors.common.pagination).exists).ok()
        .expect(tcUtils.replaceSpaces(footerTxt)).eql(texts.common.footer);
});

fixture`Lectures & Lessons`.page(`${link}/lessons/rabash`);

test('Apply Daily Filter', async t => {

    await t
        .maximizeWindow();

    const urlPage = `${link}/lessons/rabash`;
    const tab = 'Rabash Lessons';
    const filterName = 'Sources';
    const input = 'Rabash';

    await tcUtils.applyFilter(urlPage, tab, filterName, input);

});

// npm run testcafe chrome _tests_/02-lecturesLessonsPage.ts








