/**
 * Format time value from `1` to `01`
 * @param {*} value
 * @return {string}
 */
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

/**
 * Format time to hh:mm
 * @param {*} date
 * @return {string}
 */
export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};
