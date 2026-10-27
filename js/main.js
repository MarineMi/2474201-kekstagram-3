import { createPhotos } from './photos.js';
import { renderPhotoThumbnailList } from './photoThumbnails.js';
import './imgUploadForm.js';

const photos = createPhotos();

renderPhotoThumbnailList(photos);
