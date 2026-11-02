import { photoFullPopupElement } from './elements.js';
import { renderComments } from './comments-render.js';
import { isEscapeKey } from './utils.js';


let lastFocusedElement = null;

const photoFullCloseElement = photoFullPopupElement.querySelector('.big-picture__cancel');
const photoFullImgElement = photoFullPopupElement.querySelector('img');
const photoFullLikesElement = photoFullPopupElement.querySelector('.likes-count');
const photoFullDescriptionElement = photoFullPopupElement.querySelector('.social__caption');


const openPopup = function () {
  photoFullPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};


const closePopup = function () {
  photoFullPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  lastFocusedElement.focus();
  lastFocusedElement = null;
};


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}


const onCloseButtonClick = function () {
  closePopup();
};


photoFullCloseElement.addEventListener('click', onCloseButtonClick);


const renderPhotoFull = function ({ url, description, likes }) {
  photoFullImgElement.src = url;
  photoFullImgElement.alt = description;
  photoFullLikesElement.textContent = likes;
  photoFullDescriptionElement.textContent = description;
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


export {
  onPhotoThumbnailClick
};
