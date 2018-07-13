const puppeteer = require('puppeteer');
const player_utils = require('../src/player_utils');
const utils = require('../src/utils');
const testconfig = require('./testconfig');
const width = 1400;
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

describe('Player Test Suite => ', function () {

    xit('playerTimeCode', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});

        let timeCodes = await player_utils.getTimeCode(page);

        expect(timeCodes[0]).toBe('00:00');
        expect(timeCodes[1]).not.toBe('00:00');
    });

    xit('timeCodeUpdateByPlay', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});

        await player_utils.waitPlayerToLoad(page);
        await player_utils.playByClick(page);
        await utils.sleep(5000);

        expect(await player_utils.getPlayerCurrentTime(page)).toBeGreaterThan(0);
    });

    xit('timeCodeUpdateByScroll', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});

        await player_utils.waitPlayerToLoad(page);

        const rect = await page.$eval('.mediaplayer__seekbar .seekbar__knob', (selector) => {
            const {top, left, bottom, right} = selector.getBoundingClientRect();
            return {top, left, bottom, right};
        });

        // console.debug("Rect >> top: " + rect.top + " left: " + rect.left + " bottom: " + rect.bottom +
        //     " right: " + rect.right);

        let current_mouse_x = rect.left + ((rect.right - rect.left) / 2);
        let current_mouse_y = rect.top + ((rect.top - rect.bottom) / 2);

        // console.debug("Before Drag: " + await player_utils.getPlayerCurrentTime(page));

        await page.mouse.move(current_mouse_x, current_mouse_y);
        await page.mouse.down();
        await page.mouse.move(current_mouse_x + 100, current_mouse_y);
        await page.mouse.up();

        // console.debug("After Drag: " + await player_utils.getPlayerCurrentTime(page));

    });

    xit('timeCodeUpdateByLink', async function () {

    });

    xit('videoSize', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});

        // click on playback rate
        await page.click('.mediaplayer__video-size');
        let videoSizeElements = await page.$$eval('.mediaplayer__video-size span', (selectors) => {
            return selectors.map(selector => selector.innerText);
        });

        expect(videoSizeElements.length).toBeCloseTo(2);
        expect(videoSizeElements[0].trim()).toEqual('720p');
        expect(videoSizeElements[1].trim()).toEqual('360p');
    });


    xit('speedSelector_1X', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});

        // click on playback rate
        await page.click('.mediaplayer__playback-rate');
        let rateElements = await page.$$eval('.visible.menu.transition div span', (selectors) => {
            return selectors.map(selector => selector.innerText);
        });
        expect(rateElements.length).toBeCloseTo(5);
        expect(rateElements[0].trim()).toEqual('2x');
        expect(rateElements[1].trim()).toEqual('1.5x');
        expect(rateElements[2].trim()).toEqual('1.25x');
        expect(rateElements[3].trim()).toEqual('1x');
        expect(rateElements[4].trim()).toEqual('0.75x');
    });

    xit('speedSelector_1_5X', async function () {

    });

    xit('speedSelector_2X', async function () {

    });

    xit('volumeBar', async function () {

    });

    xit('audioVideoToggle', async function () {

    });

    xit('languageSelector', async function () {

    });

    xit('fullScreenToggle', async function () {

    });

    xit('sharingModeOn', async function () {

    });

    xit('countPlayerButtons', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});

        // verify that displayed all buttons 10
        let playerButtons = await page.$$eval('.mediaplayer__controls button', (selectors) => {
            return selectors.map(selector => selector.innerHTML)
        });
        expect(playerButtons.length).toBeCloseTo(10);
    });

    xit('playerSkipTimeShortKeys', async function () {
        // hold Shift and left right narrow jump by 10 seconds

        // hold Option and left right narrow jump by 5 seconds
    });

    xit('sharingModeOff', async function () {

    });

    xit('sharingModeActions', async function () {

    });
});

afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
