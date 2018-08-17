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
    // select sidebar tabs
    const sidebarTabs = await tcUtils.multipleSelect(selectors.common.sideBar);

    // test sidebar tabs are equal to expected
    await t.expect(sidebarTabs).eql(texts.common.sideBar);

    // test title
    await t.expect(Selector(selectors.common.title).innerText).eql(texts.sources.title);

    // test subtitle
    await t.expect(Selector(selectors.common.subtitle).innerText).eql(texts.sources.subtitle);

    // Find tabs and check their names
    const authorsList = await tcUtils.multipleSelect(selectors.sources.authorsList);
    await t.expect(authorsList).eql(texts.sources.authors);

    // Fetching all all sources from page to one array and compare
    const sourcesListByAuthor = await Selector(selectors.sources.sourcesListByAuthor);
    let sourcesListsFormTest = [];
    for (let sourceKey in texts.sources.sourcesList) {
        if (texts.sources.sourcesList.hasOwnProperty(sourceKey)) {
            for (let i = 0; i < texts.sources.sourcesList[sourceKey].length; i++) {
                sourcesListsFormTest.push(texts.sources.sourcesList[sourceKey][i]);
            }
        }
    }

    let sourcesListsFromSite = [];
    for (let i = 0; i < await sourcesListByAuthor.count; i++) {
        for (let j = 0; j < await sourcesListByAuthor.nth(i).child().count; j++) {
            sourcesListsFromSite.push(await sourcesListByAuthor.nth(i).child().nth(j).innerText);
        }
    }
    console.log(`Sources from Test: ${sourcesListsFormTest.length}`);
    console.log(`Sources from Site: ${sourcesListsFromSite.length}`);
    await t.expect(sourcesListsFromSite).eql(sourcesListsFormTest);

    // test pagination bar (Shouldn't exist on "Library" page"
    const paginationBar = await Selector(selectors.common.pagination).exists;
    await t.expect(paginationBar).notOk();

    // TEST FOOTER
    const footerTxt = await Selector(selectors.common.footer).innerText;
    // replace newlines and carriage returns
    const footer = footerTxt.replace(/\n|\r/g, "");
    await t.expect(footer).eql(texts.common.footer);
});


