export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "4d843643-f9b3-4126-9ca7-8baba1b4cfdc",
    "Content-Type": "application/json"
  }
};

// Создаем общую функцию для ошибки
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка с сервера карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

// Загрузка с сервера информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

// Обновление профиля методом PATCH
export const updateProfileUser = (card) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name:card.name,
      about:card.about
    }),
  }).then(checkResponse);
};

// Добавление новой карточки на сервер
export const addNewCardServer = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  }).then(checkResponse);
};

// Удаление карточки с сервера
export const deleteCardServer = (userId) => {
  return fetch(`${config.baseUrl}/cards/${userId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Постановка лайка
export const addLikeCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

// Снятие лайка
export const deleteLikeCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Обновление аватара
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
};