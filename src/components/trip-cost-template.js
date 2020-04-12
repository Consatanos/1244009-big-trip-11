/**
 * Create template trip-cost
 * @param {number} cost
 * @return {string} html template trip-cost
 */
const tripCostTemplate = (cost) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`
  );
};

export {
  tripCostTemplate,
};
