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

fixture`Lectures & Lessons`.page(`${link}/lessons/virtual`);

test('Sanity Test 2', async t => {



    // Check 2 filters under Virtual Lessons Open site kabbalahmedia.info Press Ctrl + F5
    // (refresh & clear cash) Browser Window - press Full Screen Switch IF language to English Press on sidebar menu: Lectures & Lessons Press On Tab “Virtual Lessons” Choose filter Collections-> “Webinar with Dr Michael Laitman” & press Apply
    // Verify > 600 results (now it’s 631) Press Ctrl + F5
    // Verify >600 results Switch Interface Language to German
    // Verify > 600 results Press Ctrl + F5
    // Verify > 600 results Press Back Again in English Interface - Press filter Sources -> Baal Hasulam & press Apply Ctrl + F5 Verify >100 results Remove Filter Collections Remove filter Sources
    // In the end - verify more than 10,000 results
});










