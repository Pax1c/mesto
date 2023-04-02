import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__form-item');
        this._formInputsValues = {};
        this._inputList.forEach((input) => {
            this._formInputsValues[input.name] = input.value;
        });
        return this._formInputsValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        this.close();
    }
    close() {
        super.close();
        this._popupForm.reset();
    }
}