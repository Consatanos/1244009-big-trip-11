import {
  createElement,
} from '../utils';

/**
 * Create trip-cost markup
 * @param {number} cost
 * @return {string} trip-cost markup
 */
const createTripCostMarkup = (cost) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`
  );
};

export default class TripCost {
  constructor(cost) {
    this._cost = cost;
    this._element = null;
  }

  getTemplate() {
    return createTripCostMarkup(this._cost);
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
