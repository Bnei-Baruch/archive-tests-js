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

describe('Programs Page Test Suite => ', function () {
    it('All Elements Exists', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

        // check logo
        expect(await page.$eval(selectors.programs.logo, s => s.innerText.trim()))
            .toBe(texts.programs.logo);

        // check vertical menu list
        await utils.sideBarMenu(page, texts.programs.sideBar);

        // check donate button
        expect(await page.$eval(selectors.programs.donateButton, s => s.innerText.trim()))
            .toBe(texts.programs.donateButton);

        // check language drop down
        expect(await page.$eval(selectors.programs.languageDropDown, s => s.innerText.trim()))
            .toBe(texts.programs.languageDropDown);

        // check search input
        expect(await page.$(selectors.programs.searchInput)).toBeDefined();

        // check pagination
        await utils.pagination(page);

        // check footer
        expect(await page.$eval(selectors.programs.footer, s => s.textContent.trim()))
            .toBe(texts.programs.footer);

        //-----------------------------------------------------
        // header
        expect(await page.$(selectors.programs.header))
            .toBeDefined();

        // header title
        expect(await page.$eval(selectors.programs.title, elem => elem.innerHTML))
            .toBe(texts.programs.title);

        // header subtitle
        expect(await page.$eval('.section-header__subtitle', elem => elem.innerHTML))
            .toBe(texts.programs.header);

        // filters
        // check filter tabs
        expect(await page.$$eval(selectors.programs.filterTabs, elems => elems.map(e => e.innerText)))
            .toEqual(texts.programs.filterTabs);

    });
});


/*
describe('Programs Page Test Suite => ', function () {

xit('Header and Filters - Displayed', async function () {
    await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});
    // header
    expect(await page.$('.section-header')).toBeDefined();
    // header title
    expect(await page.$eval('.section-header__title', (selector) => {
        return selector.innerHTML
    })).toBe('Programs');

    let filters = await page.$$eval('.index-filters a.item', (selectors) => {
        return selectors.map(selector => selector.text)
    });
    expect(filters.length).toBe(4);
    expect(filters[0]).toEqual('Genre/Program');
    expect(filters[1]).toEqual('Topics');
    expect(filters[2]).toEqual('Sources');
    expect(filters[3]).toEqual('Date');
});

xit('Pagination Next/Previous/Last/First', async function () {
    await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});
    await utils.pagination(page);
});


xit('Filter - Clickable', async function () {
    await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

    for (let i = 2; i <= 4; i++) {
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")");
        expect(await page.$eval(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")",
            (selector) => {
                // console.log("Found: " + selector);
                return selector.className;
            })).toBe('active item');
    }
});

xit('Filter - Apply Button Enable/Disable', async function () {
    await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

    await Promise.all([
        // Click on Topic filter
        page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)'),
        // Wait for apply button
        page.waitForSelector(".ui.primary.disabled.right.floated.button")
    ]);

    // Make sure that Apply button is disabled
    expect(await page.$eval(".ui.primary.disabled.right.floated.button", (selector) => {
        return selector.disabled;
    })).toBeTruthy();

    // Click on Jewish culture
    await page.click(".ui.blue.tiny.fluid.vertical.menu a:first-child");

    // Make sure that Apply button is enabled
    expect(await page.$eval(".ui.primary.right.floated.button", (selector) => {
        return selector.disabled;
    })).toBeFalsy();
});

xit('Filter - Apply Button - Click', async function () {
    await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

    let element = '.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)';
    // Click on Topic filter
    await page.click(element);
    await page.waitForSelector(element, {'timeout': 60000});

    // Apply button expected to be enabled
    await page.click(".ui.blue.tiny.fluid.vertical.menu a:first-child");
    // Make sure that Jewish culture is activated under Topic section
    expect(await page.$eval(".ui.blue.tiny.fluid.vertical.menu a:first-child", (selector) => {
        return selector.className;
    })).toBe("active item");

    await Promise.all([
        page.click(".ui.primary.right.floated.button"),
        page.waitForSelector(".ui.blue.basic.button"),
    ]);

    expect(await page.$eval(".ui.blue.basic.button", (selector) => {
        return selector.innerText;
    })).toBe("Jewish culture");

});

xit('Filter - Displayed Results 1 - 10 0f', async function () {
    await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});

    expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
        return selector.innerText;
    })).toContain("Results 1 - 10 of")
});

});
*/

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
