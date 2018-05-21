module.exports = {

    getTimeCode: async function(page){
        let readyState = 0;
        await page.waitForSelector("video");
        do {
                readyState = await page.$eval("video", (selector) => {
                    return selector.readyState;
                });
                console.debug("ReadyState ===> " + readyState)
            } while (readyState === 0);
        return await page.$$eval('.mediaplayer__timecode time', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
    },

    secondsToTime: function(secs)
    {
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

    waitPlayerToLoad: async function (page) {
        let readyState = 0;
        await page.waitForSelector("video");
        do {
            readyState = await page.$eval("video", (selector) => {
                return selector.readyState;
            });
            console.debug("ReadyState ===> " + readyState)
        } while (readyState === 0);
    },

    getPlayerCurrentTime: async function (page) {
        return await page.$eval("video", (selector) => {
            return selector.currentTime;
        });
    },

    getPlayerDuration: async function (page) {
        return await page.$eval("video", (selector) => {
            return selector.duration;
        });
    },

    playByClick: async function (page){
        page.click('.play.icon')
    },

    stopByClick: async function (page){
        page.click('.pause.icon')
    }
};
