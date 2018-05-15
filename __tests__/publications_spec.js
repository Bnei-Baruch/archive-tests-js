const puppeteer = require('puppeteer');
const testconfig = require(__dirname + '/testconfig.json');
const width = 1920;
const height = 1080;
let browser;
let page;
let originalTimeout;


beforeAll((async function () {
    try {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        browser = await puppeteer.launch(testconfig.browser);
        page = await browser.newPage();
        await page.setViewport({width, height});
    } catch (err) {
        expect(err.status).toBeGreaterThanOrEqual(200);
    }
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

});


// todo - add pagination

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
