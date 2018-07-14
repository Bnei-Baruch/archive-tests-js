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

describe('Events => ', function () {

    it('=> Conventions ', async function () {
        await page.goto(testconfig.resources.eventConventionsUrl, {waitUntil: 'networkidle2'});

        // standard block
        await utils.commonBlock(page);

    });
});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
