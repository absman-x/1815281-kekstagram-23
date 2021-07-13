const Url = {
  SERVER: 'https://23.javascript.pages.academy/kekstagram',
  DATA: 'https://23.javascript.pages.academy/kekstagram/data',
};

const getData = (onSuccess) => {
  fetch(Url.DATA)
    .then((response) => response.json())
    .then((picturesData) => {
      onSuccess(picturesData);
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
        console.log('success!');
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
        console.log(response);
      }
    })
    .catch((e) => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
      console.log(e);
    });
};

export {getData, sendData};
