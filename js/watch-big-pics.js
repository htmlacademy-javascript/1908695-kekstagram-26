import {createPhotoDescriptions} from './data.js';

const PHOTOS = createPhotoDescriptions();
console.log(PHOTOS);
const FULLSCREEN_CONTAINER = document.querySelector('.big-picture');
const FULLSCREEN_PHOTO = FULLSCREEN_CONTAINER.querySelector('.big-picture__img img');
const THUMBNAILS = document.querySelectorAll('.picture');
const LIKES_NUMBER = FULLSCREEN_CONTAINER.querySelector('.likes-count');
const COMMENTS_NUMBER = FULLSCREEN_CONTAINER.querySelector('.comments-count');
const DESCRIPTION = FULLSCREEN_CONTAINER.querySelector('.social__caption');
const COMMENT_LIST = FULLSCREEN_CONTAINER.querySelector('.social__comments');
const COMMENT_LIST_COUNTER = FULLSCREEN_CONTAINER.querySelector('.social__comment-count');
const COMMENT_LOAD = FULLSCREEN_CONTAINER.querySelector('.comments-loader');
const PAGE_BODY = document.querySelector('body');
const FULLSCREEN_CLOSE_BUTTON = FULLSCREEN_CONTAINER.querySelector('.big-picture__cancel');

//функция для создания элемента по заданным параметрам
const makeElement = (tagName, className, text) => {
  const ELEMENT = document.createElement(tagName);
  ELEMENT.classList.add(className);
  if (text) {
    ELEMENT.textContent = text;
  }
  return ELEMENT;
};

//функция для просмотра полноэкранного изображения по клику
const addThumbnailClickHandler = (thumbnail, photo) => {
  thumbnail.addEventListener('click', () => {
    FULLSCREEN_CONTAINER.classList.remove('hidden');
    //описываем объект полноразмерного фото передавая данные из функции createPhotoDescriptions
    FULLSCREEN_PHOTO.src = photo.url;
    LIKES_NUMBER.textContent = photo.likes;
    COMMENTS_NUMBER.textContent = String(photo.comments.length);
    COMMENT_LIST.innerHTML = '';
    DESCRIPTION.textContent = photo.description;
    //создаем комментарии на основе данных ключа comments из функции createPhotoDescriptions
    photo.comments.forEach((comment) => {
      const COMMENT_LIST_ITEM = makeElement('li', 'social__comment');
      COMMENT_LIST.appendChild(COMMENT_LIST_ITEM);
      const COMMENT_AVATAR = makeElement('img', 'social__picture');
      COMMENT_AVATAR.style.width = '35px';
      COMMENT_AVATAR.style.height = '35px';
      COMMENT_AVATAR.src = comment.avatar;
      COMMENT_AVATAR.alt = comment.message;
      COMMENT_LIST_ITEM.appendChild(COMMENT_AVATAR);
      const COMMENT_CONTENT = makeElement('p', 'social__text', comment.message);
      COMMENT_LIST_ITEM.appendChild(COMMENT_CONTENT);
    });
    //настройки поведения других элементов страницы в момент открытия полноэкранного просмотра фото
    COMMENT_LOAD.classList.add('hidden');
    COMMENT_LIST_COUNTER.classList.add('hidden');
    PAGE_BODY.classList.add('modal-open');
    //выходим из режима полноэкранного просмотра фото по клику на кнопку закрытия
    FULLSCREEN_CLOSE_BUTTON.addEventListener(('click'), () => {
      FULLSCREEN_CONTAINER.classList.add('hidden');
      PAGE_BODY.classList.remove('modal-open');
    });
    //выходим из режима полноэкранного просмотра фото по клику на кнопку esc
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        FULLSCREEN_CONTAINER.classList.add('hidden');
        PAGE_BODY.classList.remove('modal-open');
      }
    });
  });
};

for (let i = 0; i < THUMBNAILS.length; i++) {
  addThumbnailClickHandler(THUMBNAILS[i], PHOTOS[i]);
  console.log(THUMBNAILS[i]);
  console.log(PHOTOS[i]);
}
