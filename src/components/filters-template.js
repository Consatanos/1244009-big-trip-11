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
 * Create template filters
 * @param {array} filters
 * @return {string} html template filters
 */
const filtersTemplate = (filters) => {
  return (
    `<form class="trip-filters" action="#" method="get">

      ${filters.map((filter, i) => createFilterMurkup(filter, i === 0)).join(`\n`)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export {
  filtersTemplate,
};
