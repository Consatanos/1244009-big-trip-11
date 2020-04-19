/**
 * Render include position
 */
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

/**
 * Format time value from `1` to `01`
 * @param {*} value
 * @return {string}
 */
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

/**
 * Format time to hh:mm
 * @param {*} date
 * @return {string}
 */
export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

/**
 * Create DOM element
 * @param {string} template
 * @return {string}
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Render DOM element
 * @param {*} container
 * @param {string} element
 * @param {*} place
 */
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
