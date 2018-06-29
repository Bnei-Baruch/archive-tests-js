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

describe('Main Page Test Suite => ', function () {

    it('Header - Displayed', async function () {
        await page.goto(testconfig.resources.mainUrl, {waitUntil: 'networkidle2'});
        // is header defined
        expect(await page.$('.homepage__title')).toBeDefined();
        // check header title
        expect(await page.$eval('.homepage__title', selector => selector.innerText.trim()))
            .toBe('Explore the wisdom of Kabbalah');
        // check search button text
        expect(await page.$eval('.search-omnibox button', selector => selector.innerText.trim()))
            .toBe('search');
        // check homepage__featured should be displayed 2 items
        expect(await page.$$eval('.thumbnail', selectors => selectors.length))
            .toBeCloseTo(2);
        // check horizontal titles
        expect(await page.$$eval('.horizontal.divider',
            (selectors) => {
                return selectors.map(selector => selector.innerText.trim())
            })).toEqual(['ARCHIVE SECTIONS', 'LATEST UPDATES']);
        // check horizontal archive icons row
        expect(await page.$$eval('.homepage__website-sections .header',
            (selectors) => {
                return selectors.map(selector => selector.innerText.trim())
            })).toEqual(['Lessons & Lectures', 'Programs', 'Library', 'Conventions & Events', 'Publications']);
        // check vertical menu list
        expect(await page.$$eval('.sidebar-item',
            (selectors) => {
                return selectors.map(selector => selector.innerText.trim())
            })).toEqual(['Lessons & Lectures', 'Programs', 'Library', 'Conventions & Events', 'Topics', 'Publications', 'Project Status', 'Old Site']);
        // check last updates should be displayed 4 items
        expect(await page.$$eval('.homepage__thumbnails a', selectors => selectors.length))
            .toBeCloseTo(4);
        // check layout__footer text
        expect(await page.$eval('.layout__footer', selector => selector.textContent.trim()))
            .toBe('Kabbalah MediaCopyright © 2003-2018 Bnei Baruch – Kabbalah L’Am Association, All rights reserved');
    });
});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
