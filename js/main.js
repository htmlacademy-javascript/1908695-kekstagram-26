function getRandomInt(min, max) {
  if ( max > min && max >= 0 && min >= 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  } if (min > max || max===min) {
    return 'Первый аргумент должен быть меньше второго, введите корректные параметры';
  } else {
    return 'В диапазоне нет подходящего числа, функция не может гарантировать верный результат';
  }
}
getRandomInt(5, 8);

function getStringLength (string, maxlength) {
  const stringLength = string.length;
  return stringLength < maxlength || stringLength === maxlength;
}
getStringLength('hello', 10);
