'use strict';

import {
  tripInfoTemplate
} from './components/trip-info-template';
import {
  tripCostTemplate
} from './components/trip-cost-template';
import {
  siteMenuTemplate
} from './components/site-menu-template';
import {
  filtersTemplate
} from './components/filters-template';
import {
  sortTemplate
} from './components/sort-template';
import {
  routeTemplate
} from './components/route-template';
import {
  routeEditTemplate
} from './components/route-edit-template';
import {
  tripListTemplate
} from './components/trip-list-template';
import {
  tripDayTemplate
} from './components/trip-day-template';

const ROUTE_COUNT = 3;

/**
 * Render element to DOM
 * @param {*} container
 * @param {string} template
 * @param {string} place
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, tripInfoTemplate(), `afterBegin`);

const tripInfoElement = document.querySelector(`.trip-info`);

render(tripInfoElement, tripCostTemplate(), `beforeEnd`);
render(tripControlsElement, siteMenuTemplate(), `afterBegin`);
render(tripControlsElement, filtersTemplate(), `beforeEnd`);
render(tripEventsElement, sortTemplate(), `beforeEnd`);
render(tripEventsElement, routeEditTemplate(), `beforeEnd`);
render(tripEventsElement, tripListTemplate(), `beforeEnd`);

const tripDaysElement = document.querySelector(`.trip-days`);

render(tripDaysElement, tripDayTemplate(), `beforeEnd`);

const tripListElement = document.querySelector(`.trip-events__list`);

for (let i = 0; i < ROUTE_COUNT; i++) {
  render(tripListElement, routeTemplate(), `beforeEnd`);
}
