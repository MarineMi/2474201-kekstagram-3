import { getData } from './api.js';
import { renderGallery } from './photo-thumbnails-render.js';
import { setUploadFormSubmit, closePopup } from './form.js';
import './form-scale.js';
import './form-effects.js';
import { initFilters } from './photo-filters.js';


getData()
  .then((photos) => {
    renderGallery(photos);
    initFilters(photos);
  })
  .catch(() => { });


setUploadFormSubmit(closePopup);
