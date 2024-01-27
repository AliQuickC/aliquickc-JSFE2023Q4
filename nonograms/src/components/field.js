import Component from './component';

export default class Field extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {}

  destroy() {}

  getTopClues() {
    const size = this.store.getState().userData.fieldSize;
    let columns = '';

    for (let index = 0; index < size; index += 1) {
      columns += '<div class="top-clues__column"></div>';
    }

    return `<div class="field__top-clues top-clues">
              ${columns}
            </div>`;
  }

  getLeftClues() {
    const size = this.store.getState().userData.fieldSize;
    let rows = '';

    for (let index = 0; index < size; index += 1) {
      rows += '<div class="left-clues__row"></div>';
    }

    return `
            <div class="field__left-clues left-clues">
              ${rows}
            </div>
    `;
  }

  getFieldRow(numb) {
    const size = this.store.getState().userData.fieldSize;
    let rows = '';

    for (let index = 0; index < size; index += 1) {
      rows += `<div class="frame__cell" data-col="${index + 1}" data-id="${numb}:${index}"></div>`;
    }

    return `
    <div class="frame__row" data-row="${numb+1}">
      ${rows}
    </div>
    `;
  }

  toHTML() {
    const size = this.store.getState().userData.fieldSize;
    let rows = '';

    for (let index = 0; index < size; index += 1) {
      rows += this.getFieldRow(index);
    }

    return `
            ${this.getTopClues()}
            ${this.getLeftClues()}


            <div class="field__frame frame">

            ${rows}
            </div>
    `;
  }

  render = () => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
