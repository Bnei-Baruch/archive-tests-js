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

describe('Daily Lesson => Study => ', function () {

    it('General ', async function () {
        await page.goto(testconfig.resources.dailyLessonsLecturesUrl, {waitUntil: 'networkidle2'});

        // standard block
        await utils.commonBlock(page);

        await utils.click(page, selectors.common.filterOptionsHighLevel, 4);

        utils.sleep(1000);
        expect(await page.$$eval(selectors.lessons.selectedStudyH2, ss => ss.map(s => s.innerText)))
            .toEqual(texts.lessons.studySeriesH2);

        // expect(await page.$('.section-header')).toBeDefined();
        // // header title
        // expect(await page.$eval('.section-header__title', (selector) => {
        //     return selector.innerHTML
        // })).toBe('Lectures &amp; Lessons');
        //
        // let filters = await page.$$eval('.index-filters a.item', (selectors) => {
        //     return selectors.map(selector => selector.text)
        // });
        // await utils.sleep(1000);
        // expect(filters.length).toBe(3);
        // expect(filters[0]).toEqual('Topics');
        // expect(filters[1]).toEqual('Sources');
        // expect(filters[2]).toEqual('Date');
    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
