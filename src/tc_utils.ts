import selectors from '../src/selectors'
import texts from '../src/texts'
import config from '../src/config'
import {Selector} from 'testcafe';

export const tcUtils = {

    // selects multiple elements, returns array
    multipleSelect: async function (_query) {
        const resultArray = [];
        const selectedElements = await Selector(_query);
        const count = await selectedElements.count;

        for (let i = 0; i < count; i++) {
            const elem = await selectedElements.nth(i);
            const innTxt = await elem.innerText;
            resultArray.push(innTxt);
        }

        return resultArray;
    },

    fetchAllSourcesFromTest: async function () {
        // Fetching all all sources from page to one array and compare
        const sourcesListsFormTest = [];
        for (let sourceKey in texts.sources.sourcesList) {
            if (texts.sources.sourcesList.hasOwnProperty(sourceKey)) {
                for (let i = 0; i < texts.sources.sourcesList[sourceKey].length; i++) {
                    sourcesListsFormTest.push(texts.sources.sourcesList[sourceKey][i]);
                }
            }
        }
        return sourcesListsFormTest;
    },


    fetchAllSourcesFromPage: async function () {
        const sourcesListsFromPage = [];
        const sourcesListByAuthor = await Selector(selectors.sources.sourcesListByAuthor);
        for (let i = 0; i < await sourcesListByAuthor.count; i++) {
            for (let j = 0; j < await sourcesListByAuthor.nth(i).child().count; j++) {
                sourcesListsFromPage.push(await sourcesListByAuthor.nth(i).child().nth(j).innerText);
            }
        }
        return sourcesListsFromPage;
    },

    replaceSpaces: (txt) => {
        return txt.replace(/\n|\r/g, '');
    },

    runFilterTest: async (urlPageName, tabName, filterName, filterInput) => {

        // select page (last part of page URL)
        // select tab if exist
        // apply filter
        // select filterInput
        // push Apply button

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
    
        fixture `Filter Test`.page(`${fullUrl}`);
    
        test('Starting filter test', async t => {
            await t
             .maximizeWindow()
             .click(filterSelector)
             .click(elemSelector)
             .click(applyButtonSelector)
             .expect(Selector('h2.pagination-results').innerText).contains('Results');

             // TODO. check result -> filterInput should appear inside filter field
        });    


    }
};

export default tcUtils;
