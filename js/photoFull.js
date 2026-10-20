import { renderComments, loadMoreComments, COMMENT_SHOWN_STEP } from './commentsRender.js';


let lastFocusedElement = null;
const photoFullPopupElement = document.querySelector('.big-picture');
const photoFullCloseElement = photoFullPopupElement.querySelector('.big-picture__cancel');


const renderPhotoFull = function ({ url, description, likes, comments }) {
  const photoFullPopupImgElement = photoFullPopupElement.querySelector('img');
  photoFullPopupImgElement.src = url;
  photoFullPopupImgElement.alt = description;
  photoFullPopupElement.querySelector('.likes-count').textContent = likes;
  photoFullPopupElement.querySelector('.social__comment-total-count').textContent = comments.length;
  photoFullPopupElement.querySelector('.social__comment-shown-count').textContent = Math.min(COMMENT_SHOWN_STEP, comments.length);
  photoFullPopupElement.querySelector('.social__caption').textContent = description;
};


const onPhotoThumbnailClick = function (evt, photo) {
  evt.preventDefault();
  const { url, description, likes, comments } = photo;

  renderPhotoFull({ url, description, likes, comments });
  renderComments(comments.slice(0, Math.min(COMMENT_SHOWN_STEP, comments.length)));
  loadMoreComments(comments);
  photoFullPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  photoFullCloseElement.focus();
  lastFocusedElement = evt.currentTarget;
};


const onPhotoFullClose = function () {
  photoFullPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
};


photoFullCloseElement.addEventListener('click', () => onPhotoFullClose());


photoFullPopupElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onPhotoFullClose();
  }
});


export { onPhotoThumbnailClick };
