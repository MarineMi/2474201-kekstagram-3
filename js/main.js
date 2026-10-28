import { createPhotos } from './photos.js';
import { renderPhotoThumbnailList } from './photoThumbnails.js';
import './imgUploadForm.js';
import './imgUploadScale.js';
import './imgUploadEffects.js';

const photos = createPhotos();

renderPhotoThumbnailList(photos);
