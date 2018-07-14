const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
const selectors = require('../src/selectors');
const texts = require('../src/texts');
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

describe('Publications Page Test Suite => ', function () {

    xit('All Elements Exists', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});

        // check logo
        expect(await page.$eval(selectors.publications.logo, s => s.innerText.trim()))
            .toBe(texts.publications.logo);

        // check vertical menu list
        await utils.sideBarMenu(page, texts.publications.sideBar);

        // check donate button
        expect(await page.$eval(selectors.publications.donateButton, s => s.innerText.trim()))
            .toBe(texts.publications.donateButton);

        // check language drop down
        expect(await page.$eval(selectors.publications.languageDropDown, s => s.innerText.trim()))
            .toBe(texts.publications.languageDropDown);

        // check search input
        expect(await page.$(selectors.publications.searchInput)).toBeDefined();

        // check pagination
        await utils.pagination(page);

        // check footer
        expect(await page.$eval(selectors.publications.footer, s => s.textContent.trim()))
            .toBe(texts.publications.footer);

        //-----------------------------------------------------
        // header
        expect(await page.$(selectors.publications.header))
            .toBeDefined();

        // header title
        expect(await page.$eval(selectors.publications.title, elem => elem.innerHTML))
            .toBe(texts.publications.title);

        // header subtitle
        expect(await page.$eval('.section-header__subtitle', elem => elem.innerHTML))
            .toBe(texts.publications.header);

        // filters
        // check filter tabs
        expect(await page.$$eval(selectors.publications.filterTbl, elems => elems.map(e => e.innerText)))
            .toEqual(texts.publications.filterTbl);
    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
