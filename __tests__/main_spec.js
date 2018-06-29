const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
const sel = require('../src/selectors').main;
const txt = require('../src/texts').main;
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

        // check header title
        expect(await page.$(sel.title)).toBeDefined();
        expect(await page.$eval(sel.title, s => s.innerText.trim()))
            .toBe(txt.title);

        // check search button
        expect(await page.$eval(sel.searchButton, s => s.innerText.trim()))
            .toBe(txt.searchButton);

        // check banners
        expect(await page.$$eval('.thumbnail', selectors => selectors.length))
            .toBe(2);

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
