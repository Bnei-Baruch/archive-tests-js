const puppeteer = require('puppeteer');
const width = 1920;
const height = 1080;
let browser;
let page;
let originalTimeout;
const lessonsUrl = 'https://archive.kbb1.com/lessons';
const lessonsPlayerUrl = 'https://archive.kbb1.com/lessons/cu/uyFMxrLN';

describe('Setup' , function () {
    beforeAll((async function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        await page.setViewport({width, height});
    }));


    describe('Archive Test Suite ', function () {

        it('Daily Lesson Section ', async function () {
            await page.goto(lessonsUrl);
            // header
            expect(await page.$('.section-header')).toBeDefined();
            // header title
            expect(await page.$eval('.section-header__title',
                (selector) => {return selector.innerHTML})).toBe('Daily Lessons');
            // filters
            expect(await page.$$eval('.ui.container.padded.horizontally a',
                (selector) => {return selector.length})).toBe(3);
        });

        it('Daily Lesson - Pagination', async function () {
            await page.goto(lessonsUrl);
            expect(await page.$eval('.ui.blue.compact.pagination-menu.menu',
                (selector) => {return selector.className})).toBe('ui blue compact pagination-menu menu');
        });

        it('Daily Lesson - Player', async function () {
            await page.goto(lessonsPlayerUrl);
            expect(await page.$('.mediaplayer')).toBeDefined();
        });
    });

    afterAll(async function () {
        await browser.close();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
