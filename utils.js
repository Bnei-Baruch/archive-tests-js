module.exports = {
    getCurrentDate: function () {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    },

    delay: function (timeout) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    },

    sleep: async function(milliseconds) {
        let startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliseconds){}
}


};

