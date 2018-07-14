const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
const selectors = require('../src/selectors');
const texts = require('../src/texts');
const utils = require('../src/utils');

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

describe('Programs Page => ', function () {

    it('All Elements Exists', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

        // title and subtitle
        expect(await page.$eval(selectors.common.title, s => s.innerText.trim()))
            .toBe(texts.programs.title);
        expect(await page.$eval(selectors.common.subtitle, s => s.innerText.trim()))
            .toBe(texts.programs.subtitle);

        // standard block
        await utils.commonBlock(page);

        // filters
        expect(await page.$$eval(selectors.common.filterTabsNames, ss => ss.map(s => s.innerText)))
            .toEqual(texts.programs.filterTabNames);


        await utils.pagination(page);

    });
});


afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
