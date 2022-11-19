const popupProfile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-btn');
const popupProfileCloseBtn = document.querySelector('.popup__close_profile');

const popupOpen = (popup) => popup.classList.add('popup_opened');
const popupClose = (popup) => popup.classList.remove('popup_opened');

editButton.addEventListener('click', () => popupOpen(popupProfile));

popupProfileCloseBtn.addEventListener('click', () => popupClose(popupProfile));

const formPopupProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__form-item_edit_title');
const jobInput = document.querySelector('.popup__form-item_edit_subtitle');

formPopupProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__subtitle').textContent = jobInput.value;
    popupClose(popupProfile);
});

const popupAddCard = document.querySelector('.popup_card');
const addButton = document.querySelector('.profile__add-btn');
const popupCardCloseBtn = document.querySelector('.popup__close_card');

addButton.addEventListener('click', () => popupOpen(popupAddCard));

popupCardCloseBtn.addEventListener('click', () => popupClose(popupAddCard));

const initialCards = [
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

const cardList = document.querySelector('.elements');
const nameCardInput = document.querySelector('.popup__form-item_card_title');
const imageCardInput = document.querySelector('.popup__form-item_card_link');
const popupCardForm = document.querySelector('.popup__form_card');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.element');

const deleteCard = (event) => {
    event.target.closest('.element').remove();
}

const likeCard = (event) => {
    event.target.closest('.element__like-btn').classList.toggle('element__like-btn_active');
}


const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoCloseBtn = document.querySelector('.popup__close_photo');
const popupPhotoImg = document.querySelector('.popup__card-image');
const popupPhotoName = document.querySelector('.popup__card-name');
popupPhotoCloseBtn.addEventListener('click', () => popupClose(popupPhoto));

const openImage = (card) => {
    popupPhotoImg.src = card.link;
    popupPhotoName.textContent = card.name;
    popupOpen(popupPhoto);
}

const generadeCard = (card) => {
    const newCard = cardTemplate.cloneNode(true);
    const nameCard = newCard.querySelector('.element__name');
    nameCard.textContent = card.name;
    const imageCard = newCard.querySelector('.element__image');
    imageCard.src = card.link;
    const delBtn = newCard.querySelector('.element__del-btn');
    delBtn.addEventListener('click', deleteCard);
    const likeBtn = newCard.querySelector('.element__like-btn');
    likeBtn.addEventListener('click', likeCard);
    imageCard.addEventListener('click', () => openImage(card));
    return newCard;
}

popupCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderCard({ name: nameCardInput.value, link: imageCardInput.value });
    popupClose(popupAddCard);
});

const renderCard = (card) => cardList.prepend(generadeCard(card));

initialCards.forEach((card) => renderCard(card));

