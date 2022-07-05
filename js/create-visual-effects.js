const effectLevelSlider = document.querySelector('.effect-level__slider');
const uploadPhotoEditScreen = document.querySelector('.img-upload__overlay');
//const scaleControlValue = uploadPhotoEditScreen.querySelector('.scale__control--value');
const effectLevelValue = uploadPhotoEditScreen.querySelector('.effect-level__value');
const ImageUploadPreview = uploadPhotoEditScreen.querySelector('.img-upload__preview img');
const effectRadioToggles= uploadPhotoEditScreen.querySelectorAll('.effects__radio');

function getVisualEffect () {
  for (const effectRadioToggle of effectRadioToggles) {
    effectRadioToggle.addEventListener('change', () => {
      if (effectRadioToggle.value === 'chrome') {
        ImageUploadPreview.className = '';
        ImageUploadPreview.classList.add('effects__preview--chrome');
      } else if (effectRadioToggle.value === 'sepia') {
        ImageUploadPreview.className = '';
        ImageUploadPreview.classList.add('effects__preview--sepia');
      } else if (effectRadioToggle.value === 'marvin') {
        ImageUploadPreview.className = '';
        ImageUploadPreview.classList.add('effects__preview--marvin');
      } else if (effectRadioToggle.value === 'phobos') {
        ImageUploadPreview.className = '';
        ImageUploadPreview.classList.add('effects__preview--phobos');
      } else if (effectRadioToggle.value === 'heat') {
        ImageUploadPreview.classList.add('effects__preview--heat');
      } else if (effectRadioToggle.value === 'none') {
        ImageUploadPreview.className = '';
        ImageUploadPreview.classList.add('effects__preview--none');
      }
    });
  }
}
getVisualEffect();

noUiSlider.create(effectLevelSlider, {
  range: {
    min:0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
});
effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
});
