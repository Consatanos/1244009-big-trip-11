import AbstractComponent from './abstract-component';

/**
 * Create trip-list markup
 * @return {String} trip-list markup
 */
const createTripListMarkup = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class TripList extends AbstractComponent {
  getTemplate() {
    return createTripListMarkup();
  }
}
