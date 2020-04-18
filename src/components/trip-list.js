import {
  createElement,
} from '../utils';

/**
 * Create trip-list markup
 * @return {string} trip-list markup
 */
const createTripListMarkup = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class TripList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripListMarkup();
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
