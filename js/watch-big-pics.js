const bigPictureWindow = document.querySelector('.big-picture');
const BigPictureCancelButton = document.querySelector('.big-picture__cancel');
//const body = document.querySelector('body');

// bigPictureWindow.addEventListener('click', () => {
//   bigPictureWindow.classList.remove('hidden');
//   body.classList.add('.modal-open');
// });

BigPictureCancelButton.addEventListener('click', () => {
  bigPictureWindow.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPictureWindow.classList.add('hidden');
  }
});
bigPictureWindow.classList.remove('hidden');
