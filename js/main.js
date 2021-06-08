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
  const fakeUsers = [];
  const messageVariants = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const nameVariants = ['Дмитрий', 'Анатолий', 'Рушат', 'Андрей', 'Ольга', 'Евгений', 'Наталья'];
  const descriptionFirstPart = ['Просто ', 'Супер ', 'Это '];
  const descriptionSecondPart = ['фотка', 'фото', 'картинка'];
  const totallyRandomArray = [];

  function isInArray(array, el) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === el) {
        return true;
      } else {
        return false;
      }
    }
  }

  function getUniqueRandomId(array) {
    const randomId = getRandomInteger(1, 100);
    if (!isInArray(totallyRandomArray, randomId)) {
      totallyRandomArray.push(randomId);
      return randomId;
    }
    return getUniqueRandomId(array);
  }

  function getRandomComment() {
    const comment = {};
    comment.id = getUniqueRandomId(totallyRandomArray);
    comment.avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    comment.message = messageVariants[getRandomInteger(0, messageVariants.length - 1)];
    comment.name = nameVariants[getRandomInteger(0, nameVariants.length - 1)];
    return comment;
  }

  for (let i = 1; i <= 25; i++) {
    const currentFakeUser = {};
    currentFakeUser.id = i;
    currentFakeUser.url = `photos/${i}.jpg`;
    currentFakeUser.description = `${descriptionFirstPart[getRandomInteger(0, descriptionFirstPart.length - 1)]}${descriptionSecondPart[getRandomInteger(0, descriptionSecondPart.length - 1)]}`;
    currentFakeUser.likes = getRandomInteger(15, 200);
    currentFakeUser.comments = getRandomComment();
    fakeUsers.push(currentFakeUser);
  }
  return fakeUsers;
}

getFakeUsers();
