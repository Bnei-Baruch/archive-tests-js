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

    }

};