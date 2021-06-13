/*
Взял с https://html5css.ru/js/js_random.php
*/
function getRandomInteger (min, max) {
  if (min > max || min <0) {
    throw new Error ('Минимальное значение должно быть больше нуля и меньше максимального.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//const validLength = 140;

function validateLength(text, validLength) {
  return text.length <= validLength;
}

validateLength('тест', 140);

export {getRandomInteger, validateLength};
