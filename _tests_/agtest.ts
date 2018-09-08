import {tcUtils} from '../src/tc_utils' 
import config from '../src/config'
import { Selector } from 'testcafe';

(async () => {
    // tcUtils.applyFilter('lessons', 'lectures', 'Sources', 'Rabash');    

    // select page (last part of page URL)
    // select tab if exist
    // select filter
    // select filterInput
    // push Apply button

    // exmaple of call
    // applyFilter('lessons', 'lectures', 'Sources', 'Rabash')

    const urlPageName = 'lessons';
    const tab = 'lectures';
    const filterName = 'Sources';
    const inputName = 'Rabash';

    const baseUrl = `${config.basePath}/${config.lang}`;
    const pageUrl = `${baseUrl}/${urlPageName}`;

    // TODO. check tab existing here. For now let's say the tab exists
    const tabName = tab ? `/${tab}` : '';
    const fullUrl = `${pageUrl}${tabName}`;    

    console.log('Full URL: ', fullUrl);


    /// selectors
    const filterSelector = Selector('.filters__menu.menu div.filter__wrapper small')
                            .withText(filterName);

    const elemSelector = Selector('.filter-popup__wrapper a.item')
                            .withAttribute('data-level')
                            .withText(inputName);

    const buttonSelector = Selector('.filter-popup__header button').withText('Apply');

    fixture `Filter Test`.page(`${fullUrl}`);

    test('common filter test', async t => {
        await t
         .maximizeWindow()
         .click(filterSelector)
         .click(elemSelector)
         .click(buttonSelector)
         .expect(Selector('h2.pagination-results').innerText).contains('Results');
    });




})();

