import {isEscEvent} from './utils.js';

const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
const MAX_COMMENT_SYMBOLS = 140;
const body = document.body;
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const imageUploadForm = document.querySelector('.img-upload__overlay');
const formCancelButton = document.querySelector('.img-upload__cancel');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleTextValue = document.querySelector('.scale__control--value');
const effectsForm = document.querySelector('.img-upload__effect-level');
const effectsSlider = document.querySelector('.effect-level__slider');
const effectsButtons = document.querySelector('.img-upload__effects');
const effectsValue = effectsForm.querySelector('.effect-level__value');
const hashtagsTextInput= document.querySelector('.text__hashtags');
const commentsTextInput = document.querySelector('.text__description');
const imageUpload = document.querySelector('.img-upload__preview');
const imageUploadPreview = imageUpload.querySelector('img');
const imageStyle = document.querySelectorAll('.effects__preview');
const hashtagsPattern = /^#[A-za-zА-Яа-я0-9]{1,19}$/;

const chromeEffect = {
  name: 'chrome',
  filterType: 'grayscale',
  minValue: 0,
  maxValue: 1,
  step: 0.1,
  valueType: '',
};

const sepiaEffect = {
  name: 'sepia',
  filterType: 'sepia',
  minValue: 0,
  maxValue: 1,
  step: 0.1,
  valueType: '',
};

const marvinEffect = {
  name: 'marvin',
  filterType: 'invert',
  minValue: 0,
  maxValue: 100,
  step: 1,
  valueType: '%',
};

const phobosEffect = {
  name: 'phobos',
  filterType: 'blur',
  minValue: 0,
  maxValue: 3,
  step: 0.1,
  valueType: 'px',
};

const heatEffect = {
  name: 'heat',
  filterType: 'brightness',
  minValue: 1,
  maxValue: 3,
  step: 0.1,
  valueType: '',
};

