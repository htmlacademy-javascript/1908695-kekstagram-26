import {closeFullScreen, openFullScreen} from './watch-big-pics.js';
import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__start #upload-file');
const uploadPhotoEditScreen = uploadForm.querySelector('.img-upload__overlay');
console.log(uploadButton);

function onFullScreenContainerEscKeydownForm (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullScreen();
    uploadPhotoEditScreen.classList.add('hidden');
  }
}
uploadButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  openFullScreen(onFullScreenContainerEscKeydownForm);
  console.log('hello');
  uploadPhotoEditScreen.classList.remove('hidden');
});
