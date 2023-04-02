import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import '../pages/index.css';
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

const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const BtnClosePopupPhoto = document.querySelector('.popup__close_photo');
const profileForm = document.querySelector('.popup__form_profile');
const cardForm = document.querySelector('.popup__form_card');
const nameInput = document.querySelector('.popup__form-item_edit_title');
const jobInput = document.querySelector('.popup__form-item_edit_subtitle');

const changeProfile = () => {
    nameInput.textContent = userInfo.getUserInfo().name;
    jobInput.textContent = userInfo.getUserInfo().job;
    profilePopup.open();
    cardFormValidator.disableBtn();
}

const userInfo = new UserInfo({ name: '.profile__title', job: '.profile__subtitle' });
const profilePopup = new PopupWithForm(
    '.popup_type_profile',
    ({ name, job }) => {
        userInfo.setUserInfo(name, job);
        profilePopup.close();
    }
);
profilePopup.setEventListeners();

const renderCard = (cardData) => {
    cardList.addItem(createCard(cardData));
}
const photoPopup = new PopupWithImage('.popup_type_photo');
photoPopup.setEventListeners();
const createCard = (cardData) => {
    const card = new Card(cardData, "#card-template", (name, link) => {
        photoPopup.open(name, link);
    });
    const cardElement = card.getView();
    return cardElement;
}

const cardPopup = new PopupWithForm(".popup_type_card", (image) => {
    renderCard(image);
    cardPopup.close();
})
cardPopup.setEventListeners();

const cardList = new Section({
    items: initialCards, renderer: (item) => {
        renderCard(item);
    },
}, '.elements');
cardList.renderItems();

buttonEdit.addEventListener('click', changeProfile);

buttonAdd.addEventListener('click', () => {
    cardPopup.open();
    cardFormValidator.disableBtn();
});

BtnClosePopupPhoto.addEventListener('click', () => photoPopup.close());
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

