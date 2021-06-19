import {getRandomInteger, getRandomElementFromArray} from './utils.js';

const COUNT_MOCK_USERS = 25;
const MAX_COMMENTS = 3;
const MESSAGE_VARIANTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAME_VARIANTS = ['Дмитрий', 'Анатолий', 'Рушат', 'Андрей', 'Ольга', 'Евгений', 'Наталья', 'Вячеслав', 'Альфия'];
const DESCRIPTION_FIRST_PARTS = ['Просто ', 'Супер ', 'Это ', 'А вот '];
const DESCRIPTION_SECOND_PARTS = ['фотка', 'фото', 'картинка', 'пикча'];

const getUsers = () => {
  const totallyRandomArray = [];
  const users = [];
  const getUniqueRandomId = (array) => {
    const randomId = getRandomInteger(1, COUNT_MOCK_USERS * MAX_COMMENTS);
    if (!totallyRandomArray.includes(randomId)) {
      totallyRandomArray.push(randomId);
      return randomId;
    }
    return getUniqueRandomId(array);
  };

  const getRandomComments = () => {
    const comments = [];
    const totalCommentsCount = getRandomInteger(1, 3);
    for (let i = 1; i <= totalCommentsCount; i++) {
      const comment = {
        id: getUniqueRandomId(totallyRandomArray),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: getRandomElementFromArray(MESSAGE_VARIANTS),
        name: getRandomElementFromArray(NAME_VARIANTS),
      };
      comments.push(comment);
    }
    return comments;
  };

  for (let i = 1; i <= COUNT_MOCK_USERS; i++) {
    const currentUser = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `${getRandomElementFromArray(DESCRIPTION_FIRST_PARTS)}${getRandomElementFromArray(DESCRIPTION_SECOND_PARTS)}`,
      likes: getRandomInteger(15, 200),
      comments: getRandomComments(),
    };
    users.push(currentUser);
  }
  return users;
};

export {getUsers};
