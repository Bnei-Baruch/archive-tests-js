const puppeteer = require('puppeteer');
const reporters = require('jasmine-reporters');
const testconfig = require(__dirname + '/testconfig.json');
const width = 1920;
const height = 1080;
let browser;
let page;
let originalTimeout;

const teamCityReporter = new reporters.TeamCityReporter({
    savePath: __dirname,
    consolidateAll: false
});

jasmine.getEnv().addReporter(teamCityReporter);

// describe('Setup => ', function () {

beforeAll((async function () {
    try {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        browser = await puppeteer.launch(testconfig.browser);
        page = await browser.newPage();
        await page.setViewport({width, height});
    } catch (err) {
        expect(err.status).toBeGreaterThanOrEqual(200);
    }
}));

describe('Sources Page Test Suite => ', function () {

    it('Header - Displayed', async function () {
        await page.goto(testconfig.resources.sourcesUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.section-header')).toBeDefined();
        // header title
        expect(await page.$eval('.section-header__title', (selector) => {
            return selector.innerHTML
        })).toBe('Library');
    });

    it('Table Content - Displayed', async function () {
        await page.goto(testconfig.resources.sourcesUrl, {waitUntil: 'networkidle2'});
        // check is defined the whole table
        expect(await page.$('.ui.very.basic.table.index-list.sources__authors')).toBeDefined();

        // get all text sources
        let filters = await page.$$eval('.sources__list .ui.bulleted div a', (selectors) => {
            return selectors.map(selector => selector.innerHTML)
        });
        expect(filters.length).toBe(21);
        expect(filters[0].trim()).toEqual('Prefaces');
        expect(filters[1].trim()).toEqual('Letters');
        expect(filters[2].trim()).toEqual('Articles');
        expect(filters[3].trim()).toEqual('TES  - Study of the Ten Sefirot');
        expect(filters[4].trim()).toEqual('Shamati');
        expect(filters[5].trim()).toEqual('Passover Haggadah');
        expect(filters[6].trim()).toEqual('The Gatehouse of Intentions');
        expect(filters[7].trim()).toEqual('Even Sapir');
        expect(filters[8].trim()).toEqual('Ha-Ilan (The Tree)');
        expect(filters[9].trim()).toEqual('The Bright Light');
        expect(filters[10].trim()).toEqual('Prefaces');
        expect(filters[11].trim()).toEqual('Letters');
        expect(filters[12].trim()).toEqual('Articles');
        expect(filters[13].trim()).toEqual('Records');
        expect(filters[14].trim()).toEqual('Concealment and Revelation');
        expect(filters[15].trim()).toEqual('Biur Pticha');
        expect(filters[16].trim()).toEqual('Selected Excerpts');
        expect(filters[17].trim()).toEqual('Articles');
        expect(filters[18].trim()).toEqual('Torah');
        expect(filters[19].trim()).toEqual('Zohar for All');
        expect(filters[20].trim()).toEqual('Gatehouse of Intentions');
    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

// });
