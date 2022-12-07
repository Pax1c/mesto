//Объявляем переменные
const profilePopup = document.querySelector('.popup_type_profile');
const buttonEdit = document.querySelector('.profile__edit-btn');
const profilePopupCloseBtn = document.querySelector('.popup__close_profile');
const handleSubmitProfileForm = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__form-item_edit_title');
const jobInput = document.querySelector('.popup__form-item_edit_subtitle');
const cardPopup = document.querySelector('.popup_type_card');
const buttonAdd = document.querySelector('.profile__add-btn');
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
profilePopup.addEventListener('click', (evt) => {
    const isOverlay = evt.target.classList.contains('popup_opened');
    const isCloseBtn = evt.target.classList.contains('popup__close');
    if (isOverlay || isCloseBtn) {
        closePopup(profilePopup);
    }
});

cardPopup.addEventListener('click', (evt) => {
    const isOverlay = evt.target.classList.contains('popup_opened');
    const isCloseBtn = evt.target.classList.contains('popup__close');
    if (isOverlay || isCloseBtn) {
        closePopup(cardPopup);
    }
});

photoPopup.addEventListener('click', (evt) => {
    const isOverlay = evt.target.classList.contains('popup_opened');
    const isCloseBtn = evt.target.classList.contains('popup__close');
    if (isOverlay || isCloseBtn) {
        closePopup(photoPopup);
    }
});

document.addEventListener('keydown', keyClosePopup);

function keyClosePopup(evt) {
    if (evt.key === "Escape") {
        closePopup(profilePopup);
        closePopup(cardPopup);
        closePopup(photoPopup);
    }
};

buttonEdit.addEventListener('click', () => {
    openPopup(profilePopup);
});

handleSubmitProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
});

buttonAdd.addEventListener('click', () => {
    openPopup(cardPopup);
});

handleSubmitCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderCard({ name: nameCardInput.value, link: imageCardInput.value });
    nameCardInput.value = '';
    imageCardInput.value = '';
    closePopup(cardPopup);
});


//Валидация
const profileForm = document.querySelector('#profile_form');
const profileValidators = {
    name: validateName,
    job: validateJob,

};
enableValidation(profileForm, profileValidators);

const cardForm = document.querySelector('#card_form');
const cardValidators = {
    place: validatePlace,
    link: validateLink
};
enableValidation(cardForm, cardValidators);

function enableValidation(form, validators) {

    function validate(key, value) {
        const validator = validators[key];
        return validator(value);
    };

    form.addEventListener('input', (evt) => {
        const key = evt.target.name;
        const value = evt.target.value
        const formData = new FormData(evt.currentTarget);
        const values = Object.fromEntries(formData);

        const errorMessage = validate(key, value)

        if (!errorMessage) {
            evt.target.onblur = () => {
                evt.target.dataset.dirty = 'true';
            };
            clearError(key);
            return;
        }

        // есть ошибка
        if (evt.target.dataset.dirty === 'true') {
            setError(key, errorMessage);
            return;
        }

        // есть ошибка, но мы еще не ушли с поля
        evt.target.onblur = () => {
            evt.target.dataset.dirty = 'true';
            setError(key, errorMessage);
        };
    });

    function setError(key, errorMessage) {
        const inputElement = form.querySelector(`.popup__form-item[name=${key}]`);
        let errorElement = form.querySelector(`.popup__form-item_type_error[data-key=${key}]`);
        const buttonElement = form.querySelector('.popup__form-button');
        buttonElement.classList.add('popup__form-button_inactive');
        buttonElement.disabled = true;

        if (!errorElement) {
            errorElement = document.createElement('p');
            inputElement.after(errorElement);
        }

        inputElement.classList.add('popup__form-item_invalid');
        errorElement.classList.add('popup__form-item_type_error');
        errorElement.dataset.key = key;
        errorElement.textContent = errorMessage;
    };

    function clearError(key) {
        const inputElement = form.querySelector(`.popup__form-item[name=${key}]`);
        inputElement.classList.remove('popup__form-item_type_error');
        inputElement.classList.remove('popup__form-item_invalid');
        const buttonElement = form.querySelector('.popup__form-button');
        buttonElement.classList.remove('popup__form-button_inactive');
        buttonElement.disabled = false;
        const errorElement = form.querySelector(`.popup__form-item_type_error[data-key=${key}]`);
        if (errorElement) {
            errorElement.remove();
        }
    };

    form.addEventListener('submit', (evt) => {
        const formData = new FormData(evt.currentTarget);
        const values = Object.fromEntries(formData);

        let isFormValid = true;

        formData.forEach((value, key) => {
            const errorMessage = validate(key, value);

            if (!errorMessage) {
                return;
            }

            setError(key, errorMessage);
            const inputElement = form.querySelector(`.popup__form-item[name=${key}]`);
            inputElement.dataset.dirty = 'true';
            isFormValid = false;
        });

        if (!isFormValid) {
            evt.preventDefault();
            return;
        }
    });
}

//Validators
function validateName(value) {
    if (!value) {
        return 'Вы не заполнили поле';
    }
    if ((value.length < 2) || (value.length > 40)) {
        return 'Длина поля "Имя" должна быть не менее 2 символов и не более 40 символов';
    } else {
        return null;
    }
};

function validateJob(value) {
    if (!value) {
        return 'Вы не заполнили поле';
    }
    if ((value.length < 2) || (value.length > 200)) {
        return 'Длина поля "О себе" должна быть не менее 2 символов и не более 200 символов';
    } else {
        return null;
    }

};

function validatePlace(value) {
    if (!value) {
        return 'Вы не заполнили поле';
    }
    if ((value.length < 2) || (value.length > 30)) {
        return 'Длина поля "Название" должна быть не менее 2 символов и не более 30 символов';
    } else {
        return null;
    }
};

function validateLink(url) {
    const obj = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
    if (!url) {
        return 'Вы не заполнили поле';
    }
    if (!obj.test(url)) {
        return 'Некорректная ссылка.';
    }
    else {
        return null;
    }
};