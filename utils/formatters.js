//This file contains all the formatting related logic
const moment = require('moment-timezone');

const getCurrentMysqlDateTime = (timeZone) => {
    return moment().tz(timeZone ? timeZone : 'Europe/London').format("YYYY-MM-DD HH:mm:ss");
}

exports.getCurrentMysqlDateTime = getCurrentMysqlDateTime;