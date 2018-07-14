const selectors = require('../src/selectors');

module.exports = {

    getCurrentDate: function () {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    },

    sleep: async function (milliseconds) {
        let startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliseconds) {
        }
    },

    innerTxt: async function () {
        return s => s.innerText.trim()
    },

    pagination: async function (page) {
        // TODO - Edo need to find intelligent solution
        module.exports.sleep(2000);

        let paginationItems = await page.$$(selectors.common.pagination);

        expect(await page.$$eval(selectors.common.pagination, s => s.length))
            .toBe(15);

        // verify index location of disabled elements
        await expect(paginationItems[0]._remoteObject.description).toContain('disabled');
        await expect(paginationItems[2]._remoteObject.description).toContain('disabled');
        // click on last pagination item
        await paginationItems[paginationItems.length - 1].click();

        module.exports.sleep(2000);

        paginationItems = await page.$$(selectors.search.pagination);
        await expect(paginationItems[11]._remoteObject.description).toContain('disabled');
        await expect(paginationItems[13]._remoteObject.description).toContain('disabled');
    },

    redirect: async function (page, txt) {
        return '/search?q=' + txt;
    },

    removeBackSlash: async function (textToCleanBackSlash) {
        for (let i = 0; i < textToCleanBackSlash.length; i++) {
            textToCleanBackSlash[i] = textToCleanBackSlash[i].replace(/\n/g, "");
        }
        return textToCleanBackSlash;
    }

};

