import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { config, initialCards } from "../utils/utils.js";
import '../pages/index.css';
//Объявляем переменные

const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const profileForm = document.querySelector('.popup__form_profile');
const cardForm = document.querySelector('.popup__form_card');

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

buttonEdit.addEventListener('click', () => {
    profilePopup.setInputValues(userInfo.getUserInfo());
    cardFormValidator.disableBtn();
    profilePopup.open();
});

buttonAdd.addEventListener('click', () => {
    cardPopup.open();
    cardFormValidator.disableBtn();
});

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

