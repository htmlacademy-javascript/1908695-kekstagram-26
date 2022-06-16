const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getStringLength = (string, maxlength) => string.length < maxlength || string.length === maxlength;

getStringLength('hello', 10);

const getRandomArrayElement = (elements) => {
  const randomElement = elements[getRandomPositiveInteger(0, elements.length - 1)];
  if (randomElement !== elements[(Math.floor(Math.random() * (elements.length)))]) {
    return randomElement;
  }   return elements[(Math.floor(Math.random() * (elements.length - 1)))];
};

export {getRandomArrayElement, getRandomPositiveInteger};
