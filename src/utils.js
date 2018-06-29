module.exports = {
    getCurrentDate: function () {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        // if (dd < 10) {
        //     dd = '0' + dd
        // }

        // if (mm < 10) {
        //     mm = '0' + mm
        // }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    },

    sleep: async function (milliseconds) {
        let startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliseconds) {
        }
    },

    pagination: async function (page) {
        let allPaginationSelector = '.pagination-menu *';
        // get all div that expected to be disabled
        let paginationItems = await page.$$(allPaginationSelector);
        // length of the elements in the pagination
        expect(paginationItems.length).toBeCloseTo(15);
        // verify index location of disabled elements
        expect(paginationItems[0]._remoteObject.description).toContain('disabled');
        expect(paginationItems[2]._remoteObject.description).toContain('disabled');
        // click on last pagination item
        await paginationItems[paginationItems.length - 1].click();
        module.exports.sleep(2000);
        paginationItems = await page.$$(allPaginationSelector);
        expect(paginationItems[11]._remoteObject.description).toContain('disabled');
        expect(paginationItems[13]._remoteObject.description).toContain('disabled');
    }
};

