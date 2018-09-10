<<<<<<< HEAD
import selectors from '../src/selectors'
import texts from '../src/texts'
import config from '../src/config'
import {Selector, t} from 'testcafe';
=======
import selectors from '../src/selectors';
import texts from '../src/texts';
import config from '../src/config';
>>>>>>> filter clear function v1 - test not working

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

    runFilterClearTest: async (urlPageName, tabName, filterName) => {
        // select page (last part of page URL)
        // select tab if exist
        // select filter
        // check text input not equal 'All'
        // click Clear button
        // check text input equals 'All'

        const baseUrl = `${config.basePath}/${config.lang}`;
        const pageUrlPart = `${baseUrl}/${urlPageName}`;

        const checkerAll = 'All';
    
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
             .expect(Selector('.filter__wrapper .filter__text .filter__breadcrumb').innerText)
                .notEql(checkerAll)
             .click(clearButtonSelector)
             .expect(Selector('.filter__wrapper .filter__text .filter__breadcrumb').innerText)
                .eql(checkerAll)

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
