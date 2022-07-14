import {isEscapeKey, showAlert} from './util.js';
import {
  initImageScaling,
  destroyImageScaling,
  onSelectionEffectChange,
  InitImageVisualEffects,
  effectList,
  effectLevelSlider
} from './create-visual-effects.js';
import {sendData} from './api.js';
import {uploadFile} from './choose-file.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormHashtagfield = document.querySelector('#hashtags');
const uploadFormCommentfield = document.querySelector('#description');
const uploadButton = uploadForm.querySelector('.img-upload__start #upload-file');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const uploadPhotoEditScreen = uploadForm.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

//блок с функциями для показа сообщения об ошибке или успехе загрузки фото
const showSuccessMessage = () => {
  document.body.append(successMessageTemplate);
  successButton.addEventListener('click', onSuccessButtonClose);
  window.addEventListener('click', onSuccessWindowClickClose);
  document.addEventListener('keydown', onMessageEscKeyDown);
};


function onSuccessButtonClose () {
  successMessageTemplate.classList.add('hidden');
  successButton.removeEventListener('click', onSuccessButtonClose);
  window.removeEventListener('click', onSuccessWindowClickClose);
  document.addEventListener('keydown', onMessageEscKeyDown);
}

function onSuccessWindowClickClose(evt) {
  const target = evt.target;
  if (!target.matches('.success__inner'))  {
    successMessageTemplate.classList.add('hidden');
    successButton.removeEventListener('click', onSuccessButtonClose);
    document.removeEventListener('keydown', onMessageEscKeyDown);
    window.removeEventListener('click', onSuccessWindowClickClose);
  }
}
const showErrorMessage = () => {
  document.body.append(errorMessageTemplate);
  errorMessageTemplate.style.zIndex = '100';
  errorButton.addEventListener('click', onErrorButtonClose);
  document.addEventListener('keydown', onMessageEscKeyDown,);
  window.addEventListener('click', onErrorWindowClickClose);
};

function onErrorButtonClose () {
  errorMessageTemplate.classList.add('hidden');
  errorButton.removeEventListener('click', onErrorButtonClose);
  document.removeEventListener('keydown', onMessageEscKeyDown);
  window.removeEventListener('click', onErrorWindowClickClose);
}

function onErrorWindowClickClose(evt) {
  const target = evt.target;
  if (!target.matches('.error__inner')) {
    errorMessageTemplate.classList.add('hidden');
    errorButton.removeEventListener('click', onErrorButtonClose);
    window.removeEventListener('click', onErrorWindowClickClose);
    document.removeEventListener('keydown', onMessageEscKeyDown);
  }
}
function onMessageEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successMessageTemplate.classList.add('hidden');
    errorMessageTemplate.classList.add('hidden');
    document.body.classList.remove('.error');
    successButton.removeEventListener('click', onSuccessButtonClose);
    window.removeEventListener('click', onErrorWindowClickClose);
    errorButton.removeEventListener('click', onErrorButtonClose);
    window.removeEventListener('click', onSuccessWindowClickClose);
    document.removeEventListener('keydown', onMessageEscKeyDown);
  }
}
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//функции для настройки открытия и закрытия формы загрузки фото
const openUploadForm = () => {
  pageBody.classList.add('modal-open');
  uploadPhotoEditScreen.classList.remove('hidden');
  initImageScaling();
  InitImageVisualEffects();
  document.addEventListener('keydown', onUploadEscKeydown);
};
const closeUploadForm = () => {
  pageBody.classList.remove('modal-open');
  uploadPhotoEditScreen.classList.add('hidden');
  uploadFormHashtagfield.value = '';
  uploadFormCommentfield.value = '';
  uploadButton.value = '';
  destroyImageScaling();
  effectList.removeEventListener('change', onSelectionEffectChange);
  effectLevelSlider.noUiSlider.destroy();
  uploadForm.reset();
};

function onUploadEscKeydown (evt) {
  if (uploadFormCommentfield === document.activeElement ||
    uploadFormHashtagfield === document.activeElement || !errorMessageTemplate.classList.contains('hidden')) {
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
  console.log('upload');
  uploadFile();
  uploadCancelButton.addEventListener('click', onUpLoadCancelButton);
});

function onUpLoadCancelButton () {
  closeUploadForm();
  uploadButton.removeEventListener('click', onUploadEscKeydown);
  uploadCancelButton.removeEventListener('click', onUpLoadCancelButton);
}
const uploadNewPicture = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSuccessMessage();
          unblockSubmitButton();
        },
        () => {
          showAlert();
          unblockSubmitButton();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};
uploadNewPicture(closeUploadForm);
export {uploadNewPicture, openUploadForm, closeUploadForm, uploadButton};

