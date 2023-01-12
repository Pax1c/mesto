import { openImage, initialCards } from './index.js';
import { photoPopupImg, photoPopupName } from './utils.js';

export class Card {
    constructor(initialCards) {
        this._name = initialCards.name;
        this._link = initialCards.link;
    }

    _getTemplate() {
        const card = document.querySelector('#card-template').content.querySelector('.element').cloneNode(true);
        return card;
    }

    _setData() {
        const nameCard = this._newCard.querySelector('.element__name');
        nameCard.textContent = this._name;
        const imageCard = this._newCard.querySelector('.element__image');
        imageCard.src = this._link;
        imageCard.alt = this._name;
    }

    _handleLikeCard() {
        const likeBtn = this._newCard.querySelector('.element__like-btn');
        likeBtn.classList.toggle('element__like-btn_active')
    }

    _handleDeleteCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    _bigImage() {
        photoPopupImg.src = this._link;
        photoPopupImg.alt = this._name;
        photoPopupName.textContent = this._name;
        openImage();
    }

    _setEventListeners() {
        const dltBtn = this._newCard.querySelector('.element__del-btn');
        dltBtn.addEventListener('click', () => { this._handleDeleteCard() });
        const likeBtn = this._newCard.querySelector('.element__like-btn');
        likeBtn.addEventListener('click', () => { this._handleLikeCard() });
        const imageCard = this._newCard.querySelector('.element__image');
        imageCard.addEventListener('click', () => { this._bigImage() });
    }

    getView() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setEventListeners();

        return this._newCard;
    }
}
