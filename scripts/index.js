const editButton = document.querySelector('.profile__edit-btn');
const popupElem = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

const Open = (popup) => {
    popupElem.classList.add('popup_status_opened');
}

const Close = (popup) => {
    popupElem.classList.remove('popup_status_opened');
}

editButton.addEventListener('click', () => {
    Open(popupElem);
});

popupElem.addEventListener('click', (event) => {
    const isOverlay = event.target.classList.contains('popup_status_opened');
    const isClose = event.target.classList.contains('popup__close');
    if (isOverlay || isClose) {
        Close(popupElem);
    }
});

const profileEditBtn = document.querySelector('.popup__form-button');

profileEditBtn.addEventListener('click', () => {
    let profileEditTitle = document.querySelector('.popup__form-item_edit_title').value;
    document.querySelector('.profile__title').innerText = profileEditTitle;
    let profileEditSubtitle = document.querySelector('.popup__form-item_edit_subtitle').value;
    document.querySelector('.profile__subtitle').innerText = profileEditSubtitle;
});
const likeBtns = document.querySelectorAll('.element__like-btn');

likeBtns.forEach(likeBtn => {
    likeBtn.addEventListener('click', (likeAdd) => {
        likeBtn.classList.toggle('element__like-btn_status_active');
    })
})