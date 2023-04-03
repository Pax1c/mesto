import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._photoPopupImg = this._popup.querySelector('.popup__card-image');
        this._photoPopupName = this._popup.querySelector('.popup__card-name');
    }
    open(name, link) {
        super.open();
        this._photoPopupImg.src = link;
        this._photoPopupImg.alt = name;
        this._photoPopupName.textContent = name;
    }
}
