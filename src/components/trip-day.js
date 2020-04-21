import AbstractComponent from './abstract-component';
import {
  NAMES_OF_MONTH,
} from '../const';

/**
 * Create trip-day markup
 * @param {String} date
 * @param {Array} routes
 * @return {String} trip-day markup
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

export default class TripDay extends AbstractComponent {
  constructor(date, routes) {
    super();

    this._date = date;
    this._routes = routes;
  }

  getTemplate() {
    return createTripDayMarkup(this._date, this._routes);
  }
}
