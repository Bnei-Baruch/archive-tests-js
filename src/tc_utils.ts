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

    sleep: async function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    applyFilter: async function (tabName, filterName, filterInput) {
        await t
            .click(Selector(selectors.query.tabName).withText(tabName))
            .click(Selector(selectors.query.filterBy).withText(filterName))
            .click(Selector(selectors.query.openedBox).withAttribute('data-level').withText(filterInput))
            .click(Selector(selectors.query.openedBoxButtons).withText(texts.query.applyButton))
            .expect(Selector(selectors.query.expectedString).innerText).eql(filterInput)
    }
};

export default tcUtils;
