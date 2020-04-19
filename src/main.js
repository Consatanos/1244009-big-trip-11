'use strict';

import FilterComponent from './components/filters';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import TripCostComponent from './components/trip-cost';
import TripDayComponent from './components/trip-day';
import TripInfoComponent from './components/trip-info';
import TripListComponent from './components/trip-list';
import RouteComponent from './components/route';
import RouteEditComponent from './components/route-edit';

import {
  generateFilters,
} from './mock/filters';
import {
  generateRoutes,
} from './mock/route';
import {
  render,
  RenderPosition,
} from './utils';


const ROUTE_COUNT = 20;
const SHOWING_ROUTES_COUNT_ON_START = 10;

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

render(tripMainElement, new TripInfoComponent(routePoints).getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = document.querySelector(`.trip-info`);

render(tripInfoElement, new TripCostComponent(routesCost).getElement(), RenderPosition.BEFOREEND);
render(tripControlsElement, new MenuComponent().getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripListComponent().getElement(), RenderPosition.BEFOREEND);

const tripDaysElement = document.querySelector(`.trip-days`);

/**
 * Render route
 * @param {object} routeDayElement
 * @param {object} route
 */
const renderRoute = (routeDayElement, route) => {
  const replaceRouteToEdit = () => {
    routeDayElement.replaceChild(routeEditComponent.getElement(), routeComponent.getElement());
  };

  const replaceEditToRoute = () => {
    routeDayElement.replaceChild(routeComponent.getElement(), routeEditComponent.getElement());
  };

  /**
   * Close route edit form on click esc
   * @param {*} event
   */
  const onEscKeyDown = (event) => {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      replaceEditToRoute();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const routeComponent = new RouteComponent(route);
  const openEditButton = routeComponent.getElement().querySelector(`.event__rollup-btn`);

  /**
   * Open route edit form
   */
  openEditButton.addEventListener(`click`, () => {
    replaceRouteToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const routeEditComponent = new RouteEditComponent(route);
  const closeEditButton = routeEditComponent.getElement().querySelector(`.event__rollup-btn`);
  const editForm = routeEditComponent.getElement().querySelector(`.event--edit`);

  /**
   * Close route edit form
   */
  closeEditButton.addEventListener(`click`, () => {
    replaceEditToRoute();
  });

  /**
   * Save route edit form
   */
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToRoute();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(routeDayElement, routeComponent.getElement(), RenderPosition.BEFOREEND);
};

/**
 * Render route day with routes
 * @param {string} day
 * @param {array} routesDay
 */
const renderRouteDay = (day, routesDay) => {
  const tripDay = new TripDayComponent(day);
  const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);

  routesDay.slice(0, showingRoutesCount)
    .forEach((route) => {
      renderRoute(tripDayList, route);
    });

  render(tripDaysElement, tripDay.getElement(), RenderPosition.BEFOREEND);
};

let showingRoutesCount = SHOWING_ROUTES_COUNT_ON_START;
let routesList = {};

routes.slice(0, showingRoutesCount)
  .forEach((route) => {
    const date = `${route.startDate.getFullYear()}-${route.startDate.getMonth() + 1}-${route.startDate.getDate()}`;

    if (routesList.hasOwnProperty(date)) {
      routesList[date].push(route);
    } else {
      routesList[date] = [route];
    }
  });

for (let [key, value] of Object.entries(routesList)) {
  renderRouteDay(key, value);
}
