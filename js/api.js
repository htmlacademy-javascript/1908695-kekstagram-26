import {uploadNewPicture, closeUploadForm} from './user-form.js';
import {showAlert} from './util.js';

function getData (onSuccess) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if(response.ok){
        return response.json();
      } else {
        showAlert('Не удалось загрузить изображения. Пожалуйста, обновите страницу');
      }
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Не удалось загрузить изображения. Пожалуйста, обновите страницу');
    });
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {sendData, getData};

uploadNewPicture(closeUploadForm);


