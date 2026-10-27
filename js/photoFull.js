import { renderComments } from './commentsRender.js';
import { isEscapeKey } from './utils.js';


let lastFocusedElement = null;
const photoFullPopupElement = document.querySelector('.big-picture');
const photoFullCloseElement = photoFullPopupElement.querySelector('.big-picture__cancel');


const openPopup = function () {
  photoFullPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};


const closePopup = function () {
  photoFullPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
};


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}


const renderPhotoFull = function ({ url, description, likes }) {
  const photoFullPopupImgElement = photoFullPopupElement.querySelector('img');
  photoFullPopupImgElement.src = url;
  photoFullPopupImgElement.alt = description;
  photoFullPopupElement.querySelector('.likes-count').textContent = likes;
  photoFullPopupElement.querySelector('.social__caption').textContent = description;
};


const onPhotoThumbnailClick = function (evt, photo) {
  evt.preventDefault();
  const { comments } = photo;
  lastFocusedElement = evt.currentTarget;
  renderPhotoFull(photo);
  renderComments(comments, true);
  openPopup();
  photoFullCloseElement.focus();
};


photoFullCloseElement.addEventListener('click', closePopup);


export { onPhotoThumbnailClick };
