const selectors = require('../src/selectors');
const texts = require('../src/texts');

import { Selector } from 'testcafe';  

module.exports = { 

    // selects multiple elements, returns array
    multipleSelect: async function(_query) {
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


    fetchAllSourcesFromTest: async function() {
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


    fetchAllSourcesFromPage: async function() {
        const sourcesListsFromPage = [];
        const sourcesListByAuthor = await Selector(selectors.sources.sourcesListByAuthor);
        for (let i = 0; i < await sourcesListByAuthor.count; i++) {
            for (let j = 0; j < await sourcesListByAuthor.nth(i).child().count; j++) {
                sourcesListsFromPage.push(await sourcesListByAuthor.nth(i).child().nth(j).innerText);
            }
        }
        return sourcesListsFromPage;
    }
};