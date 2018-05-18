module.exports = {

    getTimeCode: async function(page){
        let readyState = 0;
        await page.waitForSelector("video");
        do {
                readyState = await page.$eval("video", (selector) => {
                    return selector.readyState;
                });
                console.log("ReadyState === " + readyState)
            } while (readyState === 0);
        return await page.$$eval('.mediaplayer__timecode time', (selectors) => {
            return selectors.map(selector => selector.innerText)
        });
    },
};
