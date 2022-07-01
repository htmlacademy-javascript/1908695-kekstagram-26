import {closeFullScreen, openFullScreen} from './watch-big-pics.js';
import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__start #upload-file');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const uploadPhotoEditScreen = uploadForm.querySelector('.img-upload__overlay');
const uploadSubmitButton = uploadForm.querySelector('#upload-submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'pristine-custom',
  errorClass: 'pristine-custom--invalid',
  successClass: 'pristine-custom--valid',
  errorTextParent: 'pristine-custom',
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
    } else if (value === '') {
      return true;
    }
  } return false;
}
const validateUploadFile = (value) => value !== '';

pristine.addValidator((uploadButton), validateUploadFile, 'добавьте изображение');
pristine.addValidator(uploadForm.querySelector('#description'), validateNickname, 'комментарий не может быть длинее 140 символов');
pristine.addValidator(uploadForm.querySelector('#hashtags'), validateHashTag, 'хэштег должен начинаться с символа #,  содержать от 2 до 20 символов, разделяться пробелом и не повторяться, максимальное количество - 5');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('можно отправлять');
  } else {
    console.log('нельяз отправлять');
  }
  //evt.target.reset();
});

function onFullScreenContainerEscKeydownForm (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullScreen(onFullScreenContainerEscKeydownForm, uploadPhotoEditScreen);
    uploadButton.value = '';
  }
}
uploadButton.addEventListener('click', () => {
  openFullScreen(onFullScreenContainerEscKeydownForm, uploadPhotoEditScreen);
});

uploadCancelButton.addEventListener('click', () => {
  closeFullScreen(onFullScreenContainerEscKeydownForm, uploadPhotoEditScreen);
  uploadButton.value = '';
});

const blockUploadSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Публикую...';
};

const unblockUploadSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};
