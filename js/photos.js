import {
  PHOTO_COUNT,
  LIKE_COUNT,
  DESCRIPTIONS,
} from './data.js';
import { getRandomInteger, createId, getRandomArrayElement } from './utils.js';
import { createComments } from './comments.js';

const createPhotoId = createId();

const createPhoto = function (id) {
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKE_COUNT.MIN, LIKE_COUNT.MAX),
    comments: createComments()
  };
};

const createPhotos = function () {
  return Array.from({ length: PHOTO_COUNT.MAX }, () => createPhoto(createPhotoId()));
};

export { createPhotos };
