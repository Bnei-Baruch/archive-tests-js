const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
const selectors = require('../src/selectors');
const texts = require('../src/texts');
const utils = require('../src/utils');

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

describe('Main Page => ', function () {

    it('All Elements Exists', async function () {
        await page.goto(testconfig.resources.mainUrl, {waitUntil: 'networkidle2'});

        expect(await page.$eval(selectors.main.title, s => s.innerText.trim()))
            .toBe(texts.main.title);

        expect(await page.$eval(selectors.common.logo, s => s.innerText.trim()))
            .toBe(texts.common.logo);
        expect(await page.$$eval(selectors.common.sideBar, ss => ss.map(s => s.innerText.trim())))
            .toEqual(texts.common.sideBar);
        expect(await page.$eval(selectors.common.donateButton, s => s.innerText))
            .toBe(texts.common.donateButton);
        expect(await page.$eval(selectors.common.languageDropDown, s => s.innerText.trim()))
            .toBe(texts.common.languageDropDown);
        expect(await page.$eval(selectors.common.footer, s => s.textContent))
            .toBe(texts.common.footer);

        expect(await page.$eval(selectors.main.searchButton, s => s.innerText))
            .toBe(texts.main.searchButton);
        expect(await page.$$eval(selectors.main.thumbnail, s => s.length))
            .toBe(2);
        expect(await page.$$eval(selectors.main.horizonTitle, ss => ss.map(s => s.innerText)))
            .toEqual(texts.main.horizonTitle);
        expect(await page.$$eval(selectors.main.horizonIconRows, ss => ss.map(s => s.innerText.trim())))
            .toEqual(texts.main.horizonIconRows);
        expect(await page.$$eval(selectors.main.lastUpdateThumbnails, s => s.length))
            .toBe(4);

    });

    it('Search Functionality', async function () {
        await page.goto(testconfig.resources.mainUrl, {waitUntil: 'networkidle2'});

        await page.focus(selectors.main.searchInput);
        await page.type(selectors.main.searchInput, texts.main.searchText);
        await page.click(selectors.main.searchButton);

        expect(await (page.url()))
            .toContain(await utils.redirect(page, texts.main.searchText));

        expect(await page.$eval(selectors.main.searchResult, s => s.baseURI))
            .toContain(texts.main.searchText);
        expect(await page.$eval(selectors.common.header, s => s.innerText))
            .toContain(texts.search.header);
        expect(await page.$$eval(selectors.common.filterTabsNames, ss => ss.map(s => s.innerText)))
            .toEqual(texts.search.filterTabNames);

        const searchRes =
            await page.$$eval(selectors.search.searchResultsTable, ss => ss.map(s => s.innerText.trim()
                    .toLowerCase()));
        expect(await searchRes.includes(texts.main.searchText.toLowerCase()));

        // await utils.pagination(page);
    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
