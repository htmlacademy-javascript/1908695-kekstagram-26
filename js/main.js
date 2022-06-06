const getRandomInt = (min, max) => {
  if (max > min && max >= 0 && min >=0) {
    return Math.floor(Math.random() * (max - min)) + min;
  } if (min > max || max===min) {
    return 'Первый аргумент должен быть меньше второго, введите корректные параметры';
  } return 'В диапазоне нет подходящего числа, функция не может гарантировать верный результат';
};

getRandomInt(5, 8);
const getStringLength = (string, maxlength) => string.length < maxlength || string.length === maxlength;

getStringLength('hello', 10);
