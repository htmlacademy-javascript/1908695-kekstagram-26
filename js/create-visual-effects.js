const effectLevelSlider = document.querySelector('.effect-level__slider');
const uploadPhotoEditScreen = document.querySelector('.img-upload__overlay');
const effectLevelValue = uploadPhotoEditScreen.querySelector('.effect-level__value');
const imageUploadPreview = uploadPhotoEditScreen.querySelector('.img-upload__preview img');
const scaleControlSmaller = uploadPhotoEditScreen.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadPhotoEditScreen.querySelector('.scale__control--bigger');
const scaleControlValue = uploadPhotoEditScreen.querySelector('.scale__control--value');
const effectList = uploadPhotoEditScreen.querySelector('.effects__list');

//дефолтные настройки масштаба изображения
const scaleControl = {
  step: 25,
  maxValue: 100,
  minValue: 25,
  defaultValue: 100
};

const scaleControlDefaultValue =`${scaleControl.defaultValue}%`;
//функция для уменьшения масштаба изображения
const decreaseScaleValue = () => {
  if (parseInt(scaleControlValue.value, 10) > scaleControl.minValue) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - scaleControl.step}%`;
    imageUploadPreview.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
  }
};

//функция для увеличения масштаба изображения
const increaseScaleValue = () => {
  if (parseInt(scaleControlValue.value, 10) < scaleControl.maxValue) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + scaleControl.step}%`;
    imageUploadPreview.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
  }

  if (parseInt(scaleControlValue.value, 10) === scaleControl.maxValue) {
    scaleControlValue.value = `${scaleControl.maxValue}%`;
    imageUploadPreview.removeAttribute('style');
  }
};
//функция для инициализации масштабирования изображения
const initImageScaling = () => {
  if (parseInt(scaleControlValue.value, 10) === scaleControl.maxValue) {
    imageUploadPreview.removeAttribute('style');
  } else {
    imageUploadPreview.style.transform = `scale(${scaleControl.defaultValue/100})`;
  }
  scaleControlSmaller.addEventListener('click', decreaseScaleValue);
  scaleControlBigger.addEventListener('click', increaseScaleValue);
};

//функция для снятия обработчиков по масштабированию изображения после его закрытия
const destroyImageScaling = () => {
  scaleControlSmaller.removeEventListener('click', decreaseScaleValue);
  scaleControlBigger.removeEventListener('click', increaseScaleValue);
  imageUploadPreview.removeAttribute('style');
};

//функция для переключения фильтров по выбору радиокнопки
const effectListToggle = (evt) => {
  imageUploadPreview.removeAttribute('style');
  if (evt.target.matches('input[type="radio"]')) {
    imageUploadPreview.className = '';
    imageUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
    scaleControlValue.value = scaleControlDefaultValue;
    if (evt.target.value === 'none') {
      imageUploadPreview.className = '';
    }
  }
};

//передаем значение фильтра в атрибут стиля инлайн в превью фото с нужным классом
const getEffectValue = () => {
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

//инициализируем слайдер
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
    getEffectValue();
  });
};

//функция меняющая настройки слайдера в зависимости от нажатой радиокнопки с визуальным эффектом
const initVisualEffectsChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {

    if (imageUploadPreview.className === '') {
      effectLevelSlider.classList.add('hidden');
    } else {
      effectLevelSlider.classList.remove('hidden');
    }

    if (evt.target.value === 'effects__preview--chrome' || evt.target.value === 'sepia') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
    } else if (evt.target.value === 'marvin') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
    } else if (evt.target.value === 'heat') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
    } else if (evt.target.value === 'phobos') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
    } else if (evt.target.value === '') {
      imageUploadPreview.removeAttribute('style');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 100,
          max: 100
        },
        start: 100
      });
    }
  }
};

const onSelectionEffectChange = (evt) => {
  initVisualEffectsChange(evt);
  effectListToggle(evt);
};

const InitImageVisualEffects = () => {
  effectLevelSlider.classList.add('hidden');
  scaleControlValue.value = scaleControlDefaultValue;
  initNoUiSlider();
  effectList.addEventListener('change', onSelectionEffectChange);
};


InitImageVisualEffects();
export {initImageScaling, destroyImageScaling};


