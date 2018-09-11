import selectors from '../src/selectors'
import texts from '../src/texts'
import config from '../src/config'
import {Selector, t} from 'testcafe';

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

    // Check result -> text was not equal All before click and becomes equal All after click
    runFilterClearTest: async (urlPageName, tabName, filterName) => {
        const baseUrl = `${config.basePath}/${config.lang}`;
        const pageUrlPart = `${baseUrl}/${urlPageName}`;
        const checkerAll = 'All';
    
        // check tab existing here
        const tabUrlPart = tabName ? `/${tabName}` : '';
        const fullUrl = `${pageUrlPart}${tabUrlPart}`;    
    
        // define selectors
        const filterSelector = Selector(selectors.query.filterBy)
                                .withText(filterName);
    
        // const applyButtonSelector = Selector('.filter-popup__header button')
        //                         .withText('Apply');

        const clearButtonSelector = Selector('i.times.icon');
                                
        fixture `Filter clear test`.page(`${fullUrl}`);
    

        test('Starting filter test', async t => {
            await t
             .maximizeWindow()
             .click(filterSelector)
             // .click(applyButtonSelector)
             .expect(Selector(selectors.query.expectedString).innerText).notEql(checkerAll)
             .click(clearButtonSelector)
             .expect(Selector(selectors.query.expectedString).innerText).eql(checkerAll)

        });    
    },

    applyFilter: async function (urlPageName, tabName, filterName, filterInput) {
        await t
            .click(Selector(selectors.query.filterBy).withText(filterName))
            .click(Selector(selectors.query.openedBox).withAttribute('data-level').withText(filterInput))
            .click(Selector(selectors.query.openedBoxButtons).withText(texts.query.applyButton))
            .expect(Selector(selectors.query.expectedString).innerText).eql(filterInput)
    }
};

export default tcUtils;
