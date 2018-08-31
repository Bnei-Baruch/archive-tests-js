import {ClientFunction} from "testcafe";
const selectors = require('./selectors');

const PLAYER_PLAY_BUTTON = "i.play.icon";
const PLAYER_PAUSE_BUTTON = "i.pause.icon";

const getReadyState = ClientFunction(() => {
    return document.querySelector(selectors.player.playerTag).readyState;
});

const getPlayerCurrentTime = ClientFunction(() => {
    return document.querySelector(selectors.player.playerTag).currentTime;
});

module.exports = {

    getTimeCode: async function (page) {
        let readyState = 0;
        await page.waitForSelector("video");
        do {
            readyState = await page.$eval("video", (selector) => {
                return selector.readyState;
            });
            // console.debug("ReadyState ===> " + readyState)
        } while (readyState === 0);
        return await page.$$eval('.mediaplayer__timecode time', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
    },

    secondsToTime: function (secs) {
        secs = Math.round(secs);
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    },

    waitPlayerToLoad: async function () {
        let readyState = 0;
        do {
            readyState = await getReadyState();
            console.debug("ReadyState ===> " + readyState)
        } while (readyState < 2);
    },

    getPlayerCurrentTime:  async function () {
        return getPlayerCurrentTime()
    },

    getPlayerDuration: async function (page) {
        return await page.$eval("video", (selector) => {
            return selector.duration;
        });
    },

    playByClick: async function (page){
        await Promise.all([
            page.waitForSelector(PLAYER_PLAY_BUTTON),
            page.click(PLAYER_PLAY_BUTTON)
        ]);
    },

    stopByClick: async function (page){
        await Promise.all([
            page.waitForSelector(PLAYER_PAUSE_BUTTON),
            page.click(PLAYER_PAUSE_BUTTON)
        ]);
    },
};
