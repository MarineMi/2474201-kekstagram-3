import { uploadFormElement, uploadFormHashtagsElement, uploadFormDescriptionElement } from './elements.js';
import { sendData } from './api.js';
import { isEscapeKey } from './utils.js';
import { isValid, resetValidation } from './form-validation.js';
import { resetScale } from './form-scale.js';
import { resetFilter } from './form-effects.js';
import { createFile, resetFile } from './form-preview.js';


const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};


const uploadFormInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadFormOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadFormCloseElement = uploadFormElement.querySelector('.img-upload__cancel');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');


const openPopup = function () {
  uploadFormOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};


const closePopup = function () {
  uploadFormOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.reset();
  resetValidation();
  resetScale();
  resetFilter();
  resetFile();
};


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}


uploadFormInputElement.addEventListener('change', () => {
  openPopup();
  createFile();
});


uploadFormCloseElement.addEventListener('click', () => {
  closePopup();
});


uploadFormHashtagsElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});


uploadFormDescriptionElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});


const setSubmitButtonState = function (isSending) {
  submitButtonElement.disabled = isSending;
  submitButtonElement.textContent = isSending
    ? SubmitButtonText.SENDING
    : SubmitButtonText.IDLE;
};


const setUploadFormSubmit = function (onSuccess) {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isValid()) {
      setSubmitButtonState(true);

      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(() => { })
        .finally(() => setSubmitButtonState(false));
    }
  });
};

export {
  uploadFormInputElement,
  setUploadFormSubmit,
  closePopup
};
