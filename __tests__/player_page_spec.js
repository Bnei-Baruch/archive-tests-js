const puppeteer = require('puppeteer');
const testconfig = require('./testconfig');
const utils = require('../utils.js');
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

describe('Player Page Test Suite => ', function () {

    it('Player Exists', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});
        expect(await page.$('.mediaplayer')).toBeDefined();
    });

    it('Player Controls', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});
        expect(await page.$('.step.backward')).toBeDefined();
        expect(await page.$('.step.forward')).toBeDefined();
        expect(await page.$('.play.icon')).toBeDefined();
        expect(await page.$('.mediaplayer__timecode')).toBeDefined();
        expect(await page.$('.backword.icon')).toBeDefined();
        expect(await page.$('.forward.icon')).toBeDefined();
        expect(await page.$('.mediaplayer__playback-rate')).toBeDefined();
        expect(await page.$('.mediaplayer__seekbar')).toBeDefined();
        expect(await page.$('.mediaplayer__video-size')).toBeDefined();
        expect(await page.$('.mediaplayer__volume')).toBeDefined();
        expect(await page.$('.mediaplayer__audiovideo')).toBeDefined();
        expect(await page.$('.mediaplayer__languages')).toBeDefined();
        expect(await page.$('.player-button.player-control-edit-slice')).toBeDefined();
        expect(await page.$('.player-button.player-control-fullscreen')).toBeDefined();
        expect(await page.$('.mediaplayer__onscreen-controls')).toBeDefined();
    });

    it('Player Download Section', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});

        let download_labels = await page.$$eval('.media-downloads__file-label', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
        expect(download_labels[0]).toEqual('Lesson Video [360p]');
        expect(download_labels[1]).toEqual('Lesson Video [720p]');
        expect(download_labels[2]).toEqual('Lesson Audio');

        expect(await page.$$eval('.media-downloads__file-download-btn', (selectors) => {
            return selectors.length
        })).toEqual(3);

        expect(await page.$$eval('.media-downloads__file-copy-link-btn', (selectors) => {
            return selectors.length
        })).toEqual(3);
    });

    it('Player Other Parts Section', async function () {
        await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});

        expect(await page.$$eval('a.item.recommended-same-collection__item', (selectors) => {
            return selectors.length
        })).toBeGreaterThan(0);
    });

    it('Player Unit Materials - Tabs-Menu - Displayed', async function () {
        await page.goto(testconfig.resources.unitMaterialsUrl, {waitUntil: 'networkidle2'});

        let unitMaterialsElementsText = await page.$$eval('.ui.blue.pointing.secondary.menu a', (selectors) => {
            return selectors.map(selector => selector.text)
        });
        expect(unitMaterialsElementsText.length).toBe(4);
        expect(unitMaterialsElementsText[0]).toEqual('Summary');
        expect(unitMaterialsElementsText[1]).toEqual('Transcription');
        expect(unitMaterialsElementsText[2]).toEqual('Sources');
        expect(unitMaterialsElementsText[3]).toEqual('Sketches');
    });

    it('Player Unit Materials - Tabs-Menu - Clickable', async function () {
        await page.goto(testconfig.resources.unitMaterialsUrl, {waitUntil: 'networkidle2'});

        let element = '.ui.blue.pointing.secondary.menu a';
        // get first time all classes
        let unitMaterialsElements = await page.$$(element);

        for (let i = 0; i < unitMaterialsElements.length; i++) {
            await unitMaterialsElements[i].click();
            utils.delay(1000);
            await page.waitForSelector('.ui.blue.pointing.secondary.menu .active', {'timeout': 60000});
            //  fetch active and verify it's the one we clicked

            // get again class name
            unitMaterialsElements = await page.$$(element);

            await page.waitForSelector('.ui.blue.pointing.secondary.menu .active', {'timeout': 60000});
            utils.delay(1000);

            expect(unitMaterialsElements[i]._remoteObject.description).toContain('active');
            console.log('\n ' + i);
        }
    });

    it('Player Unit Materials - Tabs-Menu - Summary', async function () {
        await page.goto(testconfig.resources.summaryUrl, {waitUntil: 'networkidle2'});

        let element = '.ui.basic.segment div';
        // Click on Summary tab
        await Promise.all([
            page.click('.item.tab-summary'),
            page.waitForSelector(element),
        ]);
        expect(await page.$eval(element, (selector) => {
            return selector.innerHTML
        })).toContain('האור המחזיר למוטב מביא לאדם את הרגשת המוות ובמקביל, את ההבנה מהם החיים.')
    });

    it('Player Unit Materials - Tabs-Menu - Transcription', async function () {
        await page.goto(testconfig.resources.unitMaterialsUrl, {waitUntil: 'networkidle2'});

        let element = 'div .doc2html';

        // Click on Summary tab
        await Promise.all([
            page.click('.item.tab-transcription'),
            page.waitForSelector(element),
        ]);
        expect(await page.$eval(element, (selector) => {
            return selector.innerText
        })).toContain('כולנו כאחד')
    });

    it('Player Unit Materials - Tabs-Menu - Sources', async function () {
        await page.goto(testconfig.resources.unitMaterialsUrl, {waitUntil: 'networkidle2'});
        // Click on Summary tab
        await Promise.all([
            page.click(".item.tab-sources"),
            page.waitForSelector("div .doc2html"),
        ]);
        expect(await page.$eval("div .doc2html", (selector) => {
            return selector.innerText
        })).toContain('World kabbalah Convention in Georgia - “All A One”')
    });

    it('Player Unit Materials - Tabs-Menu - Sketches', async function () {
        await page.goto(testconfig.resources.unitMaterialsUrl, {waitUntil: 'networkidle2'});
        // Click on Summary tab
        await Promise.all([
            page.click('.item.tab-sketches'),
            page.waitForSelector('.image-gallery-image'),
        ]);
        expect(await page.$$eval('.image-gallery-thumbnail', (selectors) => {
            return selectors.length
        })).toBe(20);
        expect(await page.$eval('.image-gallery-image img', (selector) => {
            return selector.src
        })).toBe('https://archive.kbb1.com/assets/unzip/HsoLO15s/heb_o_rav_2017-09-15_congress_lesson_georgia_n0_p1_pic01.jpg')
    });
});


afterAll(async function () {
    await browser.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

