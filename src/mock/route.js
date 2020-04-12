import {
  ROUTE_ITEMS,
  ROUTE_ACTION,
  CURRENCY,
} from '../const';

/**
 * Array cities values
 */
const Cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
];

/**
 * Generate random array item
 * @param {array} array
 * @return {array}
 */
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

/**
 * Generate random number
 * @param {number} min
 * @param {numver} max
 * @return {number} random number
 */
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

/**
 * Generate random dates
 * @return {array} array of dates
 */
const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

/**
 * Generate offers list
 * @return {array}
 */
const generateOfferList = () => {
  const result = [];
  const count = getRandomIntegerNumber(0, 5);

  for (let i = 0; i < count; i++) {
    result.push({
      title: `Add luggage`,
      price: getRandomIntegerNumber(1, 100),
      currency: `&plus;${getRandomArrayItem(CURRENCY)}`,
      isChecked: getRandomIntegerNumber(0, 2),
    });
  }

  return result;
};

/**
 * Generate destination descriptions
 * @return {array}
 */
const generateDestinationDescription = () => {
  const result = [];
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const count = getRandomIntegerNumber(1, 5);

  for (let i = 0; i < count; i++) {
    result.push(text);
  }

  return result;
};

/**
 * Generate destination photos
 * @return {array}
 */
const generateDestinationPhoto = () => {
  const result = [];
  const count = getRandomIntegerNumber(1, 5);

  for (let i = 1; i <= count; i++) {
    result.push(`img/photos/${i}.jpg`);
  }

  return result;
};

/**
 * Generate route
 * @return {object}
 */
const generateRoute = () => {
  const generateStartDate = getRandomDate();
  const generateEndDate = (date) => {
    const updateDate = new Date();
    updateDate.setDate(date.getDate() + getRandomIntegerNumber(1, 10));
    return updateDate;
  };

  return {
    type: getRandomArrayItem(ROUTE_ITEMS),
    action: getRandomArrayItem(ROUTE_ACTION),
    location: getRandomArrayItem(Cities),
    locationList: Cities,
    offers: generateOfferList(),
    destinationDescription: generateDestinationDescription(),
    destinationPhoto: generateDestinationPhoto(),
    startDate: generateStartDate,
    endDate: generateEndDate(generateStartDate),
    cost: {
      value: getRandomIntegerNumber(10, 1000),
      currency: getRandomArrayItem(CURRENCY),
    },
  };
};

/**
 * Genearate routes array
 * @param {number} count
 * @return {array}
 */
const generateRoutes = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateRoute)
    .sort((a, b) => a.startDate > b.startDate ? 1 : -1);
};

export {
  generateRoute,
  generateRoutes,
};
