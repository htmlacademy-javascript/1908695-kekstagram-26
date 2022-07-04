import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormHashtagfield = document.querySelector('#hashtags');
const uploadFormCommentfield = document.querySelector('#description');
const uploadButton = uploadForm.querySelector('.img-upload__start #upload-file');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const uploadPhotoEditScreen = uploadForm.querySelector('.img-upload__overlay');
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
const maxCommentLength = 140;
const validateCommentLength = (value) =>  value.length >= 0 && value.length <= maxCommentLength;

const validateHashTagsLength = (value) => {
  const arr = value.split(' ');
  for (const arrElem of arr) {
    if (arrElem.length < 20 || arrElem.length === 20) {
      return true;
    }
  } return false;
};

const validateHashTagsContent = (value) => {
  const re = /^#[A-Za-z0-9А-Яа-яЁё]{1,19}$/i;
  const arr = value.split(' ');
  for (const arrElem of arr) {
    if (!re.test(arrElem) && arrElem !== '') {
      return false;
    }
  } return true;
};

const validateHashTagsAmount = (value) => {
  const arr = value.split(' ');
  const maxHashTagsAmounts = 5;
  return arr.length < maxHashTagsAmounts || arr.length === maxHashTagsAmounts;
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
//const validateUploadFile = (value) => value !== '';

//pristine.addValidator((uploadButton), validateUploadFile, 'добавьте изображение');
pristine.addValidator(uploadFormCommentfield, validateCommentLength, 'комментарий не может быть длинее 140 символов');
pristine.addValidator(uploadFormHashtagfield, validateHashTagsUnique, 'хэштеги не должны повторяться');
pristine.addValidator(uploadFormHashtagfield, validateHashTagsAmount, 'максимальное количество хештегов - 5');
pristine.addValidator(uploadFormHashtagfield, validateHashTagsLength, 'максимальная длина хештега - 20 символов, включая решетку');
pristine.addValidator(uploadFormHashtagfield, validateHashTagsContent, 'хештег должен начинаться с #, минимум 2 символа, допустимы только цифры и буквы русского алфавита или латиница');

//функции для настройки открытия и закрытия формы загрузки фото
const openUploadForm = () => {
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
  uploadPhotoEditScreen.classList.remove('hidden');
};
const closeUploadForm = () => {
  pageBody.classList.remove('modal-open');
  //document.removeEventListener('keydown', onFullScreenContainerEscKeydownForm);
  uploadPhotoEditScreen.classList.add('hidden');
  uploadFormHashtagfield.value = '';
  uploadFormCommentfield.value = '';
  uploadButton.value = '';
};

function onUploadEscKeydown (evt) {
  if (uploadFormCommentfield === document.activeElement ||
    uploadFormHashtagfield === document.activeElement) {
    return;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
    document.removeEventListener('keydown', onUploadEscKeydown);
  }
}

uploadButton.addEventListener('change', () => {
  openUploadForm();
  uploadCancelButton.addEventListener('click', onUpLoadCancelButton);
});

function onUpLoadCancelButton () {
  closeUploadForm();
  uploadButton.removeEventListener('click', onUploadEscKeydown);
  uploadCancelButton.removeEventListener('click', onUpLoadCancelButton);
}

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});


