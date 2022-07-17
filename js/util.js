import {RANDOM_PICTURES_AMOUNT} from './create-other-user-pictures.js';
const ALERT_SHOW_TIME = 5000;

//функция для выборки случайных неповторяющихся элементов массива в количестве переданном вторым аргументом диапазона
function getRandomPhotoArray (photosArray) {
  return photosArray.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_PICTURES_AMOUNT);
}

//функция для сортировки массива по убыванию длины массива комментариев
function getDiscussedPhotoArray (photosArray) {
  return photosArray.slice().sort((a, b) => b.comments.length - a.comments.length);
}

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

const getStringLength = (string, maxlength) => string.length < maxlength || string.length === maxlength;

getStringLength('hello', 10);

const getRandomNumber = (array) => array.splice(Math.random()*array.length, 1)[0];

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

const debounce = (callback, timeoutDelay = 500) =>{
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, showAlert, debounce, getRandomPhotoArray, getDiscussedPhotoArray};
