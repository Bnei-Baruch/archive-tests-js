const puppeteer = require('puppeteer');
const reporters = require('jasmine-reporters');
const utils = require('./utils.js');
const testconfig = require(__dirname + '/testconfig.json');
const width = 1490;
const height = 1080;
let browser;
let page;
let originalTimeout;

jasmine.getEnv().addReporter(new reporters.TeamCityReporter());


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

describe('Daily Lesson Page Test Suite => ', function () {

    it('Vertical Menu - Displayed', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        // choose Daily Lessons section from vertical menu
        await page.click('.ui.blue.huge.borderless.fluid.vertical.menu a.item:nth-child(1)');
        // vertical menu count
        let filters = await page.$$eval('.ui.blue.huge.borderless.fluid.vertical.menu a.item', (selectors) => {
            return selectors.map(selector => selector.text)
        });
        expect(filters.length).toBe(9);
        expect(filters[0]).toEqual('Daily Kabbalah Lesson');
        expect(filters[1]).toEqual('Programs');
        expect(filters[2]).toEqual('Lectures & Lessons');
        expect(filters[3]).toEqual('Library');
        expect(filters[4]).toEqual('Conventions & Events');
        expect(filters[5]).toEqual('Topics');
        expect(filters[6]).toEqual('Publications');
        expect(filters[7]).toEqual('Selected Study Series');
        expect(filters[8]).toEqual('Project Status');
    });

    it('Filter and Headers - Displayed', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.section-header')).toBeDefined();
        // header title
        expect(await page.$eval('.section-header__title', (selector) => {
            return selector.innerHTML
        })).toBe('Daily Lessons');
        // filters
        let filters = await page.$$eval('.ui.container.padded.horizontally a.item', (selectors) => {
            return selectors.map(selector => selector.text)
        });
        expect(filters.length).toBe(3);
        expect(filters[0]).toEqual('Topics');
        expect(filters[1]).toEqual('Sources');
        expect(filters[2]).toEqual('Date');
    });

    it('Filter - Clickable', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        for (let i = 2; i <= 4; i++) {
            await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")");
            expect(await page.$eval(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")",
                (selector) => {
                    // console.log("Found: " + selector);
                    return selector.className;
                })).toBe('active item');
        }
    });

    it('Filter - Apply Button Enable/Disable', async function () {
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

    it('Filter - Apply Button - Click', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        // Click on "Topic" filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(2)");
        // Clicking on first item in Filter's dropDown
        await page.click(".ui.blue.tiny.fluid.vertical.menu a:first-child");
        // Selected item expected to be active
        expect(await page.$eval(".ui.blue.tiny.fluid.vertical.menu a:first-child", (selector) => {
            return selector.className;
        })).toBe("active item");
        await Promise.all([
            page.click(".ui.primary.right.floated.button"),
            page.waitForSelector(".ui.blue.basic.button"),
        ]);
        expect(await page.$eval(".ui.blue.basic.button", (selector) => {
            return selector.innerText;
        })).toBe('Jewish culture');

    });

    it('Displayed Results 1 - 10 0f', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

        expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
            return selector.innerText;
        })).toContain('Results 1 - 10 of')
    });

    it('Player Exist', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});
        expect(await page.$('.mediaplayer')).toBeDefined();
    });

    it('Pagination Displayed', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        expect(await page.$eval('.ui.blue.compact.pagination-menu.menu', (selector) => {
            return selector.className
        })).toBe('ui blue compact pagination-menu menu');
    });

    it('Pagination Next/Previous/Last/First', async function () {
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

    it('Date Filter Displayed', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        // Click on Date filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(4)");
        // Apply button enabled
        expect(await page.$eval(".ui.primary.button", (selector) => {
            return selector.disabled;
        })).toBeFalsy(false);
        // Calendar defined
        expect(await page.$eval(".DayPicker", (selector) => {
            return selector.className;
        })).toBeDefined();
        // Calendar two columns
        expect(await page.$$eval(".DayPicker-Month", (selector) => {
            return selector.length;
        })).toBe(2);
        // Drop Down Date Range
        expect(await page.$eval(".ui.center.aligned.header", (selector) => {
            return selector.innerText;
        })).toBe("Select a date range");
    });

    it('Date Filter - DropDown - Last 7 Days', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

        // Clicking on Date filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(4)");
        expect(await page.$eval(".ui.primary.button", (selector) => {
            return selector.disabled;
        })).toBeFalsy(false);

        // Click on Dates range drop down and select "Last 7 days"
        await page.click(".ui.fluid.item.dropdown");
        await page.click(".ui.active.visible.fluid.item.dropdown div div:nth-child(3)");
        expect(await page.$eval(".ui.fluid.item.dropdown .text", (selector) => {
            return selector.innerText;
        })).toBe("Last 7 Days");

        // Click Apply and check if filter tag is created
        await Promise.all([
            page.click(".ui.primary.button"),
            page.waitForSelector(".ui.blue.basic.button"),
        ]);
        // Verify calendar.icon
        expect(await page.$eval(".ui.blue.basic.button .calendar.icon", (selector) => {
            return selector.className;
        })).toBeDefined();

    });

    it('Date Filter - Select', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        let today = utils.getCurrentDate();
        console.log("Current Date: " + today);
        // Clicking on Date filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(4)");
        expect(await page.$eval(".ui.fluid.item.dropdown", (selector) => {
            return selector.innerText;
        })).toBe("Today");  // Default value "Today"
        let dates_range = await page.$$eval(".ui.fluid.input input", (selectors) => {
            return selectors.map(selector => selector.value);
        });
        for (let date of dates_range) {
            expect('0' + date).toBe(today);  // Default value => Should display Today's date
        }
        // Checking all items in the dropDown menu
        let itemsList = await page.$$eval(".visible.menu.transition span", (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        let expectedList = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Last Month", "This Month",
            "Custom Range"];
        itemsList.forEach(function (item, index) {
            expect(item).toEqual(expectedList[index])
        })
    });

    it('Date Filter - Dates Range', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        // Clicking on Date filter
        // Click Apply and check if filter tag is created
        await Promise.all([
            await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(4)"),
            page.waitForSelector("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(2) > div > input")
        ]);

        await page.$eval("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(1) > div > input[type=\"text\"]", (selector) => {
            selector.value = "";
        });
        await page.$eval("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(2) > div > input[type=\"text\"]", (selector) => {
            selector.value = "";
        });

        // Date input
        await page.focus("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(1) > div > input[type=\"text\"]");
        await page.type("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(1) > div > input[type=\"text\"]", "04/12/2010");
        await page.focus("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(2) > div > input[type=\"text\"]");
        for (let i = 0; i < 15; i++)
            await page.keyboard.press('Backspace');
        await page.type("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(2) > div > input[type=\"text\"]", "05/12/2010");
        // Click Apply and check if filter tag is created
        await Promise.all([
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
