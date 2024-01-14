import Component from './component';

export default class Keyboard extends Component {
  CHARS = [
    'ё',
    'й',
    'ц',
    'у',
    'к',
    'е',
    'н',
    'г',
    'ш',
    'щ',
    'з',
    'х',
    'ъ',
    'ф',
    'ы',
    'в',
    'а',
    'п',
    'р',
    'о',
    'л',
    'д',
    'ж',
    'э',
    'я',
    'ч',
    'с',
    'м',
    'и',
    'т',
    'ь',
    'б',
    'ю',
  ];

  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {
    this.container.onclick = (event) => {
      if (event.target) {
        const key = event.target.closest('[data-char]');
        if (key) {
          key.disabled = true;
          this.store.dispatch({type: 'INPUT_CHAR', char: key.dataset.char});
          /* eslint-disable-next-line no-underscore-dangle */
          this._triggerEvent('onbutton');
        }
      }
    };

    document.addEventListener('keydown', this.physicalKeyboardInput);
  }

  physicalKeyboardInput = (event) => {
    if (
      this.CHARS.indexOf(event.key.toLowerCase()) !== -1 &&
      this.store.getState().userData.UsedChars.indexOf(event.key.toUpperCase() !== -1)
    ) {
      const key = this.container.querySelector(`[data-char="${event.key.toLowerCase()}"]`);
      key.disabled = true;
      this.store.dispatch({type: 'INPUT_CHAR', char: event.key});
      /* eslint-disable-next-line no-underscore-dangle */
      this._triggerEvent('onbutton');
    }
  };

  enabledAllButtons = () => {
    const buttons = this.container.querySelectorAll('[data-char]');
    buttons.forEach((btn) => {
      const elem = btn;
      elem.disabled = false;
    });
  };

  destroy() {}

  toHTML() {
    const keyElems = this.CHARS.map((char) => `<button class="keyboard__button" data-char="${char}">${char}</button>`);

    return keyElems.join('');
  }

  render = () => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
