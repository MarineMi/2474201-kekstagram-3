import { createPhotos } from './photos.js';
import { renderPhotoThumbnailList } from './photoThumbnails.js';
import './photoFull.js';


const photos = createPhotos();

renderPhotoThumbnailList(photos);
