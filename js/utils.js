const ALERT_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;


const isEscapeKey = (evt) => (evt.key === 'Escape');


const removeAlert = (element, timeoutId, onKeydown, onClick) => {
  element.remove();
  document.removeEventListener('keydown', onKeydown, true);
  document.removeEventListener('click', onClick);
  clearTimeout(timeoutId);
};


const showAlert = (message) => {
  const alertTemplateElement = document.querySelector(`#${message}`)
    .content
    .querySelector(`.${message}`);
  const alertElement = alertTemplateElement.cloneNode(true);
  document.body.append(alertElement);

  const timeoutAlert = setTimeout(() => removeAlert(alertElement, timeoutAlert, onDocumentKeydown, onDocumentClick), ALERT_SHOW_TIME);

  const closeButtonElement = alertElement.querySelector(`.${message}__button`);
  if (closeButtonElement) {
    closeButtonElement.addEventListener('click', () => {
      removeAlert(alertElement, timeoutAlert, onDocumentKeydown, onDocumentClick);
    });
  }

  document.addEventListener('keydown', onDocumentKeydown, true);
  document.addEventListener('click', onDocumentClick);

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      removeAlert(alertElement, timeoutAlert, onDocumentKeydown, onDocumentClick);
    }
  }

  function onDocumentClick(evt) {
    const isOutside = !evt.target.closest(`.${message}__inner`);
    if (isOutside) {
      removeAlert(alertElement, timeoutAlert, onDocumentKeydown, onDocumentClick);
    }
  }
};


const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};


export {
  isEscapeKey,
  showAlert,
  debounce
};
