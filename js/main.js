/*
Взял с https://html5css.ru/js/js_random.php
*/
function returnRandomNumber (min, max) {
  if (min > max || min <0) {
    throw new Error ('Минимальное значение должно быть больше нуля и меньше максимального.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

returnRandomNumber (1, 5);

//const maxCommentLength = 140;

function checkLength (commentText, maxCommentLength) {
  if (commentText.length > maxCommentLength) {
    return false;
  }
  return true;
}

checkLength('тест', 140);
