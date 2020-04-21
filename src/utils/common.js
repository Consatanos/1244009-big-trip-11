/**
 * Format time value from `1` to `01`
 * @param {Number} value
 * @return {String}
 */
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

/**
 * Format time to hh:mm
 * @param {Object} date
 * @return {String}
 */
export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};
