import {
  NAMES_OF_MONTH,
} from '../const';
import {
  createElement,
} from '../utils';

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
 * Create trip-info markup
 * @param {array} points
 * @return {string} trip-info markup
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

export default class TripInfo {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoMarkup(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
