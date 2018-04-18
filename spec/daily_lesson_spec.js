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
            // await page.setViewport({width, height});
        } catch (err) {
            expect(err.status).toBeGreaterThanOrEqual(200);
        }
    }));

    describe('Archive Test Suite ', function () {

        // it('Daily Lesson Section ', async function () {
        //     await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});
        //     // header
        //     expect(await page.$('.section-header')).toBeDefined();
        //     // header title
        //     expect(await page.$eval('.section-header__title', (selector) => {
        //         return selector.innerHTML
        //     })).toBe('Daily Lessons');
        //     // filters
        //     expect(await page.$$eval('.ui.container.padded.horizontally a', (selector) => {
        //         return selector.length
        //     })).toBe(3);
        //     let filters = await page.$$eval('.ui.container.padded.horizontally a.item', (selectors) => {
        //         return selectors.map(selector => selector.text)
        //     });
        //     expect(filters[0]).toEqual("Topics");
        //     expect(filters[1]).toEqual("Sources");
        //     expect(filters[2]).toEqual("Date");
        //
        // });
        //
        // it('Daily Lesson - Main List structure', async function () {
        //     await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});
        //
        //     expect(await page.$eval('h2.ui.header.pagination-results', (selector) => {
        //         return selector.innerText
        //     })).toContain("Results 1 - 10 of")
        // });
        //
        // it('Daily Lesson - Filters Clickable', async function () {
        //     await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});
        //     for(let i=2;i<=4; i++) {
        //         await page.click(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")");
        //         expect(await page.$eval(".ui.blue.large.pointing.secondary.index-filters.menu div a:nth-child(" + i + ")",
        //             (selector) => {
        //                 console.log("Found: "+ selector);
        //                 return selector.className;
        //             })).toBe('active item');
        //     }
        // });
        //
        // it('Daily Lesson - Pagination ', async function () {
        //     await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'domcontentloaded'});
        //     expect(await page.$eval('.ui.blue.compact.pagination-menu.menu', (selector) => {
        //         return selector.className
        //     })).toBe('ui blue compact pagination-menu menu');
        // });

        it('Daily Lesson - Pagination Next/Previous/Last/First ', async function () {
            await page.goto(testconfig.resources.dailyLessonUrl, {waitUntil: 'networkidle2'});

            // let paginationItems = await page.$$eval('.ui.blue.compact.pagination-menu.menu div', (selectors) => {
            //     return selectors.map(selector => selector.innerHTML)
            // });

            let paginationItems = await page.$$('.ui.blue.compact.pagination-menu.menu *');
            let elementName;
            for(let i=0; i<paginationItems.length;i++){
                // await paginationItems[i].click();
                elementName = paginationItems[i]._remoteObject.description;
                // console.log(await page.evaluate(e => e.outerHTML, paginationItems[i]));
                console.log("propertyName => " + await paginationItems[i]._remoteObject.description);
                //await page.emulate(e => );
            }




            // expect(paginationItems[0]).toEqual("<i aria-hidden=\"true\" class=\"angle double left icon\"></i>");
            // expect(paginationItems[1]).toEqual("<i aria-hidden=\"true\" class=\"angle left icon\"></i>");
            // expect(paginationItems[2]).toEqual("<i aria-hidden=\"true\" class=\"ellipsis horizontal icon\"></i>");


            // click on last pagination item


            // let paginationSelector = await page.$$('.ui.blue.compact.pagination-menu.menu div', (selectors) => {
            //     selectors[5].click();
            //     //return selectors.map(selector => selector);
            //     console.log(selectors);
            //     return selectors.length;
            // });
            // // await page.waitForNavigation({waitUntil: "networkidle2"})
            //
            //
            //
            //
            // await Promise.all([
            //     paginationSelector.click(),
            //     page.waitForNavigation({waitUntil:"networkidle2"})
            // ]);

            // paginationItems = await page.$$('.ui.blue.compact.pagination-menu.menu div', (selectors) => {
            //     return selectors.map(selector => selector.innerHTML)
            // });
            //
            // expect(paginationItems[0]).toEqual("<i aria-hidden=\"true\" class=\"ellipsis horizontal icon\"></i>");
            // expect(paginationItems[1]).toEqual("<div class=\"disabled item\"><i aria-hidden=\"true\" class=\"angle right icon\"></i></div>");
            // expect(paginationItems[2]).toEqual("<div class=\"disabled item\"><i aria-hidden=\"true\" class=\"angle double right icon\"></i></div>");
            //
            //
            // // paginationItems[paginationItems.length - 1].click();
            // // console.log(paginationItems);
            //
            // let waitTill = new Date(new Date().getTime() + 5 * 1000);
            // while (waitTill > new Date()) {
            // }

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
