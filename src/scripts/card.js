
import { addLikeCardServer, deleteLikeCardServer, deleteCardServer } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function createCard(item, userId, likeCard, showImage) {
  const placesItem = cardTemplate.querySelector('.card').cloneNode(true)
  const cardImage = placesItem.querySelector('.card__image')
  const cardTitle = placesItem.querySelector('.card__title')
  const cardDeleteButton = placesItem.querySelector('.card__delete-button')
  const cardLikeButton = placesItem.querySelector('.card__like-button')
  const likeCountElement = placesItem.querySelector('.card__like-count')
  
  placesItem.id = item['_id'];

  cardImage.alt = item.name
  cardImage.src = item.link
  cardTitle.textContent = item.name
  likeCountElement.textContent = item.likes.length;


  const isLiked = item.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }


  cardImage.addEventListener('click', () => {
    showImage(item.link, item.name);
  })

  cardLikeButton.addEventListener('click', (evt) => {
    likeCard(evt, item._id);
  })

  if(item.owner._id === userId) {
   cardDeleteButton.addEventListener('click', (evt) => {
    deleteCard(evt, item._id);
  });
  } else {
    cardDeleteButton.remove();
  }

  return placesItem;
}


//Функция удалния карточки
function deleteCard(evt, userId) {
  deleteCardServer(userId)
    .then(() => {
      const card = evt.target.closest('.card');
      card.remove();
    })
    .catch((err) => console.log(err));
}


//Функция лайка

const likeCard = (evt, cardId) => {
  const isLikes = evt.target.parentNode.querySelector('.card__like-count');
  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLikeCardServer(cardId)
      .then((data) => {
        evt.target.classList.remove('card__like-button_is-active');
        isLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка', err);
      });
  } else {
    addLikeCardServer(cardId)
      .then((data) => {
        evt.target.classList.add('card__like-button_is-active');
        isLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка', err);
      });
  }
};


export {createCard, deleteCard, likeCard}