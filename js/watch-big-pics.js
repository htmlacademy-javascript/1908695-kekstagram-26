import {isEscapeKey} from './util.js';

const fullScreenContainer = document.querySelector('.big-picture');
const fullScreenPhoto = fullScreenContainer.querySelector('.big-picture__img img');
const likesNumber = fullScreenContainer.querySelector('.likes-count');
const socialDescription = fullScreenContainer.querySelector('.social__caption');
const commentList = fullScreenContainer.querySelector('.social__comments');
const commentLoad = fullScreenContainer.querySelector('button.comments-loader');
const pageBody = document.querySelector('body');
const fullScreenCloseButton = fullScreenContainer.querySelector('.big-picture__cancel');
const socialCommentCount = fullScreenContainer.querySelector('div.social__comment-count');


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
  commentLoad.removeEventListener('click', onLoadCommentsClick);
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
const addThumbnailClickHandler = ({url, likes, comments, description}) => {
  openFullScreenContainer();
  //описываем объект полноразмерного фото передавая данные из функции createPhotoDescriptions
  fullScreenPhoto.src = url;
  likesNumber.textContent = likes;
  const countComments = (comments.length < 5) ? comments.length : '5';
  socialCommentCount.textContent = `${countComments} из ${comments.length} коментариев`;
  if (comments.length < 4 || comments.length === 4) {
    commentLoad.classList.add('hidden');
  } else if (comments.length > 4) {
    commentLoad.classList.remove('hidden');
  }
  commentList.innerHTML = '';
  socialDescription.textContent = description;
  makeComments(comments);
  if(document.querySelector('.social__comments').querySelectorAll('.hidden').length === 0) {
    commentLoad.classList.add('hidden');
  }
};
//создаем комментарии на основе данных ключа comments из функции createPhotos
function makeComments (photoComments) {
  photoComments.forEach(({ avatar, message, name }, index) => {
    const commentListItem = makeElement('li', 'social__comment');
    commentList.appendChild(commentListItem);
    const commentAvatar = makeElement('img', 'social__picture');
    commentAvatar.style.width = '35px';
    commentAvatar.style.height = '35px';
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentListItem.appendChild(commentAvatar);
    const commentContent = makeElement('p', 'social__text', message);
    //проверяем по индексу количество комментариев и всем с индексом больше 4 добавляем класс скрытия
    commentListItem.appendChild(commentContent);
    if (index > 4) {
      commentListItem.classList.add('hidden');
    }
    commentLoad.addEventListener('click', onLoadCommentsClick);
  });
}

//функция подгрузки комментариев, которая передается в обработчика клика по кнопке доп загрузки
function onLoadCommentsClick () {
  commentList.querySelectorAll('.hidden').forEach((element,index) => {
    if (index < 5) {
      element.classList.remove('hidden');
    }
  });
  //счетчик комментариев по принципу все элементы минус все спрятанные элементы
  const countComments = commentList.children.length - commentList.querySelectorAll('.hidden').length;
  socialCommentCount.textContent=`${countComments} из ${commentList.children.length} коментариев`;
  if (commentList.querySelectorAll('.hidden').length===0) {
    commentLoad.classList.add('hidden');
  }
}
export {openFullScreenContainer, closeFullScreenContainer, makeElement, onFullScreenContainerEscKeydown, addThumbnailClickHandler};

