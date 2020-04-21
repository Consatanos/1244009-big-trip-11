import AbstractComponent from './abstract-component';
import {
  NAMES_OF_MONTH,
} from '../const';

/**
 * Generate points list
 * @param {Array} points
 * @return {String}
 */
const generatePointList = (points) => {
  return points.map((point) => point).join(` &mdash; `);
};

/**
 * Generate dates
 * @param {String} start
 * @param {String} end
 * @return {String}
 */
const genarateDates = (start, end) => {
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.getMonth();

  return `${NAMES_OF_MONTH[startMonth]} ${startDay} &mdash; ${endDay}`;
};

/**
 * Create trip-info markup
 * @param {Array} points
 * @return {String} trip-info markup
 */
const createTripInfoMarkup = (points) => {
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

export default class TripInfo extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createTripInfoMarkup(this._points);
  }
}
