import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
//Объявляем переменные

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_inactive',
    inputErrorClass: 'popup__form-item_invalid',
    errorClass: 'popup__input-error_active'
};
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupList = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_profile');
const buttonEdit = document.querySelector('.profile__edit-btn');
const popupEditProfileForm = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__form-item_edit_title');
const jobInput = document.querySelector('.popup__form-item_edit_subtitle');
const cardPopup = document.querySelector('.popup_type_card');
const buttonAdd = document.querySelector('.profile__add-btn');
const cardList = document.querySelector('.elements');
const nameCardInput = document.querySelector('.popup__form-item_card_title');
const imageCardInput = document.querySelector('.popup__form-item_card_link');
const popupSumbitCardForm = document.querySelector('.popup__form_card');
const photoPopup = document.querySelector('.popup_type_photo');
const BtnClosePopupPhoto = document.querySelector('.popup__close_photo');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

//Объявлем функции
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleKeyClosePopup);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleKeyClosePopup);

}

function handleKeyClosePopup(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};

const openImage = () => {
    openPopup(photoPopup);
}

const renderCard = (cardData) => {
    const card = new Card(cardData);
    cardList.prepend(card.getView());
}

initialCards.forEach((initialCard) => {
    renderCard(initialCard);
});

//Добавляем обработчики событий
popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        const isOverlay = evt.target.classList.contains('popup_opened');
        const isCloseBtn = evt.target.classList.contains('popup__close');
        if (isOverlay || isCloseBtn) {
            closePopup(popup);
        };
    });
});

buttonEdit.addEventListener('click', () => {
    openPopup(profilePopup);
    cardFormValidator.disableBtn();
});

popupEditProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
});

buttonAdd.addEventListener('click', () => {
    openPopup(cardPopup);
    cardFormValidator.disableBtn();
});

popupSumbitCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderCard({ name: nameCardInput.value, link: imageCardInput.value });
    closePopup(cardPopup);
    popupSumbitCardForm.reset();
});

BtnClosePopupPhoto.addEventListener('click', () => closePopup(photoPopup));

const profileFormValidator = new FormValidator(config, profilePopup);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(config, cardPopup);
cardFormValidator.enableValidation();

export { openImage };