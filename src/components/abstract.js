import {createElement, unrender} from '../utils';

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this.bind();
    }
    return this._element;
  }
  bind() {}
  removeElement() {
    unrender(this._element);
    this._element = null;
  }
}

export default AbstractComponent;
