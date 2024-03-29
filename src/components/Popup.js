export class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        };
    }
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            const isOverlay = evt.target.classList.contains('popup_opened');
            const isCloseBtn = evt.target.classList.contains('popup__close');
            if (isOverlay || isCloseBtn) {
                this.close();
            };
        });
    }
}

export default Popup;