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

describe('Main Page Test Suite => ', function () {

    it('All Elements Exists', async function () {
        await page.goto(testconfig.resources.mainUrl, {waitUntil: 'networkidle2'});

        // check header title
        expect(await page.$(selectors.main.title)).toBeDefined();
        expect(await page.$eval(selectors.main.title, s => s.innerText.trim()))
            .toBe(texts.main.title);

        // check logo
        expect(await page.$eval(selectors.main.logo, s => s.innerText.trim()))
            .toBe(texts.main.logo);

        // check vertical menu list
        expect(await page.$$eval(selectors.main.sideBar, ss => ss.map(s => s.innerText.trim())))
            .toEqual(texts.main.sideBar);

        // check donate button
        expect(await page.$eval(selectors.main.donateButton, s => s.innerText.trim()))
            .toBe(texts.main.donateButton);

        // check language drop down
        expect(await page.$eval(selectors.main.languageDropDown, s => s.innerText.trim()))
            .toBe(texts.main.languageDropDown);

        // check search button
        expect(await page.$eval(selectors.main.searchButton, s => s.innerText.trim()))
            .toBe(texts.main.searchButton);

        // check banners
        expect(await page.$$eval(selectors.main.thumbnail, s => s.length))
            .toBe(2);

        // check horizontal titles
        expect(await page.$$eval(selectors.main.horizonTitle, ss => ss.map(s => s.innerText.trim())))
            .toEqual(texts.main.horizonTitle);

        // check horizontal icons row
        expect(await page.$$eval(selectors.main.horizonIconRows, ss => ss.map(s => s.innerText.trim())))
            .toEqual(texts.main.horizonIconRows);

        // check last updates
        expect(await page.$$eval(selectors.main.lastUpdateThumbnails, s => s.length))
            .toBe(4);

        // check footer
        expect(await page.$eval(selectors.main.footer, s => s.textContent.trim()))
            .toBe(texts.main.footer);
    });

    it('Search Functionality', async function () {
        await page.goto(testconfig.resources.mainUrl, {waitUntil: 'networkidle2'});

        // check search function
        await utils.fillAndClick(page, selectors.main.searchInput, texts.main.searchText, selectors.main.searchButton);

        // check redirected url
        await utils.redirect(page, texts.main.searchText);

        // check search bar with expected text inside
        expect(await page.$eval(selectors.main.searchResult, s => s.baseURI))
            .toContain(texts.main.searchText);

        // check title
        expect(await page.$eval(selectors.search.header, s => s.innerText))
            .toContain(texts.search.header);

        // check search results
        const resultsFromPage = await page.$$eval(selectors.search.filterPanel, ss => ss.map(s => s.innerText));
        await utils.removeBackSlash(resultsFromPage);
        expect(await resultsFromPage).toEqual(texts.search.filterPanel);

        // check searched text to contained in every response
        const searchRes = await page.$$eval(selectors.search.searchResultsTable, ss => ss.map(s => s.innerText.trim().toLowerCase()));
        expect(await searchRes.includes(texts.main.searchText.toLowerCase()));

    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
