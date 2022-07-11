import {createPhotos} from './create-other-user-pictures.js';
import {uploadNewPicture, openUploadForm, closeUploadForm} from './user-form.js';
import {showAlert} from './util.js';
const bigPhotos = [];

function getData (onSuccess) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
      bigPhotos.push(photos);
      console.log(photos);
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
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {sendData, getData};

uploadNewPicture(closeUploadForm);

console.log(bigPhotos);
export {bigPhotos};

