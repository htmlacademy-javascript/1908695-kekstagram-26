import {isEscapeKey} from './util.js';

const fullScreenContainer = document.querySelector('.big-picture');
const fullScreenPhoto = fullScreenContainer.querySelector('.big-picture__img img');
const likesNumber = fullScreenContainer.querySelector('.likes-count');
const commentsNumber = fullScreenContainer.querySelector('span.comments-count');
const description = fullScreenContainer.querySelector('.social__caption');
const commentList = fullScreenContainer.querySelector('.social__comments');
const commentLoad = fullScreenContainer.querySelector('button.comments-loader');
const pageBody = document.querySelector('body');
const fullScreenCloseButton = fullScreenContainer.querySelector('.big-picture__cancel');
const socialCommentCount = fullScreenContainer.querySelector('div.social__comment-count');
const COMMENT_STEP = 5;

//функции для закрытия и открытия режима полноэкранного просмотра фото
const openFullScreenContainer = () => {
  commentLoad.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onFullScreenContainerEscKeydown);
  fullScreenContainer.classList.remove('hidden');
};

const closeFullScreenContainer = () => {
  commentLoad.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
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
const addThumbnailClickHandler = (photo) => {
  openFullScreenContainer();
  //описываем объект полноразмерного фото передавая данные из функции createPhotoDescriptions
  fullScreenPhoto.src = photo.url;
  likesNumber.textContent = photo.likes;
  commentsNumber.textContent = String(photo.comments.length);
  const countComments = (photo.comments.length < 5) ? photo.comments.length : '5';
  socialCommentCount.textContent=`${countComments} из ${photo.comments.length} коментариев`;
  if (photo.comments.length > 5 && countComments < photo.comments.length - COMMENT_STEP) {
    commentLoad.classList.remove('hidden');
  }
  commentList.innerHTML = '';
  description.textContent = photo.description;
  //создаем комментарии на основе данных ключа comments из функции createPhotoDescriptions
  photo.comments.forEach(({ avatar, message, name }) => {
    const commentListItem = makeElement('li', 'social__comment');
    commentList.appendChild(commentListItem);
    const commentAvatar = makeElement('img', 'social__picture');
    commentAvatar.style.width = '35px';
    commentAvatar.style.height = '35px';
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentListItem.appendChild(commentAvatar);
    const commentContent = makeElement('p', 'social__text', message);
    commentListItem.appendChild(commentContent);
  });
};

export {openFullScreenContainer, closeFullScreenContainer, makeElement, onFullScreenContainerEscKeydown, addThumbnailClickHandler};
