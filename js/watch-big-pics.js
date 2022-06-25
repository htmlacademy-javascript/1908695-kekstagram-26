import {createPhotoDescriptions} from './data.js';
import {createComment} from './data.js';
import {getComments} from './data.js';

const bigPicturePopup = document.querySelector('.big-picture');
const popupCancelButton = bigPicturePopup.querySelector('.big-picture__cancel');
const socialCommentsCount = bigPicturePopup.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicturePopup.querySelector('.comments-loader');
const commentList = bigPicturePopup.querySelector('.social__comments');
const body = document.querySelector('body');
const previewPictures = document.querySelectorAll('.picture__img');
console.log(previewPictures);

for (let i = 0; i < previewPictures.length; i++) {
  previewPictures[i].addEventListener('click', () => {
    bigPicturePopup.classList.remove('hidden');
    body.classList.add('.modal-open');
  });
}

popupCancelButton.addEventListener('click', () => {
  bigPicturePopup.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPicturePopup.classList.add('hidden');
  }
});

// socialCommentsCount.classList.add('hidden');
// socialCommentsLoader.classList.add('hidden');


const bigElement =  {
  url: document.querySelector('.big-picture__img img'),
  likes: document.querySelector('.likes-count'),
  comments: document.querySelector('.comments-count'),
  description: document.querySelector('.social__caption')
};


const bigPictures = createPhotoDescriptions();

bigPictures.forEach((bigPicture) => {
  bigElement.url.src = bigPicture.url;
  bigElement.likes.textContent = bigPicture.likes;
  bigElement.comments.textContent = String(bigPicture.comments.length);
  bigElement.description.textContent = bigPicture.description;
});
console.log(bigPictures);
const comment = {
  url: commentList.querySelector('img'),
  alt: commentList.querySelector('img'),
  text: commentList.querySelector('.social__text')
};

const comments = getComments(30);
comments.forEach((commentItem) => {
  comment.url.src = commentItem.avatar;
  comment.alt.textContent = commentItem.name;
  comment.text.textContent = commentItem.message;
});

