import { photoFullPopupElement } from './elements.js';
import { renderComments } from './comments-render.js';
import { isEscapeKey } from './utils.js';


let lastFocusedElement = null;

const photoFullCloseElement = photoFullPopupElement.querySelector('.big-picture__cancel');
const photoFullImgElement = photoFullPopupElement.querySelector('img');
const photoFullLikesElement = photoFullPopupElement.querySelector('.likes-count');
const photoFullDescriptionElement = photoFullPopupElement.querySelector('.social__caption');


const openPopup = () => {
  photoFullPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};


const closePopup = () => {
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


const onCloseButtonClick = () => {
  closePopup();
};


photoFullCloseElement.addEventListener('click', onCloseButtonClick);


const renderPhotoFull = ({ url, description, likes }) => {
  photoFullImgElement.src = url;
  photoFullImgElement.alt = description;
  photoFullLikesElement.textContent = likes;
  photoFullDescriptionElement.textContent = description;
};


const openPhotoFull = (currentTarget, photo) => {
  const { comments } = photo;
  lastFocusedElement = currentTarget;
  renderPhotoFull(photo);
  renderComments(comments, true);
  openPopup();
  photoFullCloseElement.focus();
};


export {
  openPhotoFull
};
