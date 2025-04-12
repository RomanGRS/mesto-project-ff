// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы


// @todo: Функция создания карточки

function createCard(images) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    placesItem.querySelector('.card__image').src = images.link;
    placesItem.querySelector('.card__title').textContent = images.name;
    placesItem.querySelector('.card__image').setAttribute('alt', 'Пейзажи природы');
    placesItem.querySelector('.card__delete-button').addEventListener('click', () => cardDelete(placesItem));

    return placesItem;
}

// @todo: Функция удаления карточки
function cardDelete(item) {
    item.remove();
}

// @todo: Вывести карточки на страницу
function renderCard(card) {
    placesList.append(card);
}

initialCards.forEach((item) => {
  renderCard(createCard(item));
});
