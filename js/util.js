const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getStringLength = (string, maxlength) => string.length < maxlength || string.length === maxlength;

getStringLength('hello', 10);

const getRandomArrayElement = (elements) => {
  const randomElement = elements[getRandomPositiveInteger(0, elements.length-1)];
  let result;
  if (elements.includes(randomElement)) {
    result = randomElement;
    elements.splice(elements.indexOf(randomElement), 0);
  }
  return result;
};
//функция чтобы картинки не повторялись, чуть позже интегрирую в код
/*const getRandomArrayUniqueElement= (elements) => {
  const elementsCopy = elements.slice();
  const randomElement = elementsCopy[getRandomPositiveInteger(0, elements.length-1)];
  elements.splice(elements.indexOf(randomElement), 1);
  return randomElement;
};*/

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, getRandomPositiveInteger, isEscapeKey};
