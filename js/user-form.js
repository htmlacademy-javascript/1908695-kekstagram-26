import {isEscapeKey, showAlert} from './util.js';
import {
  initImageScaling,
  destroyImageScaling,
  onSelectionEffectChange,
  initImageVisualEffects,
  effectList,
  effectLevelSlider,
  imageUploadPreview
} from './create-visual-effects.js';
import {sendData} from './api.js';
import {uploadFile} from './choose-file.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_AMOUNT = 5;

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
  successMessageTemplate.style.zIndex = '100';
  successButton.addEventListener('click', onSuccessButtonClose);
  window.addEventListener('click', onSuccessWindowClickClose);
  document.addEventListener('keydown', onMessageEscKeyDown);
};

function onSuccessButtonClose () {
  successMessageTemplate.remove();
  successButton.removeEventListener('click', onSuccessButtonClose);
  window.removeEventListener('click', onSuccessWindowClickClose);
  document.addEventListener('keydown', onMessageEscKeyDown);
}

function onSuccessWindowClickClose(evt) {
  const target = evt.target;
  if (!target.matches('.success__inner'))  {
    successMessageTemplate.remove();
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
  errorMessageTemplate.remove();
  errorButton.removeEventListener('click', onErrorButtonClose);
  document.removeEventListener('keydown', onMessageEscKeyDown);
  window.removeEventListener('click', onErrorWindowClickClose);
}

function onErrorWindowClickClose(evt) {
  const target = evt.target;
  if (!target.matches('.error__inner')) {
    errorMessageTemplate.remove();
    errorButton.removeEventListener('click', onErrorButtonClose);
    window.removeEventListener('click', onErrorWindowClickClose);
    document.removeEventListener('keydown', onMessageEscKeyDown);
  }
}
function onMessageEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorMessageTemplate.remove();
    successMessageTemplate.remove();
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
const validateCommentLength = (value) =>  value.length >= 0 && value.length <= MAX_COMMENT_LENGTH;

const validateHashTagsLength = (value) => {
  const arr = value.split(' ');
  for (const arrElem of arr) {
    if (arrElem.length < MAX_COMMENT_LENGTH || arrElem.length === MAX_HASHTAG_LENGTH) {
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
  return arr.length < MAX_HASHTAG_AMOUNT || arr.length === MAX_HASHTAG_AMOUNT;
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
  initImageVisualEffects();
  document.addEventListener('keydown', onUploadEscKeydown);
};
const closeUploadForm = () => {
  pageBody.classList.remove('modal-open');
  uploadPhotoEditScreen.classList.add('hidden');
  uploadFormHashtagfield.value = '';
  uploadFormCommentfield.value = '';
  uploadButton.value = '';
  imageUploadPreview.src = '';
  imageUploadPreview.className = '';
  destroyImageScaling();
  effectList.removeEventListener('change', onSelectionEffectChange);
  effectLevelSlider.noUiSlider.destroy();
  uploadForm.reset();
};

function onUploadEscKeydown (evt) {
  if (uploadFormCommentfield === document.activeElement ||
    uploadFormHashtagfield === document.activeElement  || document.body.contains(errorMessageTemplate)) {
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
        },
        new FormData(evt.target),
      ); return;
    }showErrorMessage();
  });
};
uploadNewPicture(closeUploadForm);

export {uploadNewPicture, openUploadForm, closeUploadForm, uploadButton};

