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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    browser = await puppeteer.launch(testconfig.browser);
    page = await browser.newPage();
    await page.setViewport({width, height});
}));

describe('Daily Lesson => General => ', function () {

    it('All Elements Exists', async function () {
        await page.goto(testconfig.resources.dailyLessonMainUrl, {waitUntil: 'networkidle2'});

        // title and subtitle
        expect(await page.$eval(selectors.common.title, s => s.innerText.trim()))
            .toBe(texts.lessons.title);
        expect(await page.$eval(selectors.common.subtitle, s => s.innerText.trim()))
            .toBe(texts.lessons.subtitle);

        // standard block
        await utils.commonBlock(page);

        // filters
        expect(await page.$$eval(selectors.common.filterOptionsHighLevel, ss => ss.map(s => s.innerText)))
            .toEqual(texts.lessons.filterTabNames);

        expect(await page.$$eval(selectors.lessons.containerPageResults, s => s.length))
            .toBe(10);

        await utils.pagination(page);
    });

    it('Click on tabular filters and check horizontal', async function () {
        await page.goto(testconfig.resources.dailyLessonMainUrl, {waitUntil: 'networkidle2'});

        await utils.click(page, selectors.common.filterOptionsHighLevel, 0);
        await utils.isFilterPopUpOpened(page, selectors.common.filterTabsNames);

        // await utils.click(page, selectors.common.filterOptionsHighLevel, 1);
        // await utils.isFilterPopUpOpened(page, selectors.common.filterTabsNames);

        // await utils.click(page, selectors.common.filterOptionsHighLevel, 3);
        // await utils.isFilterPopUpOpened(page, selectors.common.filterTabsNames);

        // await utils.click(page, selectors.common.filterOptionsHighLevel, 4);
        //
        // utils.sleep(1000);
        // expect(await page.$$eval(selectors.lessons.selectedStudyH2, ss => ss.map(s => s.innerText)))
        //     .toEqual(texts.lessons.studySeriesH2);
    });


});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
