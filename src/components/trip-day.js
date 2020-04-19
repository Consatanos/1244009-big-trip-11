import {
  NAMES_OF_MONTH,
} from '../const';
import {
  createElement,
} from '../utils';

/**
 * Create trip-day markup
 * @param {string} date
 * @param {array} routes
 * @return {string} trip-day markup
 */
const createTripDayMarkup = (date) => {
  const formalDate = new Date(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${formalDate.getDate()}</span>
        <time class="day__date" datetime="${date}">${NAMES_OF_MONTH[formalDate.getMonth()]} ${formalDate.getFullYear().toString().substr(-2)}</time>
      </div>
      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};

export default class TripDay {
  constructor(date, routes) {
    this._date = date;
    this._routes = routes;
    this._element = null;
  }

  getTemplate() {
    return createTripDayMarkup(this._date, this._routes);
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