const initImageUploader = () => {
  const formUploadToggle = () => {
    imageUploadForm.classList.toggle('hidden');
    body.classList.toggle('modal-open');
  };

  let imageScaleValue = 100;

  const escEvent = (evt) => {
    if ((isEscEvent) && ((evt.target.nodeName === 'BODY') || (evt.target.matches('input[type="radio"]')) || (evt.target.matches('input[type="file"]')))) {
      evt.preventDefault();
      closeImageForm();
    }
  };

  const imageTransform = (scaleData) => {
    imageUpload.style.transform = `scale(${scaleData / 100})`;
    scaleTextValue.value = `${scaleData}%`;
  };

  const scaleBigger = () => {
    if (imageScaleValue < 100) {
      imageScaleValue += 25;
      imageTransform(imageScaleValue);
    }
  };

  const scaleSmaller = () => {
    if (imageScaleValue > 25) {
      imageScaleValue -= 25;
      imageTransform(imageScaleValue);
    }
  };

  const applyFilter = (effect) => {
    effectsForm.classList.remove('hidden');
    imageUpload.classList.add(`effects__preview--${effect.name}`);
    effectsSlider.noUiSlider.updateOptions({
      range: {
        min: effect.minValue,
        max: effect.maxValue,
      },
      start: effect.maxValue,
      step: effect.step,
    });
    effectsSlider.noUiSlider.on('update', (values, handle) => {
      const filterValue = values[handle];
      effectsValue.value = filterValue;
      imageUpload.style.filter = `${effect.filterType}(${filterValue}${effect.valueType})`;
    });
  };

  function closeImageForm() {
    imageScaleValue = 100;
    formCancelButton.removeEventListener('click', closeImageForm);
    document.removeEventListener('keydown', escEvent);
    fileChooser.value = '';
    hashtagsTextInput.value = '';
    commentsTextInput.value = '';
    imageUpload.classList.remove('scale');
    scaleSmallerButton.removeEventListener('click', scaleSmaller);
    scaleBiggerButton.removeEventListener('click', scaleBigger);
    effectsSlider.noUiSlider.destroy();
    clearFilter();
    formUploadToggle();
  }

  function clearFilter() {
    const regx = new RegExp('\\beffects__preview--[^ ]*[ ]?\\b', 'g');
    imageUpload.className = imageUpload.className.replace(regx, '');
    imageUpload.style.filter = '';
  }

  if (fileChooser) {
    fileChooser.setAttribute('accept', FILE_TYPES);
    fileChooser.addEventListener('change', () => {
      const file = fileChooser.files[0];
      if (fileChooser.files.length) {
        const fileName = file.name.toLowerCase();
        const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
        if (matches) {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            if (imageUploadPreview) {
              imageUploadPreview.src = reader.result;
              imageStyle.forEach((it) => (it.style.backgroundImage = `url(${reader.result})`));
              imageUpload.classList.add('scale');
              imageUpload.style.transform = `scale(${imageScaleValue / 100})`;
              formUploadToggle();
              scaleTextValue.value = `${imageScaleValue}%`;
              formCancelButton.addEventListener('click', closeImageForm);
              document.addEventListener('keydown', escEvent);
              effectsForm.classList.add('hidden');
              noUiSlider.create(effectsSlider, {
                step: 1,
                range: {
                  min: 0,
                  max: 100,
                },
                connect: 'lower',
                start: 100,
                format: {
                  to: function (value) {
                    if (Number.isInteger(value)) {
                      return value.toFixed(0);
                    }
                    return value.toFixed(1);
                  },
                  from: function (value) {
                    return parseFloat(value);
                  },
                },
              });
              scaleSmallerButton.addEventListener('click', scaleSmaller);
              scaleBiggerButton.addEventListener('click', scaleBigger);
            }
          });
          reader.readAsDataURL(file);
        }
      }
    });
  }

  let selectedEffect = '';
  effectsButtons.addEventListener('click', (evt) => {
    const clickedEffect = evt.target.value;
    if (evt.target.matches('input[type="radio"]') && clickedEffect !== selectedEffect) {
      if (clickedEffect === 'chrome') {
        applyFilter(chromeEffect);
        selectedEffect = 'chrome';
      } else if (clickedEffect === 'sepia') {
        applyFilter(sepiaEffect);
        selectedEffect = 'sepia';
      } else if (clickedEffect === 'marvin') {
        applyFilter(marvinEffect);
        selectedEffect = 'marvin';
      } else if (clickedEffect === 'phobos') {
        applyFilter(phobosEffect);
        selectedEffect = 'phobos';
      } else if (clickedEffect === 'heat') {
        applyFilter(heatEffect);
        selectedEffect = 'heat';
      } else {
        effectsForm.classList.add('hidden');
        selectedEffect = 'none';
        clearFilter();
      }
    }
  });

  commentsTextInput.addEventListener('input', () => {
    const valueLength = commentsTextInput.value.length;
    if (valueLength > MAX_COMMENT_SYMBOLS) {
      commentsTextInput.setCustomValidity(`140 символов максимум. Удалите лишние ${valueLength - MAX_COMMENT_SYMBOLS} симв.`);
      commentsTextInput.reportValidity();
    } else {
      commentsTextInput.setCustomValidity('');
    }
  });

  hashtagsTextInput.addEventListener('input', () => {
    const hashtagsAll = hashtagsTextInput.value.split(' ').filter((text) => text);
    if (hashtagsAll.length > 5) {
      hashtagsTextInput.setCustomValidity('5 хэштэгов максимум');
      hashtagsTextInput.reportValidity();
    } else {
      const hasNotTag = hashtagsAll.some((tag) => !hashtagsPattern.test(tag));
      const hasDuplicates = (new Set(hashtagsAll)).size !== hashtagsAll.length;
      if (!hasNotTag) {
        hashtagsTextInput.setCustomValidity('');
        if (hasDuplicates) {
          hashtagsTextInput.setCustomValidity('Одинаковые хэштеги не разрешены');
          hashtagsTextInput.reportValidity();
        }
      } else {
        hashtagsTextInput.setCustomValidity('Хэштег начинается с #, не пустой и не более 20 букв/цифр');
        hashtagsTextInput.reportValidity();
      }
    }
  });
};

export {initImageUploader};
