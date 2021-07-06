import {isEscEvent} from './utils.js';

const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
const MAX_COMMENT_SYMBOLS = 140;
const body = document.body;
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const imageUploadForm = document.querySelector('.img-upload__overlay');
const formCancelButton = document.querySelector('.img-upload__cancel');
const hashtagsTextInput= document.querySelector('.text__hashtags');
const commentsTextInput = document.querySelector('.text__description');
const imageUpload = document.querySelector('.img-upload__preview');
const imageUploadPreview = imageUpload.querySelector('img');
const imageStyle = document.querySelectorAll('.effects__preview');
const hashtagsPattern = /^#[A-za-zА-Яа-я0-9]{1,19}$/;

const initImageUploader = () => {
  const formUploadToggle = () => {
    imageUploadForm.classList.toggle('hidden');
    body.classList.toggle('modal-open');
  };

  const escEvent = (evt) => {
    if ((isEscEvent) && ((evt.target.nodeName === 'BODY') || (evt.target.matches('input[type="radio"]')) || (evt.target.matches('input[type="file"]')))) {
      evt.preventDefault();
      closeImageForm();
    }
  };

  function closeImageForm() {
    formCancelButton.removeEventListener('click', closeImageForm);
    document.removeEventListener('keydown', escEvent);
    fileChooser.value = '';
    hashtagsTextInput.value = '';
    commentsTextInput.value = '';
    formUploadToggle();
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
              formUploadToggle();
              formCancelButton.addEventListener('click', closeImageForm);
              document.addEventListener('keydown', escEvent);
            }
          });
          reader.readAsDataURL(file);
        }
      }
    });
  }
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
