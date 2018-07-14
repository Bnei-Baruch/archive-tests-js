const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
const selectors = require('../src/selectors');
const texts = require('../src/texts');
const utils = require('../src/utils.js');

const width = 1920;
const height = 1080;

let browser;
let page;
let originalTimeout;


beforeAll((async function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    browser = await puppeteer.launch(testconfig.browser);
    page = await browser.newPage();
    await page.setViewport({width, height});
}));

describe('Sources Page => ', function () {

    it('All Elements Exists', async function () {
        await page.goto(testconfig.resources.sourcesUrl, {waitUntil: 'networkidle2'});

        expect(await page.$eval(selectors.common.title, s => s.innerText.trim()))
            .toBe(texts.sources.title);
        expect(await page.$eval(selectors.common.subtitle, s => s.innerText.trim()))
            .toBe(texts.sources.subtitle);

        // standard block
        await utils.commonBlock(page);

    });


    // xit('Header - Displayed', async function () {
    //     await page.goto(testconfig.resources.sourcesUrl, {waitUntil: 'networkidle2'});
    //     // header
    //     expect(await page.$('.section-header')).toBeDefined();
    //     // header title
    //     expect(await page.$eval('.section-header__title', (selector) => {
    //         return selector.innerHTML
    //     })).toBe('Library');
    // });
    //
    // xit('Table Content - Displayed', async function () {
    //     await page.goto(testconfig.resources.sourcesUrl, {waitUntil: 'networkidle2'});
    //     // check is defined the whole table
    //     expect(await page.$('.ui.very.basic.table.index-list.sources__authors')).toBeDefined();
    //
    //     // get all text sources
    //     let filters = await page.$$eval('.sources__list .ui.bulleted div a', (selectors) => {
    //         return selectors.map(selector => selector.innerHTML)
    //     });
    //     expect(filters.length).toBe(22);
    //     expect(filters[0].trim()).toEqual('Prefaces');
    //     expect(filters[1].trim()).toEqual('Letters');
    //     expect(filters[2].trim()).toEqual('Articles');
    //     expect(filters[3].trim()).toEqual('TES  - Study of the Ten Sefirot');
    //     expect(filters[4].trim()).toEqual('Shamati');
    //     expect(filters[5].trim()).toEqual('Passover Haggadah');
    //     expect(filters[6].trim()).toEqual('The Gatehouse of Intentions');
    //     expect(filters[7].trim()).toEqual('Even Sapir');
    //     expect(filters[8].trim()).toEqual('Ha-Ilan (The Tree)');
    //     expect(filters[9].trim()).toEqual('The Bright Light');
    //     expect(filters[10].trim()).toEqual('Prefaces');
    //     expect(filters[11].trim()).toEqual('Letters');
    //     expect(filters[12].trim()).toEqual('Articles');
    //     expect(filters[13].trim()).toEqual('Records');
    //     expect(filters[14].trim()).toEqual('Concealment and Revelation');
    //     expect(filters[15].trim()).toEqual('Biur Pticha');
    //     expect(filters[16].trim()).toEqual('Selected Excerpts');
    //     expect(filters[17].trim()).toEqual('Articles');
    //     expect(filters[18].trim()).toEqual('Torah');
    //     expect(filters[19].trim()).toEqual('Zohar for All');
    //     expect(filters[20].trim()).toEqual('Gatehouse of Intentions');
    //     expect(filters[21].trim()).toEqual('Tree of Life');
    // });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
