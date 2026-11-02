import { uploadFormElement, uploadFormPreviewImageElement } from './elements.js';
import { uploadFormInputElement } from './form.js';


const FILE_TYPES = [ '.jpg', '.jpeg', '.png' ];
const DEFAULT_PREVIEW_SRC = uploadFormPreviewImageElement.getAttribute('src');

let previewImageUrl = null;

const effectsPreviewElements = uploadFormElement.querySelectorAll('.effects__preview');


const createFile = () => {
  const file = uploadFormInputElement.files[ 0 ];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((typeName) => fileName.endsWith(typeName));

  if (matches) {
    previewImageUrl = URL.createObjectURL(file);
    uploadFormPreviewImageElement.src = previewImageUrl;

    effectsPreviewElements.forEach((effectsPreviewElement) => {
      effectsPreviewElement.style.backgroundImage = `url(${previewImageUrl})`;
    });
  }
};


const resetFile = () => {
  if (previewImageUrl) {
    URL.revokeObjectURL(previewImageUrl);
    previewImageUrl = null;
  }
  uploadFormPreviewImageElement.src = DEFAULT_PREVIEW_SRC;

  effectsPreviewElements.forEach((effectsPreviewElement) => {
    effectsPreviewElement.style.backgroundImage = '';
  });
};


export { createFile, resetFile };
