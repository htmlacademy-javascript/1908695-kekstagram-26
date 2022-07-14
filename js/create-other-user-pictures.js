import {addThumbnailClickHandler} from './watch-big-pics.js';
const otherUserPicturesList = document.querySelector('.pictures');
const otherUserPicture = document.querySelector('#picture').content.querySelector('.picture');

const createPhotos = (otherUsersPhotoDescriptions) => {
  const otherUserPicturesListFragment = document.createDocumentFragment();

  otherUsersPhotoDescriptions.forEach((photo) => {
    const otherUserPictureElement = otherUserPicture.cloneNode(true);
    otherUserPictureElement.querySelector('.picture__img').src = photo.url;
    otherUserPictureElement.querySelector('.picture__comments').textContent= String(photo.comments.length);
    otherUserPictureElement.querySelector('.picture__likes').textContent = photo.likes;
    otherUserPictureElement.addEventListener('click', () => {
      addThumbnailClickHandler(photo);
    });
    otherUserPicturesListFragment.append(otherUserPictureElement);
  });
  otherUserPicturesList.append(otherUserPicturesListFragment);
};

export {createPhotos};

