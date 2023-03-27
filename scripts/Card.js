export class Card {
    constructor(cardData, template, handleCardClick) {
        this._name = cardData.place;
        this._link = cardData.link;
        this._template = document.querySelector(template);
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = this._template.content.querySelector('.element').cloneNode(true);
        return cardElement;
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

    _handleCardClick() {
        this.handleCardClick(this._name, this._link);
    }

    _setEventListeners() {
        const dltBtn = this._newCard.querySelector('.element__del-btn');
        dltBtn.addEventListener('click', () => this._handleDeleteCard());
        const likeBtn = this._newCard.querySelector('.element__like-btn');
        likeBtn.addEventListener('click', () => this._handleLikeCard());
        const imageCard = this._newCard.querySelector('.element__image');
        imageCard.addEventListener('click', () => this._handleCardClick());
    }

    getView() {
        this._newCard = this._getTemplate();
        this._setEventListeners();
        this._setData();

        return this._newCard;
    }
}
