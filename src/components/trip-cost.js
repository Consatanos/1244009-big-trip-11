import AbstractComponent from './abstract-component';

/**
 * Create trip-cost markup
 * @param {Number} cost
 * @return {String} trip-cost markup
 */
const createTripCostMarkup = (cost) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`
  );
};

export default class TripCost extends AbstractComponent {
  constructor(cost) {
    super();

    this._cost = cost;
  }

  getTemplate() {
    return createTripCostMarkup(this._cost);
  }
}
