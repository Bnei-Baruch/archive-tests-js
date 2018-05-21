const puppeteer = require('puppeteer');
const utils = require('../utils.js');
const testconfig = require(__dirname + '/testconfig.json');
const width = 1920;
const height = 1080;
let browser;
let page;
let originalTimeout;


beforeAll((async function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    browser = await puppeteer.launch(testconfig.browser);
    page = await browser.newPage();
    await page.setViewport({width, height});
}));

describe('Selected Study Series Page Test Suite => ', function () {

    it('Header - Displayed', async function () {
        await page.goto(testconfig.resources.seriesUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.section-header')).toBeDefined();
        // header title
        expect(await page.$eval('.section-header__title', (selector) => {
            return selector.innerHTML
        })).toBe('Selected Study Series');

        let filters = await page.$$eval('h2.ui.header', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(4);
        expect(filters[0].trim()).toEqual('Baal HaSulam');
        expect(filters[1].trim()).toEqual('Rabash');
        expect(filters[2].trim()).toEqual('Rashbi');
        expect(filters[3].trim()).toEqual('Michael Laitman');

        filters = await page.$$eval('h3.ui.header', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(5);
        expect(filters[0].trim()).toEqual('Prefaces');
        expect(filters[1].trim()).toEqual('Articles');
        expect(filters[2].trim()).toEqual('Articles');
        expect(filters[3].trim()).toEqual('Zohar for All');
        expect(filters[4].trim()).toEqual('Articles');
    });
});


afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
