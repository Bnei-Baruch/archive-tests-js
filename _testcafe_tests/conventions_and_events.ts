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
import { Selector } from 'testcafe';
const texts = require('../src/texts');
const selectors = require('../src/selectors');
const tcUtils = require('../src/tc_utils');

fixture `Conventions & Events`
    .page('https://kabbalahmedia.info/en/events');


    test('Sanity tests - Conventions & Events', async t => {
        // select sidebar tabs
        const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);

        // test sidebar tabs are equal to expected
        await t.expect(sidebarTabs).eql(texts.common.sideBar);

        // test title 
        await t.expect(Selector(selectors.common.title).innerText).eql(texts.events.title);

        // test subtitle
        await t.expect(Selector(selectors.common.subtitle).innerText).eql(texts.events.subtitle);

        // test Header pagination
        await t.expect(Selector(selectors.common.headerPagination).innerText).contains(texts.events.paginationResults);

        // Find tabs and check their names
        const headerTabs = await tcUtils.multipleSelect(selectors.events.headerTabs);
        await t.expect(headerTabs).eql(texts.events.headerTabNames);

        // test filters
        const filterTabs = await tcUtils.multipleSelect(selectors.common.filterTabsNames);
        await t.expect(filterTabs).eql(texts.events.filterTabNames);


        // test pagination bar (Shouldn't exist on "Events" page"
        const paginationBar = await Selector(selectors.common.pagination).exists;
        await t.expect(paginationBar).notOk();

        // TEST FOOTER
        const footerTxt = await Selector(selectors.common.footer).innerText;
        // replace newlines and carriage returns
        const footer = footerTxt.replace(/\n|\r/g, "");
        await t.expect(footer).eql(texts.common.footer);
    });

  