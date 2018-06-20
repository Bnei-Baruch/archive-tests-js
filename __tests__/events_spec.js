const puppeteer = require('puppeteer');
const utils = require('../utils.js');
const testconfig = require('./testconfig');
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

describe('Conventions & Events Page Test Suite => ', function () {

    it('Header and Filters - Displayed', async function () {
        // jest.setTimeout(60000); // 60 second timeout

        await page.goto(testconfig.resources.eventsUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.section-header')).toBeDefined();
        // header title
        expect(await page.$eval('.section-header__title', (selector) => {
            return selector.innerHTML
        })).toBe('Conventions &amp; Events');

        let filters = await page.$$eval('.section-header__menu.menu a', (selectors) => {
            return selectors.map(selector => selector.innerHTML)
        });
        expect(filters.length).toBe(5);
        expect(filters[0]).toEqual('Conventions');
        expect(filters[1]).toEqual('Holidays');
        expect(filters[2]).toEqual('Unity Days');
        expect(filters[3]).toEqual('Friends Gatherings');
        expect(filters[4]).toEqual('Meals');

        await page.click('.section-header__menu a:nth-child(1)');
        filters = await page.$$eval('.horizontally a', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(await filters.length).toBe(2);
        expect(await filters[0].trim()).toEqual('Locations All');
        expect(await filters[1].trim()).toEqual('Year');
        // Results
        expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
            return selector.innerText;
        })).toContain('Results 1 - ');

        await page.click('.section-header__menu a:nth-child(2)');
        filters = await page.$$eval('.horizontally a', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(await filters.length).toBe(2);
        expect(await filters[0].trim()).toEqual('Holidays');
        expect(await filters[1].trim()).toEqual('Year');
        // Results
        expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
            return selector.innerText;
        })).toContain('Results 1 - ');

        await page.click('.section-header__menu a:nth-child(3)');
        filters = await page.$$eval('.horizontally a', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(await filters.length).toBe(1);
        expect(await filters[0].trim()).toEqual('Year');
        // Results
        expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
            return selector.innerText;
        })).toContain('Results 1 - ');

        await Promise.all([
            page.click('.section-header__menu a:nth-child(4)'),
            page.waitForSelector('.ui.header.pagination-results')
        ]);

        filters = await page.$$eval('.horizontally a', (selectors) => {
            return selectors.map(selector => selector.innerText);
        });
        expect(await filters.length).toBe(1);
        expect(await filters[0].trim()).toEqual('Date');

        await utils.sleep(2000);

        // Results
        expect(await page.$eval('.pagination-results', (selector) => {
            return selector.innerText;
        })).toContain('Results 1 - ');

        await page.click('.section-header__menu a:nth-child(5)');
        filters = await page.$$eval('.horizontally a', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(await filters.length).toBe(1);
        expect(await filters[0].trim()).toEqual('Date');

        await utils.sleep(2000);

        // Results
        expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
            return selector.innerText;
        })).toContain('Results 1 - ');
    });
});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
