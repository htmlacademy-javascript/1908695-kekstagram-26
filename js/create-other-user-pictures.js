import {addThumbnailClickHandler} from './watch-big-pics.js';
import {debounce} from './util.js';

const otherUserPicturesList = document.querySelector('.pictures');
const otherUserPicture = document.querySelector('#picture').content.querySelector('.picture');
const filterChooser = document.querySelector('.img-filters');
const filterButtons = filterChooser.querySelectorAll('.img-filters__button');

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
  filterChooser.classList.remove('img-filters--inactive');
};

const toggleFilterChooser = (chosenButton) => {
  filterChooser.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  chosenButton.classList.add('img-filters__button--active');
};

filterChooser.addEventListener('click', (evt) => {
  const target = evt.target;
  if (target.matches('.img-filters__button')) {
    console.log('click');
    toggleFilterChooser(target);
  }
});
export {createPhotos};

