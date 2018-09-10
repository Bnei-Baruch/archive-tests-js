import {Selector} from 'testcafe';
import config from '../src/config';
import tcUtils from '../src/tc_utils'

(async () => {

    // example of use
    // tcUtils.runFilterTest('lessons', 'lectures', 'Sources', 'Rabash');    

    const urlPageName = 'lessons';
    const tabName = 'lectures';
    const filterName = 'Sources';
    const filterInput = 'Rabash';
    const checkerAll = 'All';

    // tcUtils.runFilterTest(urlPageName, tabName, filterName, filterInput);    
    // tcUtils.runFilterClearTest(urlPageName, tabName, filterName);    

    /*
    const baseUrl = `${config.basePath}/${config.lang}`;
    const pageUrlPart = `${baseUrl}/${urlPageName}`;

    // check tab existing here
    const tabUrlPart = tabName ? `/${tabName}` : '';
    const fullUrl = `${pageUrlPart}${tabUrlPart}`;    

    // define selectors
    const filterSelector = Selector('.filters__menu.menu div.filter__wrapper small')
                            .withText(filterName);

    const applyButtonSelector = Selector('.filter-popup__header button')
                            .withText('Apply');

    const clearButtonSelector = Selector('i.times.icon');
                            
    fixture `Filter clear test`.page(`${fullUrl}`);


    // TODO. check result -> text was not equal All before click and becomes equal All after click
    test('Starting filter test', async t => {
        await t
            .maximizeWindow()
            .click(filterSelector)
            .click(applyButtonSelector)
            .expect(Selector('.filter__wrapper .filter__text .filter__breadcrumb').innerText).ok()
            // .notEql(checkerAll)
            // .click(clearButtonSelector)
            // .expect(Selector('.filter__wrapper .filter__text .filter__breadcrumb').innerText)
            // .eql(checkerAll)

    });    
    */


    const baseUrl = `${config.basePath}/${config.lang}`;
    const pageUrlPart = `${baseUrl}/${urlPageName}`;

    // check tab existing here
    const tabUrlPart = tabName ? `/${tabName}` : '';
    const fullUrl = `${pageUrlPart}${tabUrlPart}`;    

    // define selectors
    const filterSelector = Selector('.filters__menu.menu div.filter__wrapper small')
                            .withText(filterName);

    const elemSelector = Selector('.filter-popup__wrapper a.item')
                            .withAttribute('data-level')
                            .withText(filterInput);

    const applyButtonSelector = Selector('.filter-popup__header button')
                            .withText('Apply');

    // const clearButtonSelector = Selector('i').withAttribute('class', 'time');                            
    const clearButtonSelector = Selector('.time.icon');                            

    fixture `Filter Test`.page(`${fullUrl}`);

    test('Starting filter test', async t => {
        await t
            .maximizeWindow()
            .click(filterSelector)
            .click(elemSelector)
            .click(applyButtonSelector)
            .expect(Selector('.filter__wrapper .filter__text .filter__breadcrumb').innerText)
            .notEql(checkerAll)
            .click(clearButtonSelector)
            .expect(Selector('.filter__wrapper .filter__text .filter__breadcrumb').innerText)
            .eql(checkerAll)            
    });    

    
})();

