import {addThumbnailClickHandler} from './watch-big-pics.js';
const otherUserPicturesList = document.querySelector('.pictures');
const otherUserPicture = document.querySelector('#picture').content.querySelector('.picture');
<<<<<<< Updated upstream

const createPhotos = (otherUsersPhotoDescriptions) => {
=======
const filterChooser = document.querySelector('.img-filters');


function showFilters(arrayPhoto, debounceRenderPhotoElements){
  filterChooser.addEventListener('click', onFilterClick.bind(this, arrayPhoto, debounceRenderPhotoElements));
}

function onFilterClick(arrayPhoto, debounceRenderPhotoElements, evt){
  const target = evt.target;
  FILTERS.forEach((element)=>{
    document.querySelector(`[id=${element}]`).classList.remove('img-filters__button--active');
  });
  target.classList.add('img-filters__button--active');
  if (target.id === 'filter-random') {
    return debounceRenderPhotoElements(getRandomPhotoArray(arrayPhoto));
  }
  if (target.id === 'filter-discussed') {
    return debounceRenderPhotoElements(getDiscussedPhotoArray(arrayPhoto));
  }
  debounceRenderPhotoElements(arrayPhoto);
}


const createPhotos = (otherUsersPhotos) => {
>>>>>>> Stashed changes
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

