const PHOTO_COUNT = 25;
const LIKE_COUNT_MIN = 15;
const LIKE_COUNT_MAX = 200;
const AVATAR_COUNT_MAX = 6;
const COMMENT_COUNT = 30;

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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);

const generateCommentId = createRandomIdFromRangeGenerator(1, COMMENT_COUNT);

const getRandomArrayElement = (elements, count = 1) => {
  let randomElements = '';
  for (let i = 0; i < count; i++) {
    randomElements += `${elements[ getRandomInteger(0, elements.length - 1) ]} `;
  }
  return randomElements.trimEnd();
};

const createComment = (id) => ({
  id,
  avatar: `img/avatar${getRandomInteger(1, AVATAR_COUNT_MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES, getRandomInteger(1, 2)),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
  comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, () => createComment(generateCommentId()))
});

const photos = Array.from({ length: PHOTO_COUNT }, () => createPhoto(generatePhotoId()));

window.console.log(photos);
