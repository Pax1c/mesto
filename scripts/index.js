let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = document.querySelector('.popup__close');

editButton.addEventListener('click', () => {
    popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElem = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-item_edit_title');
let jobInput = document.querySelector('.popup__form-item_edit_subtitle');
nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

formElem.addEventListener('submit', (event) => {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
});