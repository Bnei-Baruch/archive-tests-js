
const puppeteer = require('puppeteer');
const testconfig = require('spec/testconfig');
const width = 1920;
const height = 1080;
let browser;
let page;
let originalTimeout;

describe('Setup', function () {
    beforeAll((async function () {
        try {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            browser = await puppeteer.launch({headless: false});
            page = await browser.newPage();
            await page.setViewport({width, height});
        } catch (err) {
            expect(err.status).toBeGreaterThanOrEqual(200);
        }
    }));


    describe('Player Page Test Suite ', function () {

        it('Daily Lesson - Player Exists', async function () {
            await page.goto(testconfig.resources.playerUrl, {waitUntil: 'domcontentloaded'});
            expect(await page.$('.mediaplayer')).toBeDefined();
        });
        it('Daily Lesson - Player Controls', async function () {
            await page.goto(lessonsPlayerUrl, {waitUntil: 'domcontentloaded'});
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

        it('Daily Lesson - Player Download Section', async function () {
            await page.goto(testconfig.resources.playerUrl, {waitUntil: 'domcontentloaded'});
            let download_labels = await page.$$eval('.media-downloads__file-label', (selectors) => {
                return selectors.map(selector => selector.innerText)
            });
            expect(download_labels[0]).toEqual("Lesson Video [360p]");
            expect(download_labels[1]).toEqual("Lesson Video [720p]");
            expect(download_labels[2]).toEqual("Lesson Audio");
            expect(await page.$$eval('.media-downloads__file-download-btn', (selectors) => {
                return selectors.length
            })).toEqual(3);
            expect(await page.$$eval('.media-downloads__file-copy-link-btn', (selectors) => {
                return selectors.length
            })).toEqual(3);
        });

        it('Daily Lesson - Player Other Parts Section', async function () {
            await page.goto(testconfig.resources.playerUrl, {waitUntil: 'networkidle2'});
            expect(await page.$$eval('a.item.recommended-same-collection__item', (selectors) => {
                return selectors.length
            })).toBeGreaterThan(0);
        });

        afterAll(async function () {
            await browser.close();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
