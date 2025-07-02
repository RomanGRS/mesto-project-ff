
const showErrorInputPopup = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const elementError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  elementError.textContent = errorMessage;
  elementError.classList.add(errorClass);
};
 
const hideErrorInputPopup = (formElement, inputElement, inputErrorClass, errorClass) => {
  const elementError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  elementError.classList.remove(errorClass);
  elementError.textContent = '';
};

const isInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const ButtonPopupState = (inputList, buttonElement, inactiveButtonClass) => {
  if (isInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const isInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showErrorInputPopup(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideErrorInputPopup(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const isEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const buttonElement = formElement.querySelector(submitButtonSelector);
    ButtonPopupState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      ButtonPopupState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
  isEventListeners(
    formElement,
    validationConfig.inputSelector, 
    validationConfig.inputErrorClass, 
    validationConfig.errorClass,
    validationConfig.submitButtonSelector,
    validationConfig.inactiveButtonClass
  );
  });
};

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  
  inputList.forEach((inputElement) => {
  hideErrorInputPopup(formElement, inputElement);
  });
  ButtonPopupState(inputList, buttonElement);
}

export {enableValidation, clearValidation}