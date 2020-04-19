import {
  createElement,
} from '../utils';

/**
 * Create filter markup
 * @param {string} filter
 * @param {number} isChecked
 * @return {string}
 */
const createFilterMurkup = (filter, isChecked) => {
  return `<div class="trip-filters__filter">
    <input
      id="filter-everything"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filter}" ${isChecked ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-everything">${filter}</label>
  </div>`;
};

/**
 * Create filters markup
 * @param {array} filters
 * @return {string} filters markup
 */
const createFiltersMarkup = (filters) => {
  return (
    `<form class="trip-filters" action="#" method="get">

      ${filters.map((filter, i) => createFilterMurkup(filter, i === 0)).join(`\n`)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTempate() {
    return createFiltersMarkup(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTempate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
