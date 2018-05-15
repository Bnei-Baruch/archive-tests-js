const puppeteer = require('puppeteer');
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

        // get all div that expected to be disabled
        let paginationItems = await page.$$('.ui.blue.compact.pagination-menu.menu div');
        for (let i = 0; i < paginationItems.length; i++) {
            expect(paginationItems[i]._remoteObject.description).toBe('div.disabled.item');
        }

        // click on last pagination item
        let activeElements = await page.$$('.ui.blue.compact.pagination-menu.menu a');
        await activeElements[activeElements.length - 1].click();

        // get all div that expected to be disabled
        paginationItems = await page.$$('.ui.blue.compact.pagination-menu.menu div');
        for (let i = 0; i < paginationItems.length; i++) {
            expect(paginationItems[i]._remoteObject.description).toBe('div.disabled.item');
        }
    });

});


afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
