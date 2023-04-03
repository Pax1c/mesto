export class Card {
    constructor(cardData, template, handleCardClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._template = document.querySelector(template);
        this._handleCardClick = handleCardClick;

    }

    _getTemplate() {
        const cardElement = this._template.content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _setData() {
        this._nameCard = this._newCard.querySelector('.element__name');
        this._nameCard.textContent = this._name;
        this._imageCard.src = this._link;
        this._imageCard.alt = this._name;
    }

    _handleLikeCard() {
        this._likeButton.classList.toggle('element__like-btn_active')
    }

    _handleDeleteCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    _handleBigImage() {
        this._handleCardClick(this._name, this._link);
    }

    _setEventListeners() {
        this._deleteButton = this._newCard.querySelector('.element__del-btn');
        this._deleteButton.addEventListener('click', () => this._handleDeleteCard());
        this._likeButton = this._newCard.querySelector('.element__like-btn');
        this._likeButton.addEventListener('click', () => this._handleLikeCard());
        this._imageCard = this._newCard.querySelector('.element__image');
        this._imageCard.addEventListener('click', () => this._handleBigImage());
    }

    getView() {
        this._newCard = this._getTemplate();
        this._setEventListeners();
        this._setData();

        return this._newCard;
    }
}
