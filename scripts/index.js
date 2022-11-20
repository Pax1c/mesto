//Объявляем переменные
const profilePopup = document.querySelector('.popup_type_profile');
const buttonEdit = document.querySelector('.profile__edit-btn');
const profilePopupCloseBtn = document.querySelector('.popup__close_profile');
const handleSubmitProfileForm = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__form-item_edit_title');
const jobInput = document.querySelector('.popup__form-item_edit_subtitle');
const cardPopup = document.querySelector('.popup_type_card');
const ButtonAdd = document.querySelector('.profile__add-btn');
const popupCardCloseBtn = document.querySelector('.popup__close_card');
const cardList = document.querySelector('.elements');
const nameCardInput = document.querySelector('.popup__form-item_card_title');
const imageCardInput = document.querySelector('.popup__form-item_card_link');
const handleSubmitCardForm = document.querySelector('.popup__form_card');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.element');
const photoPopup = document.querySelector('.popup_type_photo');
const photoPopupCloseBtn = document.querySelector('.popup__close_photo');
const photoPopupImg = document.querySelector('.popup__card-image');
const photoPopupName = document.querySelector('.popup__card-name');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

//Объявлем функции
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

const handleDeleteCard = (event) => {
    event.target.closest('.element').remove();
}

const handleLikeCard = (event) => {
    event.target.closest('.element__like-btn').classList.toggle('element__like-btn_active');
}

const openImage = (card) => {
    photoPopupImg.src = card.link;
    photoPopupImg.alt = card.name;
    photoPopupName.textContent = card.name;
    openPopup(photoPopup);
}

const generateCard = (card) => {
    const newCard = cardTemplate.cloneNode(true);
    const nameCard = newCard.querySelector('.element__name');
    nameCard.textContent = card.name;
    const imageCard = newCard.querySelector('.element__image');
    imageCard.src = card.link;
    imageCard.alt = card.name;
    const btnDel = newCard.querySelector('.element__del-btn');
    btnDel.addEventListener('click', handleDeleteCard);
    const btnLike = newCard.querySelector('.element__like-btn');
    btnLike.addEventListener('click', handleLikeCard);
    imageCard.addEventListener('click', () => openImage(card));
    return newCard;
}

const renderCard = (card) => {
    cardList.prepend(generateCard(card));
}

initialCards.forEach((card) => {
    renderCard(card);
});

//Добавляем обработчики событий
buttonEdit.addEventListener('click', () => {
    openPopup(profilePopup);
});

profilePopupCloseBtn.addEventListener('click', () => {
    closePopup(profilePopup);
});

handleSubmitProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
});

ButtonAdd.addEventListener('click', () => {
    openPopup(cardPopup);
});

popupCardCloseBtn.addEventListener('click', () => {
    closePopup(cardPopup);
});

handleSubmitCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderCard({ name: nameCardInput.value, link: imageCardInput.value });
    nameCardInput.value = '';
    imageCardInput.value = '';
    closePopup(cardPopup);
});

photoPopupCloseBtn.addEventListener('click', () => closePopup(photoPopup));
