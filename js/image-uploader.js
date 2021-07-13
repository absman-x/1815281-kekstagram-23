import {showAlert, isEscEvent} from './utils.js';
import {sendData} from './server-api.js';

const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
const MAX_COMMENT_SYMBOLS = 140;
const FILTERS = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};
const body = document.body;
const imageUploadForm = document.querySelector('.img-upload__form');
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
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
const loadTemplate = document.querySelector('#messages').content;
const errorTemplate = document.querySelector('#error').content;
const errorButton = errorTemplate.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content;
const successButton = successTemplate.querySelector('.success__button');

const chromeEffect = {
  name: FILTERS.CHROME,
  filterType: 'grayscale',
  minValue: 0,
  maxValue: 1,
  step: 0.1,
  valueType: '',
};

const sepiaEffect = {
  name: FILTERS.SEPIA,
  filterType: 'sepia',
  minValue: 0,
  maxValue: 1,
  step: 0.1,
  valueType: '',
};

const marvinEffect = {
  name: FILTERS.MARVIN,
  filterType: 'invert',
  minValue: 0,
  maxValue: 100,
  step: 1,
  valueType: '%',
};

const phobosEffect = {
  name: FILTERS.PHOBOS,
  filterType: 'blur',
  minValue: 0,
  maxValue: 3,
  step: 0.1,
  valueType: 'px',
};

const heatEffect = {
  name: FILTERS.HEAT,
  filterType: 'brightness',
  minValue: 1,
  maxValue: 3,
  step: 0.1,
  valueType: '',
};

const initImageUploader = () => {
  const formUploadToggle = () => {
    imageUploadOverlay.classList.toggle('hidden');
    body.classList.toggle('modal-open');
  };

  let imageScaleValue = 100;

  const escEvent = (evt) => {
    if ((isEscEvent) && ((evt.target.nodeName === 'BODY') || (evt.target.matches('input[type="radio"]')) || (evt.target.matches('input[type="file"]')))) {
      evt.preventDefault();
      closeImageForm();
    }
  };

  const setScale = (scaleData) => {
    imageUpload.style.transform = `scale(${scaleData / 100})`;
    scaleTextValue.value = `${scaleData}%`;
  };

  const scaleBigger = () => {
    if (imageScaleValue < 100) {
      imageScaleValue += 25;
      setScale(imageScaleValue);
    }
  };

  const scaleSmaller = () => {
    if (imageScaleValue > 25) {
      imageScaleValue -= 25;
      setScale(imageScaleValue);
    }
  };

  const applyFilter = (effect) => {
    clearFilter();
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
    imageUploadForm.reset();
    effectsValue.value = '';
    hashtagsTextInput.value = '';
    commentsTextInput.value = '';
    imageUpload.classList.remove('scale');
    scaleSmallerButton.removeEventListener('click', scaleSmaller);
    scaleBiggerButton.removeEventListener('click', scaleBigger);
    effectsSlider.noUiSlider.destroy();
    clearFilter();
    formUploadToggle();
    console.log('form closed');
  }

  function clearFilter() {
    for (const className of imageUpload.classList) {
      if (className.startsWith('effects__preview--')) {
        imageUpload.classList.remove(className);
      }
    }
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

  function messageFormRemove () {
    console.log('form remover');
    document.body.lastElementChild.remove();
    errorButton.removeEventListener('click', messageFormRemove);
    successButton.removeEventListener('click', messageFormRemove);
  }

  const successPopup = () => {
    document.body.lastElementChild.remove();
    document.body.append(successTemplate);
    successButton.addEventListener('click', messageFormRemove);
  };

  const errorPopup = () => {
    document.body.lastElementChild.remove();
    document.body.append(errorTemplate);
    errorButton.addEventListener('click', messageFormRemove);
  };

  if (imageUploadForm) {
    imageUploadForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      document.body.append(loadTemplate);
      sendData(
        () => successPopup(),
        () => errorPopup(),
        new FormData(evt.target),
      );
      closeImageForm();
    });
  }

  let selectedEffect = '';
  effectsButtons.addEventListener('click', (evt) => {
    const clickedEffect = evt.target.value;
    if (evt.target.matches('input[type="radio"]') && clickedEffect !== selectedEffect) {
      switch (clickedEffect) {
        case (FILTERS.CHROME):
          applyFilter(chromeEffect);
          selectedEffect = clickedEffect;
          break;
        case (FILTERS.SEPIA):
          applyFilter(sepiaEffect);
          selectedEffect = clickedEffect;
          break;
        case (FILTERS.MARVIN):
          applyFilter(marvinEffect);
          selectedEffect = clickedEffect;
          break;
        case (FILTERS.PHOBOS):
          applyFilter(phobosEffect);
          selectedEffect = clickedEffect;
          break;
        case (FILTERS.HEAT):
          applyFilter(heatEffect);
          selectedEffect = clickedEffect;
          break;
        default:
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
