import {createPhotoDescriptions} from './data.js';

const otherUserPicturesList = document.querySelector('.pictures');
const otherUserPicture = document.querySelector('#picture').content.querySelector('.picture');
const otherUsersPhotoDescriptions = createPhotoDescriptions();
const otherUserPicturesListFragment = document.createDocumentFragment();

otherUsersPhotoDescriptions.forEach((photoDescription) => {
  const otherUserPictureElement = otherUserPicture.cloneNode(true);
  otherUserPictureElement.querySelector('.picture__img').src = photoDescription.url;
  otherUserPictureElement.querySelector('.picture__comments').textContent= String(photoDescription.comments.length);
  otherUserPictureElement.querySelector('.picture__likes').textContent = photoDescription.likes;
  otherUserPicturesListFragment.append(otherUserPictureElement);
});
otherUserPicturesList.append(otherUserPicturesListFragment);


