const puppeteer = require('puppeteer');
const reporters = require('jasmine-reporters');
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

describe('Programs Page Test Suite => ', function () {

    it('Header and Filters - Displayed', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.section-header')).toBeDefined();
        // header title
        expect(await page.$eval('.section-header__title', (selector) => {
            return selector.innerHTML
        })).toBe('Programs');

        let filters = await page.$$eval('.index-filters a.item', (selectors) => {
            return selectors.map(selector => selector.text)
        });
        expect(filters.length).toBe(4);
        expect(filters[0]).toEqual('Genre/Program');
        expect(filters[1]).toEqual('Topics');
        expect(filters[2]).toEqual('Sources');
        expect(filters[3]).toEqual('Date');
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

    it('Filter - Clickable', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

        for (let i = 2; i <= 4; i++) {
            await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")");
            expect(await page.$eval(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")",
                (selector) => {
                    // console.log("Found: " + selector);
                    return selector.className;
                })).toBe('active item');
        }
    });

    it('Filter - Apply Button Enable/Disable', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

        await Promise.all([
            // Click on Topic filter
            page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)'),
            // Wait for apply button
            page.waitForSelector(".ui.primary.disabled.right.floated.button")
        ]);

        // Make sure that Apply button is disabled
        expect(await page.$eval(".ui.primary.disabled.right.floated.button", (selector) => {
            return selector.disabled;
        })).toBeTruthy(true);

        // Click on Jewish culture
        await page.click(".ui.blue.tiny.fluid.vertical.menu a:first-child");

        // Make sure that Apply button is enabled
        expect(await page.$eval(".ui.primary.right.floated.button", (selector) => {
            return selector.disabled;
        })).toBeFalsy(false);
    });

    it('Filter - Apply Button - Click', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});
        // Click on Topic filter
        await page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)');
        // Apply button expected to be enabled
        await page.click(".ui.blue.tiny.fluid.vertical.menu a:first-child");
        // Make sure that Jewish culture is activated under Topic section
        expect(await page.$eval(".ui.blue.tiny.fluid.vertical.menu a:first-child", (selector) => {
            return selector.className;
        })).toBe("active item");

        await Promise.all([
            page.click(".ui.primary.right.floated.button"),
            page.waitForSelector(".ui.blue.basic.button"),
        ]);

        expect(await page.$eval(".ui.blue.basic.button", (selector) => {
            return selector.innerText;
        })).toBe("Jewish culture");

    });

    it('Filter - Displayed Results 1 - 10 0f', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

        expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
            return selector.innerText;
        })).toContain("Results 1 - 10 of")
    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
