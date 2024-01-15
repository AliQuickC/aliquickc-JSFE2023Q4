import Component from './component';

export default class Modal extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.container.id = 'dialog';
    this.store = props;
    this.init();
  }

  init() {
    this.container.onclick = (event) => {
      if (event.target && event.target.closest('#modal-close-button')) {
        /* eslint-disable-next-line no-underscore-dangle */
        this._triggerEvent('startgame');
      }
    };
  }

  destroy() {}

  toHTML() {
    const {gameFinishRezult, currentQuestion} = this.store.getState().userData;
    const {word} = this.store.getState().riddles[currentQuestion];
    let rezult = '';

    if (gameFinishRezult === 'guessed') {
      rezult = 'Выигрыш!';
    } else {
      rezult = 'Поражение!';
    }

    return `
      <div class="dialog__window rezult-modal">
        <div class="game-rezult">${rezult}</div>
        <div class="description">Секретное слово: ${word}</div>
        <button class="rezult-modal__close-button" id="modal-close-button">Начать новую игру</button>
        </div>
      </div>
      `;
  }

  openModal = () => {
    this.render();
    this.container.showModal();
    this.container.classList.add('open');
  };

  render = () => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
