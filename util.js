const moment = require("moment");

function now() {
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
    now,
};