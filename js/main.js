const PHOTO_COUNT = { MIN: 1, MAX: 25 };
const LIKE_COUNT = { MIN: 15, MAX: 200 };
const AVATAR_COUNT = { MIN: 1, MAX: 6 };
const COMMENT_COUNT = { MIN: 0, MAX: 30 };

const DESCRIPTIONS = [
  'Солнечная тропинка в лесу',
  'Чашка кофе на деревянном столе',
  'Старые окна с каплями дождя',
  'Закат над спокойным морем',
  'Велосипед у деревянного забора',
  'Уютный плед на кресле',
  'Ночной город с высоты',
  'Руки держат букет цветов',
  'Кот спит на подоконнике',
  'Горные вершины в тумане'
];


const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Анна',
  'Мария',
  'Александр',
  'Дмитрий',
  'Екатерина',
  'Михаил',
  'Анастасия',
  'Иван',
  'Елена',
  'Сергей',
];

const getRandomInteger = function (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createId = function () {
  let previousValues = 1;

  return function () {
    return previousValues++;
  };
};


const generatePhotoId = createId();

const generateCommentId = createId();

const getRandomArrayElement = function (elements, count = 1) {
  let randomElements = '';

  for (let i = 0; i < count; i++) {
    randomElements += `${elements[ getRandomInteger(0, elements.length - 1) ]} `;
  }

  return randomElements.trimEnd();
};

const createComment = function (id) {
  return {
    id,
    avatar: `img/avatar-${getRandomInteger(AVATAR_COUNT.MIN, AVATAR_COUNT.MAX)}.svg`,
    message: getRandomArrayElement(MESSAGES, getRandomInteger(1, 2)),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = function (id) {
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKE_COUNT.MIN, LIKE_COUNT.MAX),
    comments: Array.from({ length: getRandomInteger(COMMENT_COUNT.MIN, COMMENT_COUNT.MAX) }, () => createComment(generateCommentId()))
  };
};

const photos = Array.from({ length: PHOTO_COUNT.MAX }, () => createPhoto(generatePhotoId()));

window.console.log(photos);
