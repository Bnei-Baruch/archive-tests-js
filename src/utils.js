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

    sideBarMenu: async function (page, text) {
        expect(await page.$$eval(selectors.common.sideBar, ss => ss.map(s => s.innerText.trim())))
            .toEqual(text);
    },

    pagination: async function (page) {
        // TODO - Edo need to find intelligent solution
        module.exports.sleep(2000);

        let paginationItems = await page.$$(selectors.common.pagination);

        expect(await page.$$eval(selectors.common.pagination, s => s.length))
            .toBe(15);

        // verify index location of disabled elements
        expect(paginationItems[0]._remoteObject.description).toContain('disabled');
        expect(paginationItems[2]._remoteObject.description).toContain('disabled');
        // click on last pagination item
        await paginationItems[paginationItems.length - 1].click();

        module.exports.sleep(2000);

        paginationItems = await page.$$(selectors.search.pagination);
        expect(paginationItems[11]._remoteObject.description).toContain('disabled');
        expect(paginationItems[13]._remoteObject.description).toContain('disabled');
    },

    fillAndClick: async function (page, inputField, value, button) {
        await page.focus(inputField);
        await page.type(inputField, value);
        await page.click(button);
    },

    redirect: async function (page, txt) {
        module.exports.sleep(2000);
        const expUrl = '/search?q=' + txt;
        expect(await (page.url())).toContain(expUrl);
    },

    removeBackSlash: async function (textToCleanBackSlash) {
        for (let i = 0; i < textToCleanBackSlash.length; i++) {
            textToCleanBackSlash[i] = textToCleanBackSlash[i].replace(/\n/g, "");
        }
        return textToCleanBackSlash;
    }

};

