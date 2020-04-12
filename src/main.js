'use strict';

import {
  tripInfoTemplate,
} from './components/trip-info-template';
import {
  tripCostTemplate,
} from './components/trip-cost-template';
import {
  siteMenuTemplate,
} from './components/site-menu-template';
import {
  filtersTemplate,
} from './components/filters-template';
import {
  sortTemplate,
} from './components/sort-template';
import {
  routeEditTemplate,
} from './components/route-edit-template';
import {
  tripListTemplate,
} from './components/trip-list-template';
import {
  tripDayTemplate,
} from './components/trip-day-template';

import {
  generateFilters,
} from './mock/filters';
import {
  generateRoutes,
} from './mock/route';

const ROUTE_COUNT = 20;
const SHOWING_ROUTES_COUNT_ON_START = 10;

/**
 * Render element to DOM
 * @param {*} container
 * @param {string} template
 * @param {string} place
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const filters = generateFilters();
const routes = generateRoutes(ROUTE_COUNT);
const routesCost = routes.reduce((acc, route) => {
  return acc + route.cost.value;
}, 0);
const routePoints = routes.reduce((acc, route) => {
  acc.push({
    point: route.location,
    startDay: route.startDate,
    endDay: route.endDate,
  });
  return acc;
}, []);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, tripInfoTemplate(routePoints), `afterBegin`);

const tripInfoElement = document.querySelector(`.trip-info`);

render(tripInfoElement, tripCostTemplate(routesCost), `beforeEnd`);
render(tripControlsElement, siteMenuTemplate(), `afterBegin`);
render(tripControlsElement, filtersTemplate(filters), `beforeEnd`);
render(tripEventsElement, sortTemplate(), `beforeEnd`);
render(tripEventsElement, routeEditTemplate(routes[0]), `beforeEnd`);
render(tripEventsElement, tripListTemplate(), `beforeEnd`);

const tripDaysElement = document.querySelector(`.trip-days`);

let showingRoutesCount = SHOWING_ROUTES_COUNT_ON_START;
let routesList = {};

routes.slice(1, showingRoutesCount)
  .forEach((route) => {
    const date = `${route.startDate.getFullYear()}-${route.startDate.getMonth() + 1}-${route.startDate.getDate()}`;

    if (routesList.hasOwnProperty(date)) {
      routesList[date].push(route);
    } else {
      routesList[date] = [route];
    }
  });

for (let [key, value] of Object.entries(routesList)) {
  render(tripDaysElement, tripDayTemplate(key, value), `beforeEnd`);
}
