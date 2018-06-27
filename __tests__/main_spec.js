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
        expect(await page.$eval('.homepage__title', selector => selector.innerText))
            .toBe('Explore the wisdom of Kabbalah');
        // check search button text
        expect(await page.$eval('.search-omnibox button', selector => selector.innerText))
            .toBe('search');
        // check homepage__featured should be displayed 2 items
        expect(await page.$$eval('.thumbnail', selectors => selectors.length))
            .toBeCloseTo(2);


        // let filters = await page.$$eval('.horizontal.divider', (selectors) => {
        //     return selectors.map(selector => selector.innerText)
        // });
        // expect(filters.length).toBe(2);
        // expect(filters[0].trim()).toEqual('ARCHIVE SECTIONS');
        // expect(filters[1].trim()).toEqual('LATEST UPDATES');

        // .homepage__website-sections .homepage__iconsrow .row

        expect(await page.$$eval('.horizontal.divider', selector => selector.length))
            .toBeCloseTo(2);

        expect(await page.$$eval('.homepage__website-sections .header',
            (selectors) => {
                return selectors.map(selector => selector.innerText.trim())
            })).toEqual(['Lessons & Lectures', 'Programs', 'Library', 'Conventions & Events', 'Publications']);


        // .toEqual(['ARCHIVE SECTIONS', 'LATEST UPDATES']);

        // expect(filters.length).toBe(2);
        // expect(filters[0].trim()).toEqual('ARCHIVE SECTIONS');
        // expect(filters[1].trim()).toEqual('LATEST UPDATES');


        let filters = await page.$$eval('.sidebar-item', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(8);
        expect(filters[0].trim()).toEqual('Lessons & Lectures');
        expect(filters[1].trim()).toEqual('Programs');
        expect(filters[2].trim()).toEqual('Library');
        expect(filters[3].trim()).toEqual('Conventions & Events');
        expect(filters[4].trim()).toEqual('Topics');
        expect(filters[5].trim()).toEqual('Publications');
        expect(filters[6].trim()).toEqual('Project Status');
        expect(filters[7].trim()).toEqual('Old Site');

        filters = await page.$$eval('a.ui.card', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(4);

        // footer
        filters = await page.$$eval('.layout__footer div.column', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters[0]).toContain('Kabbalah Media\n' +
            'Copyright © 2003-2018 Bnei Baruch – Kabbalah L’Am Association, All rights reserved');
    });
});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
