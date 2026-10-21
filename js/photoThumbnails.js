import { onPhotoThumbnailClick } from './photoFull.js';


const photoThumbnailContainerElement = document.querySelector('.pictures');
const photoThumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const renderPhotoThumbnail = function (photo) {
  const { url, description, likes, comments } = photo;
  const photoThumbnailElement = photoThumbnailTemplate.cloneNode(true);
  const photoThumbnailImgElement = photoThumbnailElement.querySelector('.picture__img');
  photoThumbnailImgElement.src = url;
  photoThumbnailImgElement.alt = description;
  photoThumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  photoThumbnailElement.querySelector('.picture__likes').textContent = likes;
  photoThumbnailElement.addEventListener('click', (evt) => onPhotoThumbnailClick(evt, photo));
  return photoThumbnailElement;
};


const renderPhotoThumbnailList = function (photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => fragment.append(renderPhotoThumbnail(photo)));
  photoThumbnailContainerElement.append(fragment);
};


export { renderPhotoThumbnailList };
