import { showAlert } from './utils.js';

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const SuccessAction = {
  [ Method.POST ]: () => showAlert('success'),
};

const ErrorAction = {
  [ Method.GET ]: () => showAlert('data-error'),
  [ Method.POST ]: () => showAlert('error'),
};


const load = (route, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, { method, body })
  .then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(new Error(`Ошибка обработки данных: ${response.status}`))
  )
  .then((data) => {
    if (SuccessAction[ method ]) {
      SuccessAction[ method ]();
    }

    return data;
  })
  .catch((err) => {
    ErrorAction[ method ]();
    throw err;
  });


const getData = () => load(Route.GET_DATA);


const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);


export { getData, sendData };
