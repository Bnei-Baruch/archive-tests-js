const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
const sel = require('../src/selectors').main;
const txt = require('../src/texts').main;
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
        await page.goto(testconfig.resources.mainUrl, {waitUntil: sel.waitCondition});

        // check header title
        expect(await page.$(sel.title)).toBeDefined();
        expect(await page.$eval(sel.title, s => s.innerText.trim()))
            .toBe(txt.title);

        // check logo
        expect(await page.$eval(sel.logo, s => s.innerText.trim()))
            .toBe(txt.logo);

        // check donate button
        expect(await page.$eval(sel.donateButton, s => s.innerText.trim()))
            .toBe(txt.donateButton);

        // check language drop down
        expect(await page.$eval(sel.languageDropDown, s => s.innerText.trim()))
            .toBe(txt.languageDropDown);

        // check search button
        expect(await page.$eval(sel.searchButton, s => s.innerText.trim()))
            .toBe(txt.searchButton);

        // check banners
        expect(await page.$$eval(sel.thumbnail, s => s.length))
            .toBe(2);

        // check horizontal titles
        expect(await page.$$eval(sel.horizonTitle, (ss) => {
            return ss.map(s => s.innerText.trim())
        })).toEqual(txt.horizonTitle);

        // check horizontal icons row
        expect(await page.$$eval(sel.horizonIconRows, (ss) => {
            return ss.map(s => s.innerText.trim())
        })).toEqual(txt.horizonIconRows);

        // check vertical menu list
        expect(await page.$$eval(sel.sideBar, (ss) => {
            return ss.map(s => s.innerText.trim())
        })).toEqual(txt.sideBar);

        // check last updates
        expect(await page.$$eval(sel.lastUpdateThumbnails, s => s.length))
            .toBe(4);

        // check footer
        expect(await page.$eval(sel.footer, s => s.textContent.trim()))
            .toBe(txt.footer);
    });

    it('Search Functionality', async function () {
        await page.goto(testconfig.resources.mainUrl, {waitUntil: sel.waitCondition});

        // check search function
        await utils.fillAndClick(page, sel.searchInput, txt.searchText, sel.searchButton);

        // check redirected url
        await utils.redirect(page, txt.searchText);

        // check search bar with expected text inside
        expect(await page.$eval(sel.searchResult, s => s.baseURI))
            .toContain(txt.searchText);

        // utils.sleep(5000);

        // check title
        expect(await page.$eval(sel.header, s => s.innerText.trim()))
            .toBe(txt.header);

        // check filter-panel
        // check searched text to contained in every response
    });
    // todo - add new {it} actions sections
    // todo - add test enter text in search and compare results

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
