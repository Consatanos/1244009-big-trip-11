'use strict';

import FilterComponent from './components/filters';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import TripCostComponent from './components/trip-cost';
import TripInfoComponent from './components/trip-info';
import TripListComponent from './components/trip-list';
import TripController from './controllers/routes';
import {
  generateFilters,
} from './mock/filters';
import {
  generateRoutes,
} from './mock/route';
import {
  render,
  RenderPosition,
} from './utils/render';

const ROUTE_COUNT = 20;

const filters = generateFilters();
const routes = generateRoutes(ROUTE_COUNT);
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, new TripInfoComponent(routes), RenderPosition.AFTERBEGIN);

const tripInfoElement = document.querySelector(`.trip-info`);

render(tripInfoElement, new TripCostComponent(routes), RenderPosition.BEFOREEND);
render(tripControlsElement, new MenuComponent(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new FilterComponent(filters), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortComponent(), RenderPosition.BEFOREEND);

const tripListComponent = new TripListComponent();
const tripController = new TripController(tripListComponent);

render(tripEventsElement, tripListComponent, RenderPosition.BEFOREEND);
tripController.render(routes);
