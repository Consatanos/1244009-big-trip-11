import {
  NAMES_OF_MONTH,
} from '../const';
import {
  routeTemplate,
} from './route-template';

/**
 * Create template trip-day
 * @param {string} date
 * @param {array} routes
 * @return {string} html template trip-day
 */
const tripDayTemplate = (date, routes) => {
  const formalDate = new Date(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${formalDate.getDate()}</span>
        <time class="day__date" datetime="${date}">${NAMES_OF_MONTH[formalDate.getMonth()]} ${formalDate.getFullYear().toString().substr(-2)}</time>
      </div>
      <ul class="trip-events__list">

        ${routes.map((route) => routeTemplate(route))}

      </ul>
    </li>`
  );
};

export {
  tripDayTemplate,
};
