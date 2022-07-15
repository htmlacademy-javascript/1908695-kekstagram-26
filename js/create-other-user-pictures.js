import {addThumbnailClickHandler} from './watch-big-pics.js';
const otherUserPicturesList = document.querySelector('.pictures');
const otherUserPicture = document.querySelector('#picture').content.querySelector('.picture');

const createPhotos = (otherUsersPhotoDescriptions) => {
  const otherUserPicturesListFragment = document.createDocumentFragment();

  otherUsersPhotoDescriptions.forEach(({ url, likes, comments, id, description }) => {
    const otherUserPictureElement = otherUserPicture.cloneNode(true);
    otherUserPictureElement.querySelector('.picture__img').src = url;
    otherUserPictureElement.querySelector('.picture__comments').textContent= String(comments.length);
    otherUserPictureElement.querySelector('.picture__likes').textContent = likes;
    otherUserPictureElement.querySelector('.picture__img').setAttribute('data-id', id);
    otherUserPictureElement.addEventListener('click', () => {
      addThumbnailClickHandler({ url, likes, comments, id, description });
    });
    otherUserPicturesListFragment.append(otherUserPictureElement);
  });
  otherUserPicturesList.append(otherUserPicturesListFragment);
};

export {createPhotos};

