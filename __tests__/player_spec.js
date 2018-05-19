const puppeteer = require('puppeteer');
const testconfig = require(__dirname + '/testconfig.json');
const width = 1400;
const height = 1080;
let browser;
let page;
let originalTimeout;


beforeAll((async function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    browser = await puppeteer.launch(testconfig.browser);
    page = await browser.newPage();
    await page.setViewport({width, height});
}));

describe('Player Test Suite => ', function () {

    it("playerTimeCode", async function () {

    });

    it("timeCodeUpdateByPlay", async function () {

    });

    it("timeCodeUpdateByScroll", async function () {

    });

    it("timeCodeUpdateByLink", async function () {

    });

    it("speedSelector_1X", async function () {
        // // playerUrl
        // await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});
        //
        // let playerButtons = await page.$$eval('.mediaplayer__controls button', (selectors) => {
        //     return selectors.map(selector => selector.innerHTML)
        // });
        // expect(playerButtons.length).toBe(10);
        //
        // await page.click('.mediaplayer__controls > div.buttons-wrapper > button');
        //
        //
        // console.log('============>>>>');
        // // Click on Summary tab
        // await Promise.all([
        //     page.click(".item.tab-sketches"),
        //     page.waitForSelector(".image-gallery-image"),
        // ]);

        // .visible.menu.transition => esli soderzhit zero znachit zakrit poka chto


    });

    it("speedSelector_1_5X", async function () {

    });

    it("speedSelector_2X", async function () {

    });

    it("volumeBar", async function () {

    });

    it("audioVideoToggle", async function () {

    });

    it("languageSelector", async function () {

    });

    it("fullScreenToggle", async function () {

    });

    it("sharingModeOn", async function () {

    });

    it("playerButtons", async function () {

    });

    it("playerSkipTimeShortKeys", async function () {

    });

    it("sharingModeOff", async function () {

    });

    it("sharingModeActions", async function () {

    });
});
