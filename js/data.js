import {getRandomArrayElement, getRandomPositiveInteger} from './util.js';

//массивы для описания фото
const AMOUNT_PHOTO_DESCRIPTIONS = 25;
const IDS_AMOUNT = 25;
const IDS = Array.from({length:IDS_AMOUNT}, (_, index) => index + 1);
const URLS_AMOUNT = 25;
const URLS = [];
for (let i = 1; i <=URLS_AMOUNT; i++) {
  URLS.push(`photos/${i}.jpg`);
}

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

//массивы для создания комментариев

const COMMENT_IDS = Array.from({length:1e5}, (_, index) => index + 1);

const AVATARS_AMOUNT = 6;
const AVATARS = [];
for (let i = 1; i <=AVATARS_AMOUNT; i++) {
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

//функции для генерации комментариев и объектов

const createComment = () => ({
  id: getRandomArrayElement(COMMENT_IDS),
  avatar: getRandomArrayElement(AVATARS),
  message: `${getRandomArrayElement(MESSAGES)}  ${getRandomArrayElement(MESSAGES)}`,
  name: getRandomArrayElement(NAMES)
});

const getComments = (value) => {
  const commentsList= [];
  const commentsAmount = getRandomPositiveInteger(1, value);
  for (let i = 0; i < commentsAmount; i++) {
    commentsList.push(createComment());
  }
  return commentsList;
};

const createPhotoDescription = () => ({
  id: getRandomArrayElement(IDS),
  url: getRandomArrayElement(URLS),
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomArrayElement(LIKES),
  comments: getComments(30)
});

createPhotoDescription();

const createPhotoDescriptions = () => Array.from({length:AMOUNT_PHOTO_DESCRIPTIONS}, createPhotoDescription);

export {createPhotoDescriptions};
export {createComment};
export {getComments};

