//Валидация
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_inactive',
    inputErrorClass: 'popup__form-item_invalid',
    errorClass: 'popup__input-error_active'
};

const hasInvalidInput = (inputList) => {

    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, config) => {

    if (hasInvalidInput(inputList)) {

        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {

        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(document.querySelectorAll('.popup__form-set'));

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, config);
        });
    });
};

enableValidation(config);

