import Component from './component';
import MOUSE_BUTTONS from '../modules/constants';

const timeZero = 0;
const volumeDefault = 0.2;
const SOUND_CELL_CLICK = '../assets/audio/bone.mp3';
const SOUND_VICTORY = '../assets/audio/victory.mp3';

export default class Field extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  mouseClickHandler(event) {
    if (event.button === MOUSE_BUTTONS.rightButton) {
      event.preventDefault();
    }

    if (this.store.getState().userData.isGameEnd) return;
    if (event.target && event.target.closest('[data-type="cell"]')) {
      const elem = event.target.closest('[data-type="cell"]');
      const id = elem.getAttribute('data-cell-id').split(':');
      this.store.dispatch({
        type: 'CELL_CLICK',
        event: {
          // MOUSE_BUTTONS.leftButton | MOUSE_BUTTONS.rightButton
          button: event.button,
          x: +id[0],
          y: +id[1],
        },
      });

      const {userMatrix} = this.store.getState().userData;
      if (event.button === MOUSE_BUTTONS.leftButton) {
        if (userMatrix[+id[0]][+id[1]]) {
          elem.classList.add('frame__cell_black');
          elem.textContent = '';
        } else {
          elem.classList.remove('frame__cell_black');
          elem.textContent = '';
        }
      } else if (event.button === MOUSE_BUTTONS.rightButton) {
        if (userMatrix[+id[0]][+id[1]] === false && userMatrix[+id[0]][+id[1]] !== null) {
          elem.classList.remove('frame__cell_black');
          elem.textContent = '×';
        } else {
          elem.textContent = '';
        }
      }

      this.audio.play();
      /* eslint-disable no-underscore-dangle */
      this._triggerEvent('onclick');
      if (this.store.getState().userData.isWin) {
        this.audioVictory.play();
        const {selectedTemplate} = this.store.getState().userData;
        const {timerValue} = this.store.getState().userData;
        const {fieldSize} = this.store.getState();
        const rezult = {
          selectedTemplate,
          fieldSize,
          timerValue,
        };
        this.store.dispatch({
          type: 'SAVE_REZULT',
          rezult,
        });
        this._triggerEvent('endgame');
      }
    }
  }

  init() {
    this.audio = new Audio();
    this.audio.currentTime = timeZero;
    this.audio.volume = volumeDefault;
    this.audio.src = SOUND_CELL_CLICK;

    this.audioVictory = new Audio();
    this.audioVictory.currentTime = timeZero;
    this.audioVictory.volume = volumeDefault;
    this.audioVictory.src = SOUND_VICTORY;

    this.container.onclick = (event) => {
      this.mouseClickHandler(event);
    };

    // mouse right click
    this.container.oncontextmenu = (event) => {
      this.mouseClickHandler(event);
    };
  }

  destroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
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
    const {userMatrix} = this.store.getState().userData;
    const {selectedTemplate} = this.store.getState().userData;
    let rows = '';

    for (let index = 0; index < size; index += 1) {
      rows += this.getFieldRow(index, userMatrix[index]);
    }

    return `
            <img class="field__mimipic" src="./assets/templates/${selectedTemplate}.jpg" alt="mimipic">
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
