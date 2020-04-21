import AbstractComponent from './abstract-component';
import {
  formatTime,
} from '../utils/common';

/**
 * Create route markup
 * @param {Object} route
 * @return {String} route markup
 */
const createRouteMarkup = (route) => {
  const {
    type,
    action,
    location,
    startDate,
    endDate,
    cost,
  } = route;

  const dateStart = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`;
  const timeStart = formatTime(startDate);
  const dateEnd = `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`;
  const timeEnd = formatTime(endDate);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLocaleLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${action} ${location}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}T${timeStart}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEnd}T${timeEnd}">${timeEnd}</time>
          </p>
          <p class="event__duration">${(startDate.getTime() - endDate.getTime()) / 1000}M</p>
        </div>

        <p class="event__price">
          ${cost.currency}<span class="event__price-value">${cost.value}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;
            ${cost.currency}&nbsp;<span class="event__offer-price">${cost.value}</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Route extends AbstractComponent {
  constructor(route) {
    super();

    this._route = route;
  }

  getTemplate() {
    return createRouteMarkup(this._route);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
