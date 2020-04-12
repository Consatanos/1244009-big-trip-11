import {
  NAMES_OF_MONTH,
} from '../const';

/**
 * Generate points list
 * @param {array} points
 * @return {string}
 */
const generatePointList = (points) => {
  return points.map((point) => point).join(` &mdash; `);
};

/**
 * Generate dates
 * @param {string} start
 * @param {string} end
 * @return {string}
 */
const genarateDates = (start, end) => {
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.getMonth();

  return `${NAMES_OF_MONTH[startMonth]} ${startDay} &mdash; ${endDay}`;
};

/**
 * Create template trip-info
 * @param {array} points
 * @return {string} html template trip-info
 */
const tripInfoTemplate = (points) => {
  const pointList = points.reduce((acc, point) => {
    acc.push(point.point);
    return acc;
  }, []);
  const startDay = points[0].startDay;
  const endDay = points[points.length - 1].endDay;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${generatePointList(pointList)}</h1>
        <p class="trip-info__dates">${genarateDates(startDay, endDay)}</p>
      </div>
    </section>`
  );
};

export {
  tripInfoTemplate,
};
