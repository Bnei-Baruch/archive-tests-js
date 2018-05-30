const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
const utils = require('../utils.js');
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

describe('Publications Page Test Suite => ', function () {

    it('Header and Filters - Displayed', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.section-header')).toBeDefined();
        // header title
        expect(await page.$eval('.section-header__title', (selector) => {
            return selector.innerHTML
        })).toBe('Publications');

        let filters = await page.$$eval('.ui.container.padded.horizontally a.item', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(2);
        expect(filters[0].trim()).toEqual('Publishers');
        expect(filters[1].trim()).toEqual('Date');
    });

    it('Pagination Next/Previous/Last/First', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

        let allPaginationSelector = '.ui.blue.compact.pagination-menu.menu *';
        // get all div that expected to be disabled
        let paginationItems = await page.$$(allPaginationSelector);
        // verify index location of disabled elements
        expect(paginationItems['0']._remoteObject.description).toContain('disabled');
        expect(paginationItems['2']._remoteObject.description).toContain('disabled');
        expect(paginationItems['8']._remoteObject.description).toContain('disabled');

        // click on last pagination item
        await paginationItems[paginationItems.length - 1].click();

        await utils.delay(2000);
        paginationItems = await page.$$(allPaginationSelector);

        expect(paginationItems['4']._remoteObject.description).toContain('disabled');
        expect(paginationItems['10']._remoteObject.description).toContain('disabled');
        expect(paginationItems['12']._remoteObject.description).toContain('disabled');
    });


});


afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
