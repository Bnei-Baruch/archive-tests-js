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
const texts = require('../src/texts');
const selectors = require('../src/selectors');
const tcUtils = require('../src/tc_utils');

import { Selector } from 'testcafe';  

fixture `Lectures & Lessons`
    .page('https://kabbalahmedia.info/lessons');


    test('Sanity test', async t => {
        // Find sidebar 
        const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);

        // check sidebar tabs with what expected to be
        await t.expect(sidebarTabs).eql(texts.common.sideBar);


        // Find title

        // Find subtitle

        // Find Header

        // Find tabs and check their names

        // test filters
        // const filterTabs = await tcUtils.multipleSelect(selectors.common.filterTabsNames);

        // // check filter tabs names array with what expected to be
        // await t.expect(filterTabs).eql(texts.search.filterTabNames);


        // Find footer
    });

  
