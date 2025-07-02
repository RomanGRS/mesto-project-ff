
import './pages/index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getUserInfo, getInitialCards, updateProfileUser, addNewCardServer, updateAvatar, deleteCardServer} from './scripts/api.js';


//Получаем элементы из DOM

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['update-avatar'];
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar-url');
const avatarImage = document.querySelector('.profile__image');


//Модалки
const modals = {
  popupTypeEdit: document.querySelector('.popup_type_edit'),
  addNewCard: document.querySelector('.popup_type_new-card'),
  showImage: document.querySelector('.popup_type_image')
};

//Элементы модалок
const modalEdit = {
  openButton: document.querySelector('.profile__edit-button'),
  closeButton: modals.popupTypeEdit.querySelector('.popup__close')
};


const modalAddCard = {
  openButton: document.querySelector('.profile__add-button'),
  closeButton: modals.addNewCard.querySelector('.popup__close')
};

const modalShowImage = {
  image: document.querySelector('.popup__image'),
  text: document.querySelector('.popup__caption'),
  closeButton: modals.showImage.querySelector('.popup__close')
};

//Формы
const forms = {
  addNewCard: document.forms['new-place'],
  popupTypeEdit: document.forms['edit-profile']
};

//Элементы форм
const addCardForm = {
  form: document.forms['new-place'],
  url: document.querySelector('.popup__input_type_url'),
  name: document.querySelector('.popup__input_type_card-name')
};

const profile = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description')
};

const editForm = {
  form: document.forms['edit-profile'],
  nameInput: document.querySelector('.popup__input_type_name'),
  jobInput: document.querySelector('.popup__input_type_description')
};


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


let userId;


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

//Функция просмотра изображения
function showImage(link, name) {
  modalShowImage.image.src = link
  modalShowImage.image.alt = name
  modalShowImage.text.textContent = name
  openModal(modals.showImage)
}

//Карточка

//Добавление карточки
addCardForm.form.addEventListener('submit', addNewCard);

//Открываем по клику на кнопку 
modalAddCard.openButton.addEventListener('click', () => {
  clearValidation(forms.addNewCard, validationConfig);
  addCardForm.form.reset();
  openModal(modals.addNewCard);
});

const addLoading = (isLoading, button) => {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

//Создаем новую карточку
function addNewCard(evt) {
  //Отменяем отправку формы
  evt.preventDefault();
  addLoading(true, modals.addNewCard.querySelector('.popup__button'));

  const newCardData = {
    name: addCardForm.name.value,
    link: addCardForm.url.value
  }

  addNewCardServer(newCardData.name, newCardData.link)
    .then((data) => {
    const newCard = createCard(
        data,
        userId,
        likeCard,
        showImage,
        deleteCard
      );
      placesList.prepend(newCard);
      closeModal(modals.addNewCard);
      addCardForm.form.reset();
    })
    .catch((err) => {
      console.log('Ошибка', err);
    })
    .finally(() => {
      addLoading(false, addCardForm.form.querySelector('.popup__button'));
    });
}

//Профиль
//Отправляем формы
forms.popupTypeEdit.addEventListener('submit', submitEditForm)

//Открываем по клику на кнопку 
modalEdit.openButton.addEventListener('click', () => {
  openModal(modals.popupTypeEdit);
  clearValidation(forms.popupTypeEdit, validationConfig);
 
  fillForm();
})

//Присваиваем поля форме профеля
function fillForm() {
  editForm.nameInput.value = profile.name.textContent;
  editForm.jobInput.value = profile.description.textContent;
}

  // Обработчик 'отправки' формы 

function submitEditForm(evt) {
  evt.preventDefault();
  addLoading(true, editForm.form.querySelector('.popup__button'));
  updateProfileUser({
    name: editForm.form.name.value,
    about: editForm.form.description.value,
  })
    .then((res) => {
      //Обновляем поля и закрываем форму
      profile.name.textContent = editForm.nameInput.value
      profile.description.textContent = editForm.jobInput.value
      closeModal(modals.popupTypeEdit);
    })
    .catch((err) => {
      console.log('Ошибка при загрузке данных:', err);
    })
    .finally(() => {
      addLoading(false, editForm.form.querySelector('.popup__button'));
    })
};

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    // Обновляем профиль данными с сервера
    profile.name.textContent = userData.name;
    profile.description.textContent = userData.about;
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;
    
    // Отображаем карточки с сервера
    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        userId,
        likeCard,
        showImage
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log('Ошибка при загрузке данных:', err);
  });


  //Аватар

// Добавить обработчик открытия попапа аватара
avatarImage.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

// Добавить обработчик отправки формы аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  updateAvatar(avatarInput.value)
    .then((userData) => {
      avatarImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitButton.textContent = originalText;
    });
});

enableValidation(validationConfig);