const moment = require('moment');

/**
 * Get diff btween two dates in milliseconds
 * @async
 * @param {Date|String} then then date or string date format
 * @param {Date|String} now date now or string date format
 * @returns {Promise<Number>} return diff between two date in milliseconds
 */
const getDateDiffInMilliseconds = async (then, now) => {
  return moment(now).diff(moment(then));
};

/**
 * Transform milliseconds to format datetime
 *
 * @async
 * @param {Number} millseconds
 * @param {String} [format="HH:mm:ss"]
 * @returns {Promise<String>} return string representation milliseconds to date with formats
 */
const transformMillisecondsToFormatDate = async (
  millseconds,
  format = 'HH:mm:ss'
) => {
  return moment.utc(millseconds).format(format);
};

module.exports = {
  getDateDiffInMilliseconds,
  transformMillisecondsToFormatDate
};
