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

describe('Main Page Test Suite => ', function () {

    it('Header - Displayed', async function () {
        await page.goto(testconfig.resources.mainUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.homepage__title')).toBeDefined();

        // header title
        expect(await page.$eval('.homepage__title', (selector) => {
            return selector.innerHTML
        })).toBe('Explore the wisdom of Kabbalah');

        expect(await page.$eval('.ui.button', (selector) => {
            return selector.innerHTML
        })).toBe('search');

        let filters = await page.$$eval('.thumbnail', (selectors) => {
            return selectors.map(selector => selector.text)
        });
        expect(filters.length).toBe(2);

        filters = await page.$$eval('.horizontal.divider', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(2);
        expect(filters[0].trim()).toEqual('ARCHIVE SECTIONS');
        expect(filters[1].trim()).toEqual('LATEST UPDATES');

        filters = await page.$$eval('a.small.header', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(6);
        expect(filters[0].trim()).toEqual('Daily Kabbalah Lesson');
        expect(filters[1].trim()).toEqual('Programs');
        expect(filters[2].trim()).toEqual('Lectures & Lessons');
        expect(filters[3].trim()).toEqual('Library');
        expect(filters[4].trim()).toEqual('Conventions & Events');
        expect(filters[5].trim()).toEqual('Publications');

        filters = await page.$$eval('a.ui.card', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(4);

        // footer
        filters = await page.$$eval('.layout__footer div.column', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters[0]).toEqual('Kabbalah Media\n' +
            'Copyright © 2003-2018 Bnei Baruch – Kabbalah L’Am Association, All rights reserved\n');
    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
