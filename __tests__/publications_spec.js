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

describe('Publications Page => ', function () {

    it('All Elements Exists', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});

        expect(await page.$eval(selectors.common.title, s => s.innerText))
            .toBe(texts.publications.title);
        expect(await page.$eval(selectors.common.subtitle, s => s.innerText.trim()))
            .toBe(texts.publications.subtitle);


        // standard block
        await utils.commonBlock(page);


        // // filters
        // // check filter tabs
        // expect(await page.$$eval(selectors.publications.filterTbl, elems => elems.map(e => e.innerText)))
        //     .toEqual(texts.publications.filterTbl);
    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
