//Открываем модалку
function openModal(modal) {
  modal.classList.add('popup_is-opened')
  document.addEventListener('keyup', closeEsc)
} 

//Закрываем по нажатию клавиши Esc
function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened')
    closeModal(openedPopup)
  }
} 

//Закрываем модалку
function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keyup', closeEsc)
}

export {openModal, closeModal}


