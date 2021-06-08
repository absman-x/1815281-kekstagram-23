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

function getFakeUsers () {
  const fakeUsers = 25;
  const maxComments = 3;
  const fakeUsersArray = [];
  const messageVariants = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const nameVariants = ['Дмитрий', 'Анатолий', 'Рушат', 'Андрей', 'Ольга', 'Евгений', 'Наталья', 'Вячеслав', 'Альфия'];
  const descriptionFirstPart = ['Просто ', 'Супер ', 'Это ', 'А вот '];
  const descriptionSecondPart = ['фотка', 'фото', 'картинка', 'пикча'];
  const totallyRandomArray = [];

  function isInArray(array, element) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return true;
      } else {
        return false;
      }
    }
  }

  function getUniqueRandomId(array) {
    const randomId = getRandomInteger(1, fakeUsers * maxComments);
    if (!isInArray(totallyRandomArray, randomId)) {
      totallyRandomArray.push(randomId);
      return randomId;
    }
    return getUniqueRandomId(array);
  }

  function getRandomComment() {
    const commentArray = [];
    for (let j = 1; j <= getRandomInteger(1, 3); j++) {
      const comment = {};
      comment.id = getUniqueRandomId(totallyRandomArray);
      comment.avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
      comment.message = messageVariants[getRandomInteger(0, messageVariants.length - 1)];
      comment.name = nameVariants[getRandomInteger(0, nameVariants.length - 1)];
      commentArray.push(comment);
    }
    return commentArray;
  }

  for (let i = 1; i <= fakeUsers; i++) {
    const currentFakeUser = {};
    currentFakeUser.id = i;
    currentFakeUser.url = `photos/${i}.jpg`;
    currentFakeUser.description = `${descriptionFirstPart[getRandomInteger(0, descriptionFirstPart.length - 1)]}${descriptionSecondPart[getRandomInteger(0, descriptionSecondPart.length - 1)]}`;
    currentFakeUser.likes = getRandomInteger(15, 200);
    currentFakeUser.comments = getRandomComment();
    fakeUsersArray.push(currentFakeUser);
  }
  return fakeUsersArray;
}

getFakeUsers();
