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

describe('Setup ', function () {
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

    describe('Archive Test Suite ', function () {

        it('Daily Lesson Section ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});
            // header
            expect(await page.$('.section-header')).toBeDefined();
            // header title
            expect(await page.$eval('.section-header__title', (selector) => {
                return selector.innerHTML
            })).toBe('Daily Lessons');
            // filters
            expect(await page.$$eval('.ui.container.padded.horizontally a', (selector) => {
                return selector.length
            })).toBe(3);
            let filters = await page.$$eval('.ui.container.padded.horizontally a.item', (selectors) => {
                return selectors.map(selector => selector.text)
            });
            expect(filters[0]).toEqual("Topics");
            expect(filters[1]).toEqual("Sources");
            expect(filters[2]).toEqual("Date");

        });

        it('Daily Lesson - Main List structure', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});

            expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
                return selector.innerText
            })).toContain("Results 1 - 10 of")
        });

        it('Daily Lesson - Filters Clickable', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});
            const [response] = await Promise.all([
                page.waitForNavigation(),
                page.click(".ui.container.padded.horizontally a.item a:nth-child(1)"),
            ]);
            console.log(response)
        });

        it('Daily Lesson - Pagination ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});
            expect(await page.$eval('.ui.blue.compact.pagination-menu.menu', (selector) => {
                return selector.className
            })).toBe('ui blue compact pagination-menu menu');
        });

        it('Daily Lesson - Player ', async function () {
            await page.goto(testconfig.resources.playerUrl, {waitUntil: 'domcontentloaded'});
            expect(await page.$('.mediaplayer')).toBeDefined();
        });
    });

    afterAll(async function () {
        await browser.close();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
