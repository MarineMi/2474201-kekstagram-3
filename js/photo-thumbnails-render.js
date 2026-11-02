import { openPhotoFull } from './photo-full.js';


const photoThumbnailContainerElement = document.querySelector('.pictures');
const photoThumbnailTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const renderPhotoThumbnail = (photo) => {
  const { url, description, likes, comments } = photo;
  const photoThumbnailElement = photoThumbnailTemplateElement.cloneNode(true);
  const photoThumbnailImgElement = photoThumbnailElement.querySelector('.picture__img');
  photoThumbnailImgElement.src = url;
  photoThumbnailImgElement.alt = description;
  photoThumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  photoThumbnailElement.querySelector('.picture__likes').textContent = likes;

  const onPhotoThumbnailClick = (evt) => {
    evt.preventDefault();
    openPhotoFull(evt.currentTarget, photo);
  };
  photoThumbnailElement.addEventListener('click', onPhotoThumbnailClick);
  return photoThumbnailElement;
};


const resetGallery = () => {
  photoThumbnailContainerElement.querySelectorAll('.picture').forEach((photoThumbnailElement) => photoThumbnailElement.remove());
};


const renderGallery = (photos) => {
  resetGallery();
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => fragment.append(renderPhotoThumbnail(photo)));
  photoThumbnailContainerElement.append(fragment);
};


export { renderGallery };
