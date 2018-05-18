const puppeteer = require('puppeteer');
const player_utils = require('../player_utils');
const testconfig = require(__dirname + '/testconfig.json');
const width = 1920;
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
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});

        let timeCodes = await player_utils.getTimeCode(page);
        expect(timeCodes[0]).toBe("00:00");
        expect(timeCodes[1]).not.toBe("00:00");
    });

    it("timeCodeUpdateByPlay", async function () {

    });

    it("timeCodeUpdateByScroll", async function () {

    });

    it("timeCodeUpdateByLink", async function () {

    });

    it("speedSelector_1X", async function () {

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
