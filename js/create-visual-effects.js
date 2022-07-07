const effectLevelSlider = document.querySelector('.effect-level__slider');
const uploadPhotoEditScreen = document.querySelector('.img-upload__overlay');
const effectLevelValue = uploadPhotoEditScreen.querySelector('.effect-level__value');
const imageUploadPreview = uploadPhotoEditScreen.querySelector('.img-upload__preview img');
const effectRadioToggles= uploadPhotoEditScreen.querySelectorAll('.effects__radio');
const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = uploadPhotoEditScreen.querySelector('.scale__control--value');

//дефолтные настройки масштаба изображения
const scaleControl = {
  step: 25,
  maxValue: 100,
  minValue: 25,
  defaultValue: 100
};

const scaleControlDefaultValue =`${scaleControl.defaultValue}%`;

//функция для переключения фильтров по выбору радиокнопки
function getVisualEffect () {
  imageUploadPreview.removeAttribute('style');
}
for (const effectRadioToggle of effectRadioToggles) {
  effectRadioToggle.addEventListener('change', () => {
    scaleControlValue.value = scaleControlDefaultValue;
    imageUploadPreview.className = '';
    imageUploadPreview.classList.add(`effects__preview--${effectRadioToggle.value}`);
    if (effectRadioToggle.value === 'none') {
      imageUploadPreview.className = '';
    }
  });
}

//передаем значение фильтра в атрибут стиля инлайн в превью фото с нужным классом
const getEffectLevel = () => {
  if (imageUploadPreview.className === 'effects__preview--chrome') {
    imageUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  } else if (imageUploadPreview.className === 'effects__preview--marvin') {
    imageUploadPreview.style.filter = `invert(${effectLevelValue.value})%`;
  } else if (imageUploadPreview.className === 'effects__preview--sepia') {
    imageUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
  } else if (imageUploadPreview.className === 'effects__preview--phobos') {
    imageUploadPreview.style.filter = `blur(${effectLevelValue.value})px`;
  } else if (imageUploadPreview.className === 'effects__preview--heat') {
    imageUploadPreview.style.filter = `heat(${effectLevelValue.value})`;
  }
};

//создаем дефолтные настройски для слайдера, настраиваем его на события изменения input меняющего глубину эффекта
const initNoUiSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min:0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    getEffectLevel();
  });
};


//функция меняющая настройки слайдера в зависимости от нажатой радиокнопки с визуальным эффектом
const InitVisualEffectsChange = () => {
  effectLevelSlider.classList.add('hidden');
  for (let i=0; i< effectRadioToggles.length; i++) {
    effectRadioToggles[i].addEventListener('change', () => {
      if (effectRadioToggles[i].value === 'none') {
        effectLevelSlider.classList.add('hidden');
      } else {
        effectLevelSlider.classList.remove('hidden');
      }
      if (effectRadioToggles[i].value === 'chrome' || effectRadioToggles[i].value === 'sepia') {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1
        });
      } else if (effectRadioToggles[i].value === 'marvin') {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100
          },
          start: 100,
          step: 1
        });
      } else if (effectRadioToggles[i].value === 'heat') {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3
          },
          start: 3,
          step: 0.1
        });
      } else if (effectRadioToggles[i].value === 'phobos') {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3
          },
          start: 3,
          step: 0.1
        });
      } else if (effectRadioToggles[i].value === 'none') {
        imageUploadPreview.removeAttribute('style');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 100,
            max: 100
          },
          start: 100
        });
      }
    });
  }
};

const InitImageVisualEffects = () => {
  effectLevelSlider.classList.add('hidden');
  getVisualEffect();
  initNoUiSlider();
  InitVisualEffectsChange();
};

InitImageVisualEffects();
