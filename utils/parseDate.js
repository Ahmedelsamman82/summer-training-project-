const moment = require('moment');

const parseDate = (dateString) => {
  return moment(dateString).format('YYYY-MM-DD');
};

module.exports = parseDate;
