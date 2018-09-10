import {Selector} from 'testcafe';
import config from '../src/config'
import tcUtils from '../src/tc_utils'

(async () => {

    // example of use
    // tcUtils.runFilterTest('lessons', 'lectures', 'Sources', 'Rabash');    

    const urlPageName = 'lessons';
    const tabName = 'lectures';
    const filterName = 'Sources';
    const filterInput = 'Rabash';

    tcUtils.runFilterTest(urlPageName, tabName, filterName, filterInput);    

    // const baseUrl = `${config.basePath}/${config.lang}`;
    // const pageUrlPart = `${baseUrl}/${urlPageName}`;

    // // check tab existing here
    // const tabUrlPart = tabName ? `/${tabName}` : '';
    // const fullUrl = `${pageUrlPart}${tabUrlPart}`;    

    // // define selectors
    // const filterSelector = Selector('.filters__menu.menu div.filter__wrapper small')
    //                         .withText(filterName);

    // const elemSelector = Selector('.filter-popup__wrapper a.item')
    //                         .withAttribute('data-level')
    //                         .withText(filterInput);

    // const applyButtonSelector = Selector('.filter-popup__header button')
    //                         .withText('Apply');

    // fixture `Filter Test`.page(`${fullUrl}`);

    // test('Starting filter test', async t => {
    //     await t
    //      .maximizeWindow()
    //      .click(filterSelector)
    //      .click(elemSelector)
    //      .click(applyButtonSelector)
    //      // .debug()
    //      .expect(Selector('h2.pagination-results').innerText).contains('Results');
    // });    

    
})();

