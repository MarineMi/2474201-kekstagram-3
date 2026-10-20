const COMMENT_SHOWN_STEP = 5;
const photoFullPopupElement = document.querySelector('.big-picture');
const commentsListElement = photoFullPopupElement.querySelector('.social__comments');
const commentTemplateElement = photoFullPopupElement.querySelector('.social__comment');
const commentsLoadMoreButtonElement = photoFullPopupElement.querySelector('.comments-loader');


const renderComments = function (comments) {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const { avatar, name, message } = comment;
    const commentElement = commentTemplateElement.cloneNode(true);
    const commentImgElement = commentElement.querySelector('.social__picture');
    commentImgElement.src = avatar;
    commentImgElement.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    fragment.appendChild(commentElement);
  });

  commentsListElement.innerHTML = '';
  commentsListElement.appendChild(fragment);
};


const loadMoreComments = function (comments) {
  let commentsShowCount = COMMENT_SHOWN_STEP;

  commentsLoadMoreButtonElement.addEventListener('click', () => {
    commentsShowCount += COMMENT_SHOWN_STEP;
    const commentsSlice = comments.slice(0, Math.min(commentsShowCount, comments.length));
    photoFullPopupElement.querySelector('.social__comment-shown-count').textContent = Math.min(commentsShowCount, comments.length);
    renderComments(commentsSlice);
  });
};


export { renderComments, loadMoreComments, COMMENT_SHOWN_STEP };
