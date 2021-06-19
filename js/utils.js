/*
Взял с https://html5css.ru/js/js_random.php
*/
const getRandomInteger = (min, max) => {
  if (min > max || min <0) {
    throw new Error ('Минимальное значение должно быть больше нуля и меньше максимального.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const validateLength = (text, validLength) => text.length <= validLength;

const getRandomElementFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

export {getRandomInteger, validateLength, getRandomElementFromArray};
