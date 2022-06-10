//рабочие функции

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getStringLength = (string, maxlength) => string.length < maxlength || string.length === maxlength;

console.log(getRandomPositiveInteger(2,1e6));
getStringLength('hello', 10);

//массивы для описания фото

const IDS = Array.from({length:25}, (_, index) => index + 1);

const URLS = [];
for (let i = 1; i <=25; i++) {
  URLS.push(`photos/${i}.jpg`);
}
console.log(URLS);
const DESCRIPTIONS = [
  'мой питомец',
  'доброе утро',
  'лето в городе',
  'с первым днем лета',
  'гуляем у озера',
  'ночные огни',
  'прогулка с котиком',
  'красивый закат',
  'уникальный рассвет',
  'белые ночи',
  'утро в парке',
  'вечерняя пробежка',
  'встреча с друзьями',
  'ужин у моря'
];

const LIKES = Array.from({length:186}, (_, index) => index + 15);
console.log(LIKES);

const AVATARS = [];
for (let i = 1; i <=6; i++) {
  AVATARS.push(`img/avatar-${i}.svg`);
}

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Антон',
  'Артем',
  'Анна',
  'Борис',
  'Владилен',
  'Вера',
  'Григорий',
  'Герман',
  'Геннадий',
  'Дмитрий',
  'Екатерина',
  'Зиновий',
  'Константин',
  'Людмила',
  'Леонид',
  'Михаил',
  'Николай',
  'Павел',
  'Руслан',
  'Юрий'
];

const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

const createComment = () => {
  return {
    id: getRandomPositiveInteger(2,1e8),
    avatar: getRandomArrayElement(AVATARS),
    message: `${getRandomArrayElement(MESSAGES)} + ${getRandomArrayElement(MESSAGES)}`,
    name: getRandomArrayElement(NAMES)
  };
};

const COMMENTS_AMOUNT = getRandomPositiveInteger(1,10);

const COMMENTS = Array.from({length:COMMENTS_AMOUNT}, createComment);
console.log(COMMENTS);
