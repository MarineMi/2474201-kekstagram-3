const COMMENT_SHOWN_COUNT = 5;
const photoFullPopupElement = document.querySelector('.big-picture');
const photoFullCloseElement = photoFullPopupElement.querySelector('.big-picture__cancel');
const commentsListElement = photoFullPopupElement.querySelector('.social__comments');
const commentTemplateElement = photoFullPopupElement.querySelector('.social__comment');


const renderPhotoFull = function ({ url, description, likes, comments }) {
  const photoFullPopupImgElement = photoFullPopupElement.querySelector('img');
  photoFullPopupImgElement.src = url;
  photoFullPopupImgElement.alt = description;
  photoFullPopupElement.querySelector('.likes-count').textContent = likes;
  photoFullPopupElement.querySelector('.social__comment-total-count').textContent = comments.length;
  photoFullPopupElement.querySelector('.social__comment-shown-count').textContent = Math.min(COMMENT_SHOWN_COUNT, comments.length);
  photoFullPopupElement.querySelector('.social__caption').textContent = description;
};


const renderComments = function (comments) {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const { avatar, name, message } = comment;
    const commentElement = commentTemplateElement.cloneNode(true);
    const commentImgElement = commentElement.querySelector('.social__picture');
    commentImgElement.src = avatar;
    commentImgElement.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    fragment.appendChild(commentElement);
  });

  commentsListElement.innerHTML = '';
  commentsListElement.appendChild(fragment);
};


let lastFocusedElement = null;

const onPhotoThumbnailClick = function (evt, photo) {
  evt.preventDefault();
  const { url, description, likes, comments } = photo;
  renderPhotoFull({ url, description, likes, comments });
  renderComments(comments);
  photoFullPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  photoFullCloseElement.focus();
  lastFocusedElement = evt.currentTarget;

  photoFullPopupElement.querySelector('.social__comment-count').classList.add('hidden');
  photoFullPopupElement.querySelector('.comments-loader').classList.add('hidden');
};


const onPhotoFullClose = function () {
  photoFullPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
};


photoFullCloseElement.addEventListener('click', () => onPhotoFullClose());


photoFullPopupElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onPhotoFullClose();
  }
});


export { onPhotoThumbnailClick };
