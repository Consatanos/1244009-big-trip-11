import {
  ROUTE_ITEMS,
} from '../const';
import {
  formatTime,
} from '../utils';

/**
 * Create event list
 * @param {string} active
 * @return {sting}
 */
const createEventList = (active) => {
  return ROUTE_ITEMS.map((item) => {
    return `<div class="event__type-item">
        <input
          id="event-type-${item.toLocaleLowerCase()}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${item.toLocaleLowerCase()}"
          ${item === active ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${item.toLocaleLowerCase()}" for="event-type-${item.toLocaleLowerCase()}-1">${item}</label>
      </div>`;
  }).join(`\n`);
};

/**
 * Create offers list
 * @param {object} offers
 * @return {string}
 */
const createOffersList = (offers) => {
  return offers.map((offer) => {
    const {
      title,
      price,
      currency,
      isChecked
    } = offer;
    return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${title}</span>
          ${currency}
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`;
  }).join(`\n`);
};

/**
 * Create destination descriptions
 * @param {array} descriptions
 * @return {string}
 */
const createDestinationDescriptions = (descriptions) => {
  return descriptions.map((description) => `<p class="event__destination-description">${description}</p>`).join(`\n`);
};

/**
 * Create destination photo
 * @param {array} photos
 * @return {string}
 */
const createDestinationPhoto = (photos) => {
  return photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(`\n`);
};

/**
 * Create template route-edit
 * @param {object} route
 * @return {string} html template route-edit
 */
const routeEditTemplate = (route) => {
  const {
    type,
    action,
    location,
    locationList,
    startDate,
    endDate,
    offers,
    destinationDescription,
    destinationPhoto,
    cost,
  } = route;

  const dateStart = `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear().toString().substr(-2)}`;
  const timeStart = formatTime(startDate);
  const dateEnd = `${endDate.getDate()}/${endDate.getMonth()}/${endDate.getFullYear().toString().substr(-2)}`;
  const timeEnd = formatTime(endDate);

  const offersList = createOffersList(offers);
  const eventList = createEventList(type);
  const descriptionDestination = createDestinationDescriptions(destinationDescription);
  const photoDestination = createDestinationPhoto(destinationPhoto);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLocaleLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${eventList}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} ${action}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${location}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${locationList.map((city) => (`<option value="${city}"></option>`)).join(`\n`)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart} ${timeStart}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd} ${timeEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            ${cost.currency}
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost.value}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        ${offers.length > 0 ? `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersList}
          </div>
        </section>` : ``}

        ${destinationDescription.length > 0 || destinationPhoto > 0 ? `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          ${descriptionDestination}

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoDestination}
            </div>
          </div>
        </section>` : ``}

      </section>
    </form>`
  );
};

export {
  routeEditTemplate,
};
