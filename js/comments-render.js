import { photoFullPopupElement } from './elements.js';

const COMMENT_SHOWN_STEP = 5;
let commentsShowCount = COMMENT_SHOWN_STEP;
let commentsCopy = [];


const commentsListElement = photoFullPopupElement.querySelector('.social__comments');
const commentTemplateElement = photoFullPopupElement.querySelector('.social__comment');
const commentTotalCountElement = photoFullPopupElement.querySelector('.social__comment-total-count');
const commentShowCountElement = photoFullPopupElement.querySelector('.social__comment-shown-count');
const commentsLoadMoreButtonElement = photoFullPopupElement.querySelector('.comments-loader');


const renderComment = function ({ avatar, name, message }) {
  const commentElement = commentTemplateElement.cloneNode(true);
  const commentImgElement = commentElement.querySelector('.social__picture');
  commentImgElement.src = avatar;
  commentImgElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};


const renderComments = function (comments, reset = false) {
  if (reset) {
    commentsShowCount = COMMENT_SHOWN_STEP;
    commentsCopy = comments.slice();
    commentsListElement.innerHTML = '';
  }

  const fragment = document.createDocumentFragment();

  const startIndex = reset ? 0 : commentsShowCount - COMMENT_SHOWN_STEP;

  commentsCopy
    .slice(startIndex, commentsShowCount)
    .forEach((comment) => fragment.appendChild(renderComment(comment)));

  commentsListElement.appendChild(fragment);

  commentTotalCountElement.textContent = commentsCopy.length;
  commentShowCountElement.textContent = Math.min(commentsShowCount, commentsCopy.length);

  commentsLoadMoreButtonElement.classList.toggle('hidden', commentsShowCount >= commentsCopy.length);
};


commentsLoadMoreButtonElement.addEventListener('click', () => {
  commentsShowCount += COMMENT_SHOWN_STEP;
  renderComments(commentsCopy, false);
});


export {
  renderComments
};
