

function createCard(cardTemplate, cardData, deleteCard, likeCard, showImage) {
  
  const placesItem = cardTemplate.content.cloneNode(true)
  const card = placesItem.querySelector('.card')
  const cardImage = card.querySelector('.card__image')
  const cardTitle = card.querySelector('.card__title')
  const cardDeleteButton = card.querySelector('.card__delete-button')
  const cardLikeButton = card.querySelector('.card__like-button')

  cardImage.alt = cardData.name
  cardImage.src = cardData.link
  cardTitle.textContent = cardData.name

  cardImage.addEventListener('click', () => {
    showImage(cardData.link, cardData.name)
  })

  cardLikeButton.addEventListener('click', () => {
    likeCard(cardLikeButton)
  })

  cardDeleteButton.addEventListener('click', () => {
    deleteCard(card)
  })

  return placesItem;

}

//Удаление карточки
function deleteCard(element) {
    if (element && element.remove) {
      element.remove()
    }
}

//Функция лайка
function likeCard(element) {
  element.classList.toggle('card__like-button_is-active')
}

export {deleteCard, likeCard, createCard}

