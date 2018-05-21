const puppeteer = require('puppeteer');
const testconfig = require(__dirname + '/testconfig.json');
const utils = require('../utils.js');
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

describe('Project Status Page Test Suite => ', function () {

    it('Header - Displayed', async function () {
        await page.goto(testconfig.resources.projectStatusUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.aligned.header')).toBeDefined();
        // header title
        expect(await page.$eval('.aligned.header', (selector) => {
            return selector.innerHTML
        })).toBe('What\'s new?');

        let filters = await page.$$eval('.ui.header', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(6);
    });
});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
