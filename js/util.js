const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getStringLength = (string, maxlength) => string.length < maxlength || string.length === maxlength;

getStringLength('hello', 10);

const getRandomArrayElement = function(elements)  {
  const randomElement = elements[getRandomPositiveInteger(0, elements.length-1)];
  if (elements.includes(randomElement)) {
    elements.splice(elements.indexOf(randomElement), 1);
  }
  return randomElement;
};

export {getRandomArrayElement, getRandomPositiveInteger};
