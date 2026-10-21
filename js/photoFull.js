import { renderComments } from './commentsRender.js';
import { isEscapeKey } from './utils.js';


let lastFocusedElement = null;
const photoFullPopupElement = document.querySelector('.big-picture');
const photoFullCloseElement = photoFullPopupElement.querySelector('.big-picture__cancel');


const openPopup = function () {
  photoFullPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoFullEscape);
};


const closePopup = function () {
  photoFullPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoFullEscape);

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
};

function onPhotoFullEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}


photoFullCloseElement.addEventListener('click', closePopup);


const renderPhotoFull = function ({ url, description, likes }) {
  const photoFullPopupImgElement = photoFullPopupElement.querySelector('img');
  photoFullPopupImgElement.src = url;
  photoFullPopupImgElement.alt = description;
  photoFullPopupElement.querySelector('.likes-count').textContent = likes;
  photoFullPopupElement.querySelector('.social__caption').textContent = description;
};


const onPhotoThumbnailClick = function (evt, photo) {
  evt.preventDefault();
  lastFocusedElement = evt.currentTarget;
  renderPhotoFull(photo);
  renderComments(photo.comments, true);
  openPopup();
  photoFullCloseElement.focus();
};


export { onPhotoThumbnailClick };
