const puppeteer = require('puppeteer');
const utils = require('../utils.js');
const testconfig = require('./testconfig');
const width = 1490;
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


let verticalMenu = '.vertical.menu';
let sectionHeader = '.section-header';
let sectionHeaderTitle = '.section-header__title';
let horizontalFilters = '.horizontally';

describe('Daily Lesson Page Test Suite => ', function () {

    xit('Vertical Menu - Displayed', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

        await page.waitForSelector(verticalMenu);
        // choose Daily Lessons section from vertical menu
        await page.click(verticalMenu);
        // vertical menu count
        let filters = await page.$$eval(verticalMenu + ' a', (selectors) => {
            return selectors.map(selector => selector.text)
        });
        expect(filters.length).toBeCloseTo(9);
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

    xit('Filter and Headers - Displayed', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        await page.waitForSelector(verticalMenu);

        // header
        expect(await page.$(sectionHeader)).toBeDefined();
        // header title
        expect(await page.$eval(sectionHeaderTitle, (selector) => {
            return selector.innerHTML
        })).toBe('Daily Lessons');

        // filters
        let filters = await page.$$eval(horizontalFilters + ' a', (selectors) => {
            return selectors.map(selector => selector.text)
        });
        expect(filters.length).toBeCloseTo(3);
        expect(filters[0]).toEqual('Topics');
        expect(filters[1]).toEqual('Sources');
        expect(filters[2]).toEqual('Date');
    });

    xit('Filter - Clickable', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        await page.waitForSelector(verticalMenu);

        // get all filters elements
        const filters = await page.$('.horizontally');
        utils.sleep(1);

        const a = await filters.$$('a');
        console.log('a', a.length);

        // console.log('filters', filters);

        let filtersb = await page.$$eval(horizontalFilters + ' a', (selectors) => {
            return selectors.map(selector => selector.text)
        });

        // for (let i = 0; i < filters.length; i++)
        expect(filtersb)
            .toEqual(['Topics', 'Sources', 'Date']);

        // console.log(await filters[0].$$eval('.item', nodes => nodes.map(n => n.innerText)));


        // for (let i = 0; i < filters.length; i++) {


        utils.sleep(1);
        // }

        // for (let i = 0; i < filters.length; i++) {
        //
        //     // horizontalSelectorClassName = await page.$eval(horizontalFilters + ' a', (selector) => {
        //     //     return selector.className;
        //     // });
        //
        //     // expect(horizontalSelectorClassName.toString).not.toContain('active');
        //
        //     // expect(await page.$eval(horizontalFilters + ' a', (selector) => {
        //     //     return selector.className;
        //     // })).not.toContain('active');
        //
        //
        //     // todo - continue to do refactoring
        //     const feedHandle = await page.$('.feed');
        //     expect(await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText)).toEqual(['Hello!', 'Hi!']);
        //
        //
        //     console.log('before ===>>> ' + await filters[i].$$eval());
        //
        //     await filters[i].click();
        //     utils.sleep(1000);
        //
        //     console.log('after ===>>> ' + await filters[i].className);
        //
        //     // console.log('\n ====>>> ' + await filters[i].className + ' count of i ==>> ' + i);
        //
        //     // expect(horizontalSelectorClassName).toContain('active');
        //
        //     // expect(await page.$eval(horizontalFilters + ' a', (selector) => {
        //     //     return selector.className;
        //     // })).toContain('active');
        //
        // }

        // for (let i = 2; i <= 4; i++) {
        //     await page.click(horizontalFilters + 'a:nth-child(' + i + ')');
        //
        //     expect(await page.$eval(horizontalFilters + 'a:nth-child(' + i + ')', (selector) => {
        //         // console.log("Found: " + selector);
        //         return selector.className;
        //     })).toBe('active item');
        // }
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

    it('Pagination Next/Previous/Last/First', async function () {
        await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        await utils.pagination(page);
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

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
