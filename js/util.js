import {RANDOM_PICTURES_AMOUNT} from './create-other-user-pictures.js';
const ALERT_SHOW_TIME = 5000;

const TIMEOUT_DELAY = 500;


//функция для выборки случайных неповторяющихся элементов массива в количестве переданном вторым аргументом диапазона
function getRandomPhotoArray (photosArray) {
  return photosArray.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_PICTURES_AMOUNT);
}

//функция для сортировки массива по убыванию длины массива комментариев
function getDiscussedPhotoArray (photosArray) {
  return photosArray.slice().sort((a, b) => b.comments.length - a.comments.length);
}
//функция для отрисовки сообщения с ошибкой если сервер прислал ответ не ОК
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

const isEscapeKey = (evt) => evt.key === 'Escape';


const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) =>{
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, showAlert, debounce, getRandomPhotoArray, getDiscussedPhotoArray};
