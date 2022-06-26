import {createPhotoDescriptions} from './data.js';
import {commentssocials} from './data.js';

const bigPicturePopup = document.querySelector('.big-picture');
const popupCancelButton = bigPicturePopup.querySelector('.big-picture__cancel');
//const socialCommentsCount = bigPicturePopup.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicturePopup.querySelector('.comments-loader');
const commentList = bigPicturePopup.querySelector('.social__comments');
const commentItem = bigPicturePopup.querySelector('.social__comment');
const body = document.querySelector('body');
const previewPictures = document.querySelectorAll('.picture__img');

//описываю объект фото попапа
const bigElement =  {
  url: document.querySelector('.big-picture__img img'),
  likes: document.querySelector('.likes-count'),
  comments: document.querySelector('.comments-count'),
  description: document.querySelector('.social__caption')
};

//генерирую массив из фото попапов и записываю в нужные селекторы нужные свойства фотографий

const bigPictures = createPhotoDescriptions();

bigPictures.forEach((bigPicture) => {
  bigElement.url.src = bigPicture.url;
  bigElement.likes.textContent = bigPicture.likes;
  bigElement.comments.textContent = String(commentssocials.length);
  bigElement.description.textContent = bigPicture.description;
});

//создаю массив из src фото попапов
const bigPicturesUrls = bigPictures.map((item) =>  item.url);

//описываю функцию, которая при нажатии на превью фото должна выводить фото попап
const previewClicker = function (preview, fullsize) {
  preview.addEventListener('click', () => {
    bigPicturePopup.src = fullsize;
    bigPicturePopup.classList.remove('hidden');
    body.classList.add('.modal-open');
    socialCommentsLoader.classList.add('hidden');
  });
};
//перебираю коллекцию из превью фото и перередаю фукнцию клика
for (let i = 0; i < previewPictures.length; i++) {
  previewClicker(previewPictures[i], bigPicturesUrls[i]);
}
//закрываем попап по кнопке
popupCancelButton.addEventListener('click', () => {
  bigPicturePopup.classList.add('hidden');
});
//закрывваем попап нажав esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPicturePopup.classList.add('hidden');
  }
});
//генерируем комментарии
commentssocials.forEach((commentElement) => {
  const comment = commentItem.cloneNode(true);
  comment.querySelector('img').src = commentElement.avatar;
  comment.querySelector('img').alt = commentElement.name;
  comment.querySelector('.social__text').textContent = commentElement.message;
  commentList.append(comment);
});


