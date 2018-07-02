const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
const utils = require('../src/utils.js');
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

describe('Publications Page Test Suite => ', function () {

    xit('Header and Filters - Displayed', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});
        // header
        expect(await page.$('.section-header')).toBeDefined();
        // header title
        expect(await page.$eval('.section-header__title', (selector) => {
            return selector.innerHTML
        })).toBe('Publications');

        let filters = await page.$$eval('.ui.container.padded.horizontally a.item', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(filters.length).toBe(2);
        expect(filters[0].trim()).toEqual('Publishers');
        expect(filters[1].trim()).toEqual('Date');
    });


    xit('Pagination Next/Previous/Last/First', async function () {
        await page.goto(testconfig.resources.programsUrl, {waitUntil: 'networkidle2'});
        await utils.pagination(page);
    });


    xit('Filter - Clickable', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});

        for (let i = 2; i <= 3; i++) {
            await page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(' + i + ')');
            expect(await page.$eval('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(' + i + ')',
                (selector) => {
                    return selector.className;
                })).toBe('active item');
        }
    });

    xit('Filter - Apply Button Enable/Disable', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});

        // Publishers filter - Apply button expected to be disabled
        await page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(2)');
        expect(await page.$eval('.ui.primary.disabled.right.floated.button',
            (selector) => {
                return selector.disabled;
            })).toBeTruthy();


        // Date filter - Apply button expected to be enabled
        await page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)');
        expect(await page.$eval('.ui.primary.button',
            (selector) => {
                return selector.disabled;
            })).toBeFalsy();
    });

    xit('Filter - Apply Button - Click', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});

        //Click on 'Publishers' filter
        await page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(2)');

        //Clicking on 1-st item in Filter's Drop-Down - ‘algemeiner’
        await page.click('.ui.blue.tiny.fluid.vertical.menu a:first-child');

        //Selected item expected to be active
        expect(await page.$eval('.ui.blue.tiny.fluid.vertical.menu a:first-child',
            (selector) => {
                return selector.className;
            })).toBe('active item');

        await Promise.all([
            // Click on button 'Apply'
            page.click('.ui.primary.right.floated.button'),
            // button 'algemeiner'
            page.waitForSelector('.ui.blue.basic.button'),
        ]);

        //expect btn 'algemeiner'
        expect(await page.$eval('.ui.blue.basic.button',
            (selector) => {
                return selector.innerText;
            })).toBe('algemeiner');
    });

    xit('Date Filter Displayed', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});

        // Click on Date filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)");

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

        // Title Date Range
        expect(await page.$eval(".ui.center.aligned.header", (selector) => {
            return selector.innerText;
        })).toBe("Select a date range");
    });

    xit('Date Filter - DropDown - Last 7 Days', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});

        // Clicking on Date filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)");

        // check 'Apply' btn enabled
        expect(await page.$eval(".ui.primary.button", (selector) => {
            return selector.disabled;
        })).toBeFalsy();

        // Click on Dates range drop down and select "Last 7 days"
        await page.click(".ui.fluid.item.dropdown");
        await page.click(".ui.active.visible.fluid.item.dropdown div div:nth-child(3)");
        expect(await page.$eval(".ui.fluid.item.dropdown .text",
            (selector) => {
                return selector.innerText;
            })).toBe("Last 7 Days");

        // Click Apply and check if filter tag is created
        await Promise.all([
            page.click('.ui.primary.button'),
            page.waitForSelector('.ui.blue.basic.button'),
        ]);

        // Verify calendar.icon
        expect(await page.$eval('.ui.blue.basic.button .calendar.icon',
            (selector) => {
                return selector.className;
            })).toBeDefined();
    });

    xit('Date Filter - Select', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});
        let today = utils.getCurrentDate();

        // Clicking on Date filter
        await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)");
        expect(await page.$eval('.ui.fluid.item.dropdown', (selector) => {
            return selector.innerText;
        })).toBe('Today');  // Default value "Today"

        //expect value in field 'input date' is today date
        let dates_range = await page.$$eval('.ui.fluid.input input', (selectors) => {
            return selectors.map(selector => selector.value);
        });

        for (let date of dates_range) {
            expect(date).toBe(today);  // Default value => Should display Today's date
        }

        // Checking all items in the dropDown menu
        let itemsList = await page.$$eval('.visible.menu.transition span', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });

        let expectedList = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last Month', 'This Month',
            'Custom Range'];
        itemsList.forEach(function (item, index) {
            expect(item).toEqual(expectedList[index])
        })
    });

    xit('Date Filter - Dates Range', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});

        // Clicking on Date filter
        // Click Apply and check if filter tag is created
        await Promise.all([
            await page.click('.ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(3)'),
            // div.five.wide.column - date range col
            page.waitForSelector('div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(2) > div > input')
        ]);

        await page.$eval('div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(1) > div > input[type=\"text\"]', (selector) => {
            selector.value = "";
        });
        await page.$eval("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(2) > div > input[type=\"text\"]", (selector) => {
            selector.value = "";
        });

        // Date input
        await page.focus("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(1) > div > input[type=\"text\"]");
        await page.type("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(1) > div > input[type=\"text\"]", "04/12/2010");
        await page.focus("div.five.wide.column > div.ui.grid > div:nth-child(2) > div:nth-child(2) > div > input[type=\"text\"]");

        for (let i = 0; i < 15; i++) await page.keyboard.press('Backspace');

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

    xit('Displayed Results 1 - 10 0f', async function () {
        await page.goto(testconfig.resources.publicationsUrl, {waitUntil: 'networkidle2'});

        expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
            return selector.innerText;
        })).toContain('Results 1 - 10 of')
    });

});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
