import Component from './component';
import MOUSE_BUTTONS from '../modules/constants';
import {SELECT_TEMPLATE} from '../modules/field-template';

export default class Field extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {
    this.container.onclick = (event) => {
      if (this.store.getState().userData.isWin) return;
      if (event.target && event.target.closest('[data-type="cell"]')) {
        const elem = event.target.closest('[data-type="cell"]');
        const id = elem.getAttribute('data-cell-id').split(':');
        this.store.dispatch({
          type: 'CELL_CLICK',
          event: {
            button: MOUSE_BUTTONS.leftButton,
            x: +id[0],
            y: +id[1],
          },
        });

        const {userMatrix} = this.store.getState().userData;
        if (userMatrix[+id[0]][+id[1]]) {
          elem.classList.add('frame__cell_black');
          elem.textContent = '';
        } else {
          elem.classList.remove('frame__cell_black');
          elem.textContent = '';
        }

        /* eslint-disable-next-line no-underscore-dangle */
        if (this.store.getState().userData.isWin) this._triggerEvent('endgame');
      }
    };

    // mouse right click
    this.container.oncontextmenu = (event) => {
      event.preventDefault();

      if (this.store.getState().userData.isWin) return;
      if (event.target && event.target.closest('[data-type="cell"]')) {
        const elem = event.target.closest('[data-type="cell"]');
        const id = elem.getAttribute('data-cell-id').split(':');
        this.store.dispatch({
          type: 'CELL_CLICK',
          event: {
            button: MOUSE_BUTTONS.rightButton,
            x: +id[0],
            y: +id[1],
          },
        });

        const {userMatrix} = this.store.getState().userData;
        if (userMatrix[+id[0]][+id[1]] === false && userMatrix[+id[0]][+id[1]] !== null) {
          elem.classList.remove('frame__cell_black');
          elem.textContent = '×';
        } else {
          elem.textContent = '';
        }
      }
    };
  }


  getTopClues() {
    const size = this.store.getState().fieldSize;
    const {topClues} = this.store.getState();
    let columns = '';

    for (let index = 0; index < size; index += 1) {
      const clues = topClues[index]
        .map((item) => `<span>${item}</span>`)
        .reverse()
        .join('');
      columns += `<div class="top-clues__column">${clues}</div>`;
    }

    return `<div class="field__top-clues top-clues">
              ${columns}
            </div>`;
  }

  getLeftClues() {
    const size = this.store.getState().fieldSize;
    const {leftClues} = this.store.getState();
    let rows = '';

    for (let index = 0; index < size; index += 1) {
      const clues = leftClues[index]
        .map((item) => `${item} `)
        .reverse()
        .join('');
      rows += `<div class="left-clues__row">${clues}</div>`;
    }

    return `
            <div class="field__left-clues left-clues">
              ${rows}
            </div>
    `;
  }

  getFieldRow(numb, fieldRow) {
    const size = this.store.getState().fieldSize;

    let rows = '';

    for (let index = 0; index < size; index += 1) {
      const style = fieldRow[index] ? 'frame__cell_black' : '';
      const content = fieldRow[index] === false ? '×' : '';
      rows += `<div class="frame__cell ${style}" data-col="${index + 1}" data-type="cell" data-cell-id="${numb}:${index}">${content}</div>`;
    }

    return `
    <div class="frame__row" data-row="${numb + 1}">
      ${rows}
    </div>
    `;
  }

  toHTML() {
    const size = this.store.getState().fieldSize;
    // const {gameMatrix} = this.store.getState();
    const {userMatrix} = this.store.getState().userData;
    let rows = '';

    for (let index = 0; index < size; index += 1) {
      rows += this.getFieldRow(index, userMatrix[index]);
    }

    return `
            <img class="field__mimipic" src="./assets/templates/${SELECT_TEMPLATE}.jpg" alt="mimipic">
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
