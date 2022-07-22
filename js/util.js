const ALERT_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

/*const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};*/

<<<<<<< Updated upstream
const getStringLength = (string, maxlength) => string.length < maxlength || string.length === maxlength;
=======
const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) =>{
  let timeoutId;
>>>>>>> Stashed changes

getStringLength('hello', 10);

/*const getRandomArrayElement = (elements) => {
  const randomElement = elements[getRandomPositiveInteger(0, elements.length-1)];
  let result;
  if (elements.includes(randomElement)) {
    result = randomElement;
    elements.splice(elements.indexOf(randomElement), 0);
  }
  return result;
};*/

//функция чтобы картинки не повторялись, чуть позже интегрирую в код
/*const getRandomArrayUniqueElement= (elements) => {
  const elementsCopy = elements.slice();
  const randomElement = elementsCopy[getRandomPositiveInteger(0, elements.length-1)];
  elements.splice(elements.indexOf(randomElement), 1);
  return randomElement;
};*/

const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey, showAlert};
