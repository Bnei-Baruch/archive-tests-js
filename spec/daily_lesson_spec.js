const puppeteer = require('puppeteer');
const reporters = require('jasmine-reporters');
const testconfig = require(__dirname + '/testconfig.json');
const width = 1490;
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

        it('Daily Lesson - Vertical Menu - Displayed ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});
            // choose Daily Lessons section from vertical menu
            await page.click('.ui.blue.huge.borderless.fluid.vertical.menu a.item:nth-child(1)');
            // vertical menu count
            expect(await page.$$eval('.ui.blue.huge.borderless.fluid.vertical.menu a', (selector) => {
                return selector.length
            })).toBe(8);

            let filters = await page.$$eval('.ui.blue.huge.borderless.fluid.vertical.menu a.item', (selectors) => {
                return selectors.map(selector => selector.text)
            });
            expect(filters[0]).toEqual("Daily Kabbalah Lesson");
            expect(filters[1]).toEqual("Programs");
            expect(filters[2]).toEqual("Lectures & Lessons");
            expect(filters[3]).toEqual("Library");
            expect(filters[4]).toEqual("Conventions & Events");
            expect(filters[5]).toEqual("Topics");
            expect(filters[6]).toEqual("Publications");
            expect(filters[7]).toEqual("Project Status");
        });

        it('Daily Lesson - Filter - Displayed ', async function () {
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

        it('Daily Lesson - Filter - Clickable ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
            for(let i = 2;i <= 4; i++) {
                await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")");
                expect(await page.$eval(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")",
                    (selector) => {
                        // console.log("Found: " + selector);
                        return selector.className;
                    })).toBe('active item');
            }
        });

        it('Daily Lesson - Filter - Apply Button Enable/Disable ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
            // Topics & Sources filters - Apply button expected to be disabled
            for (let i = 2; i <= 3; i++) {
                await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")");
                expect(await page.$eval(".ui.primary.disabled.right.floated.button", (selector) => {
                    return selector.disabled;
                })).toBeTruthy(true);
            }
            // Date filter - Apply button expected to be enabled
            await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + 4 + ")");
            expect(await page.$eval(".ui.primary.button", (selector) => {
                return selector.disabled;
            })).toBeFalsy(false);
        });

        it('Daily Lesson - Filter - Apply Button - Click ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
            // Clicking on first item in Filter's dropDown
            await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(2)");
            // Apply button expected to be enabled
            await page.click(".ui.blue.tiny.fluid.vertical.menu a:first-child");
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

        it('Daily Lesson - Main List structure ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});

            expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
                return selector.innerText;
            })).toContain("Results 1 - 10 of")
        });

        it('Daily Lesson - Player ', async function () {
            await page.goto(testconfig.resources.playerUrl, {waitUntil: 'domcontentloaded'});
            expect(await page.$('.mediaplayer')).toBeDefined();
        });

        it('Daily Lesson - Pagination ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});
            expect(await page.$eval('.ui.blue.compact.pagination-menu.menu', (selector) => {
                return selector.className
            })).toBe('ui blue compact pagination-menu menu');
        });

        it('Daily Lesson - Pagination Next/Previous/Last/First ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

            // get all div that expected to be disabled
            let paginationItems = await page.$$('.ui.blue.compact.pagination-menu.menu div');
            for (let i = 0; i < paginationItems.length; i++) {
                expect(paginationItems[i]._remoteObject.description).toBe('div.disabled.item');
            }

            // click on last pagination item
            let activeElements = await page.$$('.ui.blue.compact.pagination-menu.menu a');
            await activeElements[activeElements.length - 1].click();

            // get all div that expected to be disabled
            paginationItems = await page.$$('.ui.blue.compact.pagination-menu.menu div');
            for (let i = 0; i < paginationItems.length; i++) {
                expect(paginationItems[i]._remoteObject.description).toBe('div.disabled.item');
            }
        });


        it('Daily Lesson - Date Filter Appearance', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
            // Click on Date filter
            await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(4)");
            expect(await page.$eval(".ui.primary.button", (selector) => {
                return selector.disabled;
            })).toBeFalsy(false);
            expect(await page.$eval(".DayPicker", (selector) => {
                return selector.className;
            })).toBeDefined();
            expect(await page.$$eval(".DayPicker-Month", (selector) => {
                return selector.length;
            })).toBe(2);
            expect(await page.$eval(".ui.center.aligned.header", (selector) => {
                return selector.innerText;
            })).toBe("Select a date range");
        });


        it('Daily Lesson - Date Filter - Select', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
            // Clicking on Date filter
            await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(4)");
            expect(await page.$eval(".ui.primary.button", (selector) => {
                return selector.disabled;
            })).toBeFalsy(false);
            // Click on Dates range dropdown and select "Last 7 days"
            await page.click(".ui.fluid.item.dropdown");
            await page.click(".ui.active.visible.fluid.item.dropdown div div:nth-child(3)");
            expect(await page.$eval(".ui.fluid.item.dropdown .text", (selector) => {
                return selector.innerText;
            })).toBe("Last 7 Days");
            // Click Apply and check if filter tag is created
            const [response] = await Promise.all([
                page.click(".ui.primary.button"),
                page.waitForSelector(".ui.blue.basic.button"),
            ]);
            expect(await page.$eval(".ui.blue.basic.button .calendar.icon", (selector) => {
                return selector.className;
            })).toBeDefined();

        });

    });

    afterAll(async function () {
        await browser.close();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
