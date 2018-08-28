import {ClientFunction} from "testcafe";
const selectors = require('./selectors');

const getReadyState = ClientFunction((selectors) => {
    return document.querySelector(selectors.player.playerTag).readyState;
});

const getCurrentTime = ClientFunction((selectors) => {
    return document.querySelector(selectors.player.playerTag).currentTime;
});

const getDuration = ClientFunction((selectors) => {
    return document.querySelector(selectors.player.playerTag).duration;
});

let self = module.exports = {

    getTimeCode: async function () {
        await self.waitForPlayerToLoad()
        // TODO
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

    waitForPlayerToLoad: async function () {
        let readyState = 0;
        do {
            readyState = await getReadyState(selectors);
            console.debug("ReadyState ===> " + readyState)
        } while (readyState < 2);
    },

    getPlayerCurrentTime:  async function () {
        return getCurrentTime()
    },

    getPlayerDuration: async function () {
        return getDuration()
    },

    playByClick: async function (t: TestController){
        await t.click(selectors.player.controls.play)
    },

    stopByClick: async function (t: TestController){
        await t.click(selectors.player.controls.pause)
    },
};
