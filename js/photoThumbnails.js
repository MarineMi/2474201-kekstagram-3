import { getPhotos } from './photos.js';

/*
На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

Адрес изображения url подставьте как атрибут src изображения.
Описание изображения description подставьте в атрибут alt изображения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments.
Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

Подключите модуль в проект.
*/

const photoThumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoThumbnailList = document.querySelector('.pictures');
const photos = getPhotos();
const fragment = document.createDocumentFragment();

photos.forEach(({ url, description, likes, comments }) => {
  const photoThumbnailElement = photoThumbnailTemplate.cloneNode(true);

  const photoThumbnailElementImg = photoThumbnailElement.querySelector('.picture__img');
  photoThumbnailElementImg.src = url;
  photoThumbnailElementImg.alt = description;
  photoThumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  photoThumbnailElement.querySelector('.picture__likes').textContent = likes;

  fragment.append(photoThumbnailElement);
});

photoThumbnailList.append(fragment);
