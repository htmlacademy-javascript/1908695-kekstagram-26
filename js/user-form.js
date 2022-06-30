import {closeFullScreen, openFullScreen} from './watch-big-pics.js';
import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__start #upload-file');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const uploadPhotoEditScreen = uploadForm.querySelector('.img-upload__overlay');


const pristine = new Pristine(uploadForm, {
  classTo: 'pristine',
  errorTextParent: 'pristine',
  errorTextClass: 'text-pristine',
  errorTextTag: 'div'
});

const validateNickname = (value) =>  value.length >= 0 && value.length <= 10;
function validateHashTag (value) {
  const re = /^#[A-Za-z0-9А-Яа-яЁё]{1,19}$/i;
  const arr = value.split(' ');
  for (let i =0; i< arr.length; i++) {
    if (arr.length <= 5 && re.test(arr[i])) {
      return true;
    }
  } return false;
}
pristine.addValidator(uploadForm.querySelector('#description'), validateNickname, 'комментарий не может быть длинее 140 символов');
pristine.addValidator(uploadForm.querySelector('#hashtags'), validateHashTag, 'хэштег должен начинаться с символа #,  содержать от 2 до 20 символов, разделяться пробелом и не повторяться, максимальное количество - 5');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  /*uploadForm.querySelector('#description').value = '';
  uploadForm.querySelector('#hashtags').value = '';
  uploadButton.value = '';*/
});

function onFullScreenContainerEscKeydownForm (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullScreen(onFullScreenContainerEscKeydownForm, uploadPhotoEditScreen);
    uploadButton.value = '';
  }
}
uploadButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  openFullScreen(onFullScreenContainerEscKeydownForm, uploadPhotoEditScreen);
});

uploadCancelButton.addEventListener('click', () => {
  closeFullScreen(onFullScreenContainerEscKeydownForm, uploadPhotoEditScreen);
  uploadButton.value = '';
});
