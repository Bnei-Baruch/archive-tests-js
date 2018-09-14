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
import {ClientFunction} from 'testcafe';

const link = `${config.basePath}/${config.lang}/lessons`;
const getLocation = ClientFunction(() => window.location.href);

fixture`Lectures & Lessons`.page(`${link}`);
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


fixture`Lectures & Lessons`.page(`${link}`);
test('Apply Daily Filter', async t => {

    await t
        .maximizeWindow();

    const tab = 'Lectures';
    const filterName = 'Sources';
    const input = 'Ramchal';

    await tcUtils.applyFilter(tab, filterName, input);
});


fixture`Lectures & Lessons`.page(`${link}`);
test('Apply Topic Filter', async t => {

    /*
       filter Topic -> Jewish Culture -> Holidays->17 Tammuz & press Apply button
              ==> Verify 8 results
       Switch Interface Language to Russian ==>  Verify 8 results
       Press Back ==>
            Verify we are again in English Interface and 8 filter results
       Press Remove Filter button ==>  Verify more than 10,000 results
       Pagination: move to page 3 ==> Verify Results shown: 21-30
       Press Back ==> Results shown 1-10 again
    */

    const results_1_8 = '1 - 8';// of 8
    const results_1_10 = '1 - 10';
    const results_21_30 = '21 - 30';
    const results10K = 10000; //'Results 1 - 10 of 10875';
    const enLessons = '/en/lessons';
    const ruLessons = '/ru/lessons';

    const tab = 'Daily Lessons';
    const filterName = 'Topics';
    const input = 'Jewish culture/Holidays/17 Tamuz';

    await t
        .maximizeWindow()

        //todo - need update applyFilter to support multiple levels
        // await tcUtils.applyFilter(tab, filterName, input);

        .click(Selector('a').withText(tab))
        .click(Selector('small').withText(filterName))
        .click(Selector('a').withText('Jewish culture'))
        .click(Selector('a').withText('Holidays'))
        .click(Selector('a').withText('17 Tamuz'))
        .click(Selector('button').withText('Apply'))

        .expect(Selector(selectors.common.headerPagination).innerText).contains(results_1_8)

        .click(Selector('.ui.item.dropdown'))
        .click(Selector('a').withText('Russian'))
        .expect(Selector(selectors.common.headerPagination).innerText).contains(results_1_8)

        .expect(getLocation()).contains(ruLessons);

    //await ClientFunction(() => window.history.back());
    const goBack = ClientFunction(() => window.history.back());
    await goBack();

    await t
        //check En Interface+ 1-8 results
        .expect(getLocation()).contains(enLessons)
        .expect(Selector(selectors.common.headerPagination).innerText).contains(results_1_8)

        //press Remove button
        .click(Selector('.times.icon'));


    const total = await Selector(selectors.common.headerPagination).innerText;
    await t
        //verify more 10,000 results
        .expect(tcUtils.getTotalResults(total)).gt(results10K)

        // Pagination: move to page 3, Verify Results shown: 21-30
        .click(Selector('.item.distance-2'))
        .expect(Selector(selectors.common.headerPagination).innerText).contains(results_21_30);

    //Press Back, Verify Results shown 1-10 again
    //const goBack = ClientFunction(() => window.history.back());
    await goBack();

    await t
        .expect(Selector(selectors.common.headerPagination).innerText).contains(results_1_10);

});


// npm run testcafe chrome _tests_/02-lecturesLessonsPage.ts








