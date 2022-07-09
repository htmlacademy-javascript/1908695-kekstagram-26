import {otherUsersPhotoDescriptions} from './create-other-user-pictures.js';
import {isEscapeKey} from './util.js';

const PHOTOS = otherUsersPhotoDescriptions;

const fullScreenContainer = document.querySelector('.big-picture');
const fullScreenPhoto = fullScreenContainer.querySelector('.big-picture__img img');
const thumbnails = document.querySelectorAll('.picture');
const likesNumber = fullScreenContainer.querySelector('.likes-count');
const commentsNumber = fullScreenContainer.querySelector('.comments-count');
const description = fullScreenContainer.querySelector('.social__caption');
const commentList = fullScreenContainer.querySelector('.social__comments');
const commentListCounter = fullScreenContainer.querySelector('.social__comment-count');
const commentLoad = fullScreenContainer.querySelector('.comments-loader');
const pageBody = document.querySelector('body');
const fullScreenCloseButton = fullScreenContainer.querySelector('.big-picture__cancel');

//функции для закрытия и открытия режима полноэкранного просмотра фото
const openFullScreenContainer = () => {
  commentLoad.classList.add('hidden');
  commentListCounter.classList.add('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onFullScreenContainerEscKeydown);
  fullScreenContainer.classList.remove('hidden');
};

const closeFullScreenContainer = () => {
  commentLoad.classList.remove('hidden');
  commentListCounter.classList.remove('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullScreenContainerEscKeydown);
  fullScreenContainer.classList.add('hidden');
};

//декларативная функция так как вызвана раньше объявления
function onFullScreenContainerEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullScreenContainer();
  }
}

fullScreenCloseButton.addEventListener('click', () => {
  closeFullScreenContainer();
});

//функция для создания элемента по заданным параметрам
const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

//функция для просмотра полноэкранного изображения по клику
const addThumbnailClickHandler = (thumbnail, photo) => {
  thumbnail.addEventListener('click', () => {
    openFullScreenContainer();
    //описываем объект полноразмерного фото передавая данные из функции createPhotoDescriptions
    fullScreenPhoto.src = photo.url;
    likesNumber.textContent = photo.likes;
    commentsNumber.textContent = String(photo.comments.length);
    commentList.innerHTML = '';
    description.textContent = photo.description;
    //создаем комментарии на основе данных ключа comments из функции createPhotoDescriptions
    photo.comments.forEach((comment) => {
      const commentListItem = makeElement('li', 'social__comment');
      commentList.appendChild(commentListItem);
      const commentAvatar = makeElement('img', 'social__picture');
      commentAvatar.style.width = '35px';
      commentAvatar.style.height = '35px';
      commentAvatar.src = comment.avatar;
      commentAvatar.alt = comment.message;
      commentListItem.appendChild(commentAvatar);
      const commentContent = makeElement('p', 'social__text', comment.message);
      commentListItem.appendChild(commentContent);
    });
  });
};

const thumbnailClicker = () => {
  for (let i = 0; i < thumbnails.length; i++) {
    addThumbnailClickHandler(thumbnails[i], PHOTOS[i]);
  }
};

export {thumbnailClicker, openFullScreenContainer, closeFullScreenContainer, makeElement, onFullScreenContainerEscKeydown};
