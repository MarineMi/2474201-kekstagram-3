import { uploadFormElement, uploadFormPreviewImageElement } from './elements.js';
import { uploadFormInputElement} from './form.js';


const FILE_TYPES = [ 'jpg', 'jpeg', 'png' ];

let previewUrl = null;


const defaultPreviewSrc = uploadFormPreviewImageElement.getAttribute('src');
const effectsPreviewElements = uploadFormElement.querySelectorAll('.effects__preview');


const createFile = function () {
  const file = uploadFormInputElement.files[ 0 ];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((typeName) => fileName.endsWith(typeName));

  if (matches) {
    previewUrl = URL.createObjectURL(file);
    uploadFormPreviewImageElement.src = previewUrl;

    effectsPreviewElements.forEach((effectsPreviewElement) => {
      effectsPreviewElement.style.backgroundImage = `url(${previewUrl})`;
    });
  }
};


const resetFile = function () {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  uploadFormPreviewImageElement.src = defaultPreviewSrc;

  effectsPreviewElements.forEach((effectsPreviewElement) => {
    effectsPreviewElement.style.backgroundImage = '';
  });
};


export { createFile, resetFile };
