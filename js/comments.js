import {
  COMMENT_COUNT,
  AVATAR_COUNT,
  MESSAGES,
  NAMES
} from './data.js';
import { getRandomInteger, createId, getRandomArrayElement } from './utils.js';

const createCommentId = createId();

const createComment = function (id) {
  return {
    id,
    avatar: `img/avatar-${getRandomInteger(AVATAR_COUNT.MIN, AVATAR_COUNT.MAX)}.svg`,
    message: getRandomArrayElement(MESSAGES, getRandomInteger(1, 2)),
    name: getRandomArrayElement(NAMES),
  };
};

const createComments = function () {
  return Array.from({ length: getRandomInteger(COMMENT_COUNT.MIN, COMMENT_COUNT.MAX) }, () => createComment(createCommentId()));
};

export { createComments };
