const puppeteer = require('puppeteer');
const reporters = require('jasmine-reporters');
const testconfig = require(__dirname + '/testconfig.json');
const width = 1920;
const height = 1080;
let browser;
let page;
let originalTimeout;

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

        let unitMaterialsElements = await page.$$('.ui.blue.pointing.secondary.menu a');
        for (let i = 0; i < unitMaterialsElements.length; i++) {
            await unitMaterialsElements[i].click();
            const innerHTML = await page.evaluate(e => e.outerHTML, unitMaterialsElements[i]);
            const text = await page.evaluate(e => e.text, unitMaterialsElements[i]);
            expect(innerHTML).toEqual('<a class="active item tab-' + text.toLowerCase() + '">' + text + '</a>')
        }
    });

    it('Daily Lesson - Player Unit Materials - Transcription', async function () {
        await page.goto(testconfig.resources.unitMaterialsUrl, {waitUntil: 'networkidle2'});
        await Promise.all([
            await page.click('.item.tab-transcription'),
            page.waitForSelector('div.doc2html'),
        ]);
        let title = await page.$eval('div.doc2html strong', (selector) => {
            return selector.innerHTML;
        });
        expect(title).toEqual('כולנו כאחד');
    });

    it('Daily Lesson - Player Unit Materials - Sources', async function () {
        await page.goto(testconfig.resources.unitMaterialsUrl, {waitUntil: 'networkidle2'});
        await Promise.all([
            await page.click('.item.tab-sources'),
            page.waitForSelector('div.doc2html'),
        ]);
        let title = await page.$eval('div.doc2html > p:nth-child(2) > strong > span', (selector) => {
            return selector.innerHTML;
        });
        expect(title).toEqual('World kabbalah Convention in Georgia - “All A One”');
    });

    it('Daily Lesson - Player Unit Materials - Sketches', async function () {
        await page.goto(testconfig.resources.unitMaterialsUrl, {waitUntil: 'networkidle2'});
        await Promise.all([
            await page.click('.item.tab-sketches'),
            page.waitForSelector('.image-gallery-image img'),
        ]);
        let img_dimensions = await page.$eval('.image-gallery-image img', (selector) => {
            return {width: selector.width, height: selector.height};
        }).catch((e)=>{console.error(e)});
        console.debug("IMAGE tag properties: " + img_dimensions.width + " " + img_dimensions.height);
        expect(img_dimensions.width).toBeGreaterThan(0);
    });
    afterAll(async function () {
        await browser.close();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    afterAll(async function () {
        await browser.close();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});

