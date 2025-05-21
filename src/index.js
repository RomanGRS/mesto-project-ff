
import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { createCard, likeCard, deleteCard } from './scripts/card.js'
import { openModal, closeModal} from './scripts/modal.js'


//Получаем элементы из DOM
const cardTemplate = document.querySelector('#card-template')
const placesList = document.querySelector('.places__list')
const popups = document.querySelectorAll('.popup')

//Модалки
const modals = {
  popupTypeEdit: document.querySelector('.popup_type_edit'),
  addNewCard: document.querySelector('.popup_type_new-card'),
  showImage: document.querySelector('.popup_type_image')
}

//Элементы модалок
const modalEdit = {
  openButton: document.querySelector('.profile__edit-button'),
  closeButton: modals.popupTypeEdit.querySelector('.popup__close')
}

const modalAddCard = {
  openButton: document.querySelector('.profile__add-button'),
  closeButton: modals.addNewCard.querySelector('.popup__close')
}

const modalShowImage = {
  image: document.querySelector('.popup__image'),
  text: document.querySelector('.popup__caption'),
  closeButton: modals.showImage.querySelector('.popup__close')
}

//Формы
const forms = {
  addNewCard: document.forms['new-place'],
  popupTypeEdit: document.forms['edit-profile']
}

//Элементы форм
const addCardForm = {
  form: document.forms['new-place'],
  url: document.querySelector('.popup__input_type_url'),
  name: document.querySelector('.popup__input_type_card-name')
}

const profile = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description')
}

const editForm = {
  form: document.forms['edit-profile'],
  nameInput: document.querySelector('.popup__input_type_name'),
  jobInput: document.querySelector('.popup__input_type_description')
}

//Добавление карточек в DOM
initialCards.forEach((cardData) => {
  placesList.appendChild(createCard(cardTemplate, cardData, deleteCard, likeCard, showImage))
})

//Прослушиватели

//Открываем по клику на кнопку
modalEdit.openButton.addEventListener('click', () => {
  openModal(modals.popupTypeEdit)
  fillForm()
})

modalAddCard.openButton.addEventListener('click', () => {
  openModal(modals.addNewCard)
})

//Закрываем окна
popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close')

  //Закрываем по клику на кнопку
  closeButton.addEventListener('click', () => closeModal(popup))

  //Закрываем модалку по клику вне
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(popup)
    }  
  })

  //Анимация окон
  popup.classList.add('popup_is-animated')
})

//Отправляем формы
forms.popupTypeEdit.addEventListener('submit', submitEditForm)

forms.addNewCard.addEventListener('submit', (evt) => {
  addNewCard(evt, cardTemplate, showImage, closeModal)
});

//Функция просмотра изображения
function showImage(link, name) {
  modalShowImage.image.src = link
  modalShowImage.image.alt = name
  modalShowImage.text.textContent = name
  openModal(modals.showImage)
}

//Создаем новую карточку
function addNewCard(evt, cardTemplate, showImage, closeModal) {
  //Отменяем отправку формы
  evt.preventDefault()

  //Объект с данными новой карточки
  const newCardData = {
    name: addCardForm.name.value,
    link: addCardForm.url.value
  }

  //Новая карточка
  const newCard = createCard(
    cardTemplate, 
    newCardData, 
    deleteCard, 
    likeCard, 
    showImage
  )

  placesList.prepend(newCard)

  addCardForm.form.reset()

  closeModal(modals.addNewCard)
}

//Присваиваем поля форме
function fillForm() {
  editForm.nameInput.value = profile.name.textContent;
  editForm.jobInput.value = profile.description.textContent;
}

// Обработчик 'отправки' формы
function submitEditForm(evt) {
  //Отменяем отправку формы
  evt.preventDefault();

  //Обновляем поля и закрываем форму
  profile.name.textContent = editForm.nameInput.value
  profile.description.textContent = editForm.jobInput.value
    
  closeModal(modals.popupTypeEdit)
}
