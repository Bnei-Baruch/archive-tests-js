const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
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

describe('Lectures & Lessons Page Test Suite => ', function () {

    xit('Header and Filters - Displayed', async function () {
        await page.goto(testconfig.resources.lecturesUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.section-header')).toBeDefined();
        // header title
        expect(await page.$eval('.section-header__title', (selector) => {
            return selector.innerHTML
        })).toBe('Lectures &amp; Lessons');

        let filters = await page.$$eval('.index-filters a.item', (selectors) => {
            return selectors.map(selector => selector.text)
        });
        await utils.sleep(1000);
        expect(filters.length).toBe(3);
        expect(filters[0]).toEqual('Topics');
        expect(filters[1]).toEqual('Sources');
        expect(filters[2]).toEqual('Date');
    });

    it('Pagination Next/Previous/Last/First', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});
        await utils.pagination(page);
    });


    xit('Filter - Clickable', async function () {
        await page.goto(testconfig.resources.lecturesUrl, {waitUntil: 'networkidle2'});

        for (let i = 2; i <= 4; i++) {
            utils.sleep(1000);
            await page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(' + i + ')');
            expect(await page.$eval('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(' + i + ')',
                (selector) => {
                    return selector.className;
                })).toBe('active item');
        }
    });

    xit('Filter - Apply Button Enable/Disable', async function () {
        await page.goto(testconfig.resources.lecturesUrl, {waitUntil: 'networkidle2'});

        utils.sleep(1000);
        await page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)');
        await page.waitForSelector('.ui.primary.disabled.right.floated.button');

        // Make sure that Apply button is disabled
        expect(await page.$eval('.ui.primary.disabled.right.floated.button', (selector) => {
            return selector.disabled;
        })).toBeTruthy();

        // Click on Jewish culture
        await page.click('.ui.blue.tiny.fluid.vertical.menu a:first-child');

        // Make sure that Apply button is enabled
        expect(await page.$eval('.ui.primary.right.floated.button', (selector) => {
            return selector.disabled;
        })).toBeFalsy();
    });

    xit('Filter - Apply Button - Click', async function () {
        await page.goto(testconfig.resources.lecturesUrl, {waitUntil: 'networkidle2'});

        let element = '.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)';
        // Click on Topic filter
        await page.click(element);
        await page.waitForSelector(element, {'timeout': 60000});

        // Apply button expected to be enabled
        await page.click('.ui.blue.tiny.fluid.vertical.menu a:first-child');
        // Make sure that Jewish culture is activated under Topic section
        expect(await page.$eval('.ui.blue.tiny.fluid.vertical.menu a:first-child', (selector) => {
            return selector.className;
        })).toBe('active item');

        await page.click('.ui.primary.right.floated.button');
        await page.waitForSelector('.ui.blue.basic.button');

        expect(await page.$eval('.ui.blue.basic.button', (selector) => {
            return selector.innerText;
        })).toBe('Baal HaSulam');

    });

    xit('Filter - Displayed Results 1 - 10 0f', async function () {
        await page.goto(testconfig.resources.lecturesUrl, {waitUntil: 'networkidle2'});

        expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
            return selector.innerText;
        })).toContain('Results 1 - 10 of')
    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
