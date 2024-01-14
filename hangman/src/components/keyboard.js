import Component from './component';

export default class Keyboard extends Component {
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
          /* eslint-disable-next-line no-underscore-dangle */
          this._triggerEvent('onbutton', {key: key.dataset.char});
        }
      }
    };
  }

  enabledAllButtons = () => {
    const buttons = this.container.querySelectorAll('[data-char]');
    buttons.forEach((btn) => {
      const elem = btn;
      elem.disabled = false;
    });
  };

  destroy() {}

  toHTML() {
    const chars = [
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

    const keyElems = chars.map((char) => `<button class="keyboard__button" data-char="${char}">${char}</button>`);

    return keyElems.join('');
  }

  render() {
    this.container.innerHTML = this.toHTML();
    return this.container;
  }
}
