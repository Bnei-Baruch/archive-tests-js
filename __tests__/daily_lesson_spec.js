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

describe('Daily Lesson => ', function () {

    it('All Elements Exists', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

        // title and subtitle
        expect(await page.$eval(selectors.common.title, s => s.innerText.trim()))
            .toBe(texts.lessons.title);
        expect(await page.$eval(selectors.common.subtitle, s => s.innerText.trim()))
            .toBe(texts.lessons.subtitle);

        // standard block
        expect(await page.$eval(selectors.common.logo, s => s.innerText.trim()))
            .toBe(texts.common.logo);
        expect(await page.$$eval(selectors.common.sideBar, ss => ss.map(s => s.innerText.trim())))
            .toEqual(texts.common.sideBar);
        expect(await page.$eval(selectors.common.donateButton, s => s.innerText.trim()))
            .toBe(texts.common.donateButton);
        expect(await page.$eval(selectors.common.languageDropDown, s => s.innerText.trim()))
            .toBe(texts.common.languageDropDown);
        expect(await page.$eval(selectors.common.footer, s => s.textContent.trim()))
            .toBe(texts.common.footer);
        expect(await page.$(selectors.common.searchInput)).toBeDefined();

        // filters
        expect(await page.$$eval(selectors.common.filterOptionsHighLevel, ss => ss.map(s => s.innerText)))
            .toEqual(texts.lessons.filterTabNames);

        expect(await page.$$eval(selectors.lessons.containerPageResults, s => s.length))
            .toBe(10);

        await utils.pagination(page);
    });

    it('Click on tabular filters and check horizontal', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

        await utils.click(page, selectors.common.filterOptionsHighLevel, 0);
        await utils.isFilterPopUpOpened(page, selectors.common.filterTabsNames);

        await utils.click(page, selectors.common.filterOptionsHighLevel, 1);
        await utils.isFilterPopUpOpened(page, selectors.common.filterTabsNames);

        await utils.click(page, selectors.common.filterOptionsHighLevel, 2);
        await utils.isFilterPopUpOpened(page, selectors.common.filterTabsNames);

        await utils.click(page, selectors.common.filterOptionsHighLevel, 3);
        await utils.isFilterPopUpOpened(page, selectors.common.filterTabsNames);

        await utils.click(page, selectors.common.filterOptionsHighLevel, 4);

        utils.sleep(1000);
        expect(await page.$$eval(selectors.lessons.selectedStudyH2, ss => ss.map(s => s.innerText)))
            .toEqual(texts.lessons.studySeriesH2);
    });

    xit('Filter - Apply Button Enable/Disable', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        // Topics & Sources filters - Apply button expected to be disabled
        for (let i = 2; i <= 3; i++) {
            await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")");
            expect(await page.$eval(".ui.primary.disabled.right.floated.button", (selector) => {
                return selector.disabled;
            })).toBeTruthy();
        }
        // Date filter - Apply button expected to be enabled
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + 4 + ")");
        expect(await page.$eval(".ui.primary.button", (selector) => {
            return selector.disabled;
        })).toBeFalsy();
    });

    xit('Date Filter Displayed', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        // Click on Date filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(4)");
        // Apply button enabled
        expect(await page.$eval(".ui.primary.button", (selector) => {
            return selector.disabled;
        })).toBeFalsy();
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

    xit('Date Filter - DropDown - Last 7 Days', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

        // Clicking on Date filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(4)");
        expect(await page.$eval(".ui.primary.button", (selector) => {
            return selector.disabled;
        })).toBeFalsy();

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

    xit('Date Filter - Select', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        let today = utils.getCurrentDate();

        // Clicking on Date filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(4)");
        expect(await page.$eval(".ui.fluid.item.dropdown", (selector) => {
            return selector.innerText;
        })).toBe("Today");  // Default value "Today"
        let dates_range = await page.$$eval(".ui.fluid.input input", (selectors) => {
            return selectors.map(selector => selector.value);
        });
        for (let date of dates_range) {
            expect(date).toBe(today);  // Default value => Should display Today's date
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

    xit('Date Filter - Dates Range', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

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

    xit('Player Exist', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});
        expect(await page.$('.mediaplayer')).toBeDefined();
    });

    xit('Filter - Apply Button - Click', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

        let element = '.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(2)';
        utils.sleep(1000);
        // Click on "Topic" filter
        await page.click(element);
        await page.waitForSelector(element, {'timeout': 60000});

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

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
