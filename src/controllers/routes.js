import TripDayComponent from '../components/trip-day';
import RouteComponent from '../components/route';
import RouteEditComponent from '../components/route-edit';
import {
  render,
  remove,
  replace,
  RenderPosition
} from '../utils/render';

const SHOWING_ROUTES_COUNT_ON_START = 10;
let showingRoutesCount = SHOWING_ROUTES_COUNT_ON_START;


/**
 * Render route day with routes
 * @param {string} day
 * @param {array} routesDay
 */
const renderRouteDay = (day, routesDay) => {
  const tripDaysElement = document.querySelector(`.trip-days`);
  const tripDay = new TripDayComponent(day);
  const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);

  routesDay.slice(0, showingRoutesCount)
    .forEach((route) => {
      renderRoute(tripDayList, route);
    });

  render(tripDaysElement, tripDay, RenderPosition.BEFOREEND);
};

/**
 * Render route
 * @param {object} routeDayElement
 * @param {object} route
 */
const renderRoute = (routeDayElement, route) => {

  const replaceRouteToEdit = () => {
    replace(routeEditComponent, routeComponent);
  };

  const replaceEditToRoute = () => {
    replace(routeComponent, routeEditComponent);
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
  const routeEditComponent = new RouteEditComponent(route);

  /**
   * Open route edit form
   */
  routeComponent.setEditButtonClickHandler(() => {
    replaceRouteToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  /**
   * Close route edit form
   */
  routeEditComponent.setEditButtonClickHandler(() => {
    replaceEditToRoute();
  });

  /**
   * Save route edit form
   */
  routeEditComponent.setSubmitHandler((event) => {
    event.preventDefault();
    replaceEditToRoute();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(routeDayElement, routeComponent, RenderPosition.BEFOREEND);
};

export default class RoutesController {
  constructor(container) {
    this._container = container;

    this._tripDayComponent = new TripDayComponent();
    this._routeComponent = new RouteComponent();
    this._routeEditComponent = new RouteEditComponent();
  }

  render(routes) {
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
  }
}
