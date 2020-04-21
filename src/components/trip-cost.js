import AbstractComponent from './abstract-component';

/**
 * Create trip-cost markup
 * @param {Number} routes
 * @return {String} trip-cost markup
 */
const createTripCostMarkup = (routes) => {
  const routesCost = routes.reduce((acc, route) => {
    return acc + route.cost.value;
  }, 0);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${routesCost}</span>
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
