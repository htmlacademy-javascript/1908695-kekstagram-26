//рабочие функции

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

//массивы для описания фото

const IDS = Array.from({length:25}, (_, index) => index + 1);

const URLS = [];
for (let i = 1; i <=25; i++) {
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

const COMMENTS_AMOUNT = getRandomPositiveInteger(1,10);

//функции для генерации комментариев и объектов

const createComment = () => ({
  id: getRandomArrayElement(COMMENT_IDS),
  avatar: getRandomArrayElement(AVATARS),
  message: `${getRandomArrayElement(MESSAGES)} + ${getRandomArrayElement(MESSAGES)}`,
  name: getRandomArrayElement(NAMES)
});

const COMMENTS = Array.from({length:COMMENTS_AMOUNT}, createComment);

const createPhotoDescription = () => ({
  id: getRandomArrayElement(IDS),
  avatar: getRandomArrayElement(URLS),
  message: getRandomArrayElement(DESCRIPTIONS),
  name: getRandomArrayElement(LIKES),
  comments: COMMENTS
});
createPhotoDescription();

// Массив объектов закомментирован, чтобы линтер не ругался
// const PhotoDescriptions = Array.from({length:25}, createPhotoDescription);


