let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = document.querySelector('.popup__close');

editButton.addEventListener('click', () => {
    popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

let formElem = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-item_edit_title');
let jobInput = document.querySelector('.popup__form-item_edit_subtitle');

formElem.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__subtitle').textContent = jobInput.value;
    popup.classList.remove('popup_opened');
});