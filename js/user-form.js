import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormHashtagfield = document.querySelector('#hashtags');
const uploadFormCommentfield = document.querySelector('#description');
const uploadButton = uploadForm.querySelector('.img-upload__start #upload-file');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const uploadPhotoEditScreen = uploadForm.querySelector('.img-upload__overlay');
const uploadSubmitButton = uploadForm.querySelector('#upload-submit');
const pageBody = document.querySelector('body');

//настройка классов для Пристин появляющиеся в DOMe
const pristine = new Pristine(uploadForm, {
  classTo: 'pristine-custom',
  errorClass: 'pristine-custom--invalid',
  successClass: 'pristine-custom--valid',
  errorTextParent: 'pristine-custom',
  errorTextClass: 'text-pristine',
  errorTextTag: 'div'
});
//функции-валидаторы для Пристин
const validateCommentLength = (value) =>  value.length >= 0 && value.length <= 140;

const validateHashTags = (value) => {
  const re = /^#[A-Za-z0-9А-Яа-яЁё]{1,19}$/i;
  const arr = value.split(' ');
  for (let i =0; i< arr.length; i++) {
    if (arr.length <= 5 && re.test(arr[i])) {
      return true;
    } else if (value === '') {
      return true;
    }
  } return false;
};

const validateHashTagsUnique = (value) => {
  const arr = value.split(' ');
  for (let i =0; i < arr.length; i++) {
    for (let j= i+ 1; j <arr.length; j++) {
      if (arr[i] === arr[j] && arr[i] !== '') {
        return false;
      }
    }
  } return true;
};

//вот эта функция не отрабатывает, не появляется сообщение (проверка на то, что поле загрузки фото непустое)
const validateUploadFile = (value) => value !== '';

pristine.addValidator((uploadButton), validateUploadFile, 'добавьте изображение');
pristine.addValidator(uploadFormCommentfield, validateCommentLength, 'комментарий не может быть длинее 140 символов');
pristine.addValidator(uploadFormHashtagfield, validateHashTags, 'хэштег должен начинаться с символа #,  содержать от 2 до 20 символов, разделяться пробелом и не повторяться, максимальное количество - 5');
pristine.addValidator(uploadForm.querySelector('#hashtags'), validateHashTagsUnique, 'хэштеги не должны повторяться');

//функции для настройки открытия и закрытия формы загрузки фото
const openFullPhotoEditScreen = () => {
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onFullScreenContainerEscKeydownForm);
  uploadPhotoEditScreen.classList.remove('hidden');
};
const closeFullScreenPhotoEditScreen = () => {
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullScreenContainerEscKeydownForm);
  uploadPhotoEditScreen.classList.add('hidden');
};

//функции для настройки кнопки отправки
const blockUploadSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Публикую...';
};

const unblockUploadSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

//функция для обработки и отправки формы
const onUploadForm = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockUploadSubmitButton();
    unblockUploadSubmitButton();
    closeFullScreenPhotoEditScreen();
    evt.target.reset();
  } else {
    unblockUploadSubmitButton();
  }
  new FormData(evt.target);
};

uploadForm.addEventListener('submit', onUploadForm);
//декларативная функция, так как вызывается раньше объявления
function onFullScreenContainerEscKeydownForm (evt) {
  if (uploadFormCommentfield === document.activeElement ||
    uploadFormHashtagfield === document.activeElement) {
    return;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullScreenPhotoEditScreen();
    uploadButton.value = '';
    uploadForm.removeEventListener('submit', onUploadForm);
  }
}

const onUploadButtonInitNewPhotoLoading = () => {
  openFullPhotoEditScreen();
};
//ВОТ ТУТ У МЕНЯ НЕ СРАБАТЫВАЕТ СОБЫТИЕ CHANGE, не понимаю почему
uploadButton.addEventListener('click', onUploadButtonInitNewPhotoLoading);

uploadCancelButton.addEventListener('click', () => {
  closeFullScreenPhotoEditScreen();
  uploadButton.removeEventListener('click', onUploadButtonInitNewPhotoLoading);
  uploadButton.value = '';
});

