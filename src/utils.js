const selectors = require('../src/selectors');
const texts = require('../src/texts');

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

    isFilterPopUpOpened: async function (page, selector) {
        let items = await page.$$(selector);
        for (let i = 0; i < items.length; ++i) {
            module.exports.sleep(1000);
            await items[i].click();
            await page.waitForSelector(selectors.common.popup, {'timeout': 30000});
            module.exports.sleep(1000);
            await items[i].click();
        }
    },

    click: async function (page, selector, index){
        let filters = await page.$$(selector);
        module.exports.sleep(1000);
        await filters[index].click();
    },

    pagination: async function (page) {

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

        paginationItems = await page.$$(selectors.common.pagination);

        await expect(paginationItems[11]._remoteObject.description).toContain('disabled');
        await expect(paginationItems[13]._remoteObject.description).toContain('disabled');
    },

    redirect: async function (page, txt) {
        return '/search?q=' + txt;
    },

    commonBlock: async function (page){
        expect(await page.$eval(selectors.common.logo, s => s.innerText.trim()))
            .toBe(texts.common.logo);
        expect(await page.$$eval(selectors.common.sideBar, ss => ss.map(s => s.innerText.trim())))
            .toEqual(texts.common.sideBar);
        expect(await page.$eval(selectors.common.donateButton, s => s.innerText.trim()))
            .toBe(texts.common.donateButton);
        expect(await page.$eval(selectors.common.languageDropDown, s => s.innerText.trim()))
            .toBe(texts.common.languageDropDown);
        expect(await page.$eval(selectors.common.footer, s => s.textContent.trim()))
            .toBe(texts.common.footer);
        expect(await page.$(selectors.common.searchInput)).toBeDefined();
    }
};

