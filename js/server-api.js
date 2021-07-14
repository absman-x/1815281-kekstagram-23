import {showAlert} from './utils.js';

const Url = {
  SERVER: 'https://23.javascript.pages.academy/kekstagram',
  DATA: 'https://23.javascript.pages.academy/kekstagram/data',
};

const getData = (onSuccess, onFail) => {
  fetch(Url.DATA)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((picturesData) => {
            onSuccess(picturesData);
          });
      } else {
        onFail();
      }
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные, повторите попытку позже');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.SERVER,
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

export {getData, sendData};
