import {getData} from './api.js';
const otherUserPicturesList = document.querySelector('.pictures');
const otherUserPicture = document.querySelector('#picture').content.querySelector('.picture');

const createPhotos = (otherUsersPhotoDescriptions) => {
  const otherUserPicturesListFragment = document.createDocumentFragment();

  otherUsersPhotoDescriptions.forEach((photoDescription) => {
    const otherUserPictureElement = otherUserPicture.cloneNode(true);
    otherUserPictureElement.querySelector('.picture__img').src = photoDescription.url;
    otherUserPictureElement.querySelector('.picture__comments').textContent= String(photoDescription.comments.length);
    otherUserPictureElement.querySelector('.picture__likes').textContent = photoDescription.likes;
    otherUserPicturesListFragment.append(otherUserPictureElement);
  });
  otherUserPicturesList.append(otherUserPicturesListFragment);
};
//здесь создаю массив из фото с сервера и передаю в функцию для создания миниатюр
const pictures = [];
getData((photos) => {
  for (let i = 0; i <=photos.length; i++) {
    pictures.push(photos[i]);
  }
  createPhotos(photos);
});
export {pictures};

