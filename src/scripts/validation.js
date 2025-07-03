const showErrorInputPopup = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const elementError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  elementError.textContent = errorMessage;
  elementError.classList.add(errorClass);
};

const hideErrorInputPopup = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const elementError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  elementError.classList.remove(errorClass);
  elementError.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonPopupState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showErrorInputPopup(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideErrorInputPopup(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonPopupState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonPopupState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(
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
  toggleButtonPopupState(inputList, buttonElement);
}

export { enableValidation, clearValidation };
