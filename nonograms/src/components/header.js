import Component from './component';
import {templates} from '../modules/field-template';
import {randomInteger} from '../core/utils';

export default class Header extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {
    this.container.onclick = (event) => {
      if (event.target && event.target.closest('[data-type="selectNewGame"]')) {
        this.store.dispatch({
          type: 'SET_CURRENT_PAGE',
          currentPage: 'selectGame',
        });
        /* eslint-disable-next-line no-underscore-dangle */
        this._triggerEvent('selectGame');
      } else if (event.target && event.target.closest('[data-type="reStartGame"]')) {
        /* eslint-disable-next-line no-underscore-dangle */
        this._triggerEvent('reStartgame');
      } else if (event.target && event.target.closest('[data-type="randomGame"]')) {
        // !!!
        const gameNames = Object.keys(templates);
        const gameName = gameNames[randomInteger(0, gameNames.length - 1)];
        // eslint-disable-next-line no-underscore-dangle
        this._triggerEvent('randomGame', {gameName});
      }
    };
  }

  destroy() {}

  toHTML() {
    return `
    <div class="container header__container">
      <nav class="menu">
        <button data-type="selectNewGame">Select new game</button>
        <button data-type="reStartGame">Reset game</button>
        <button data-type="randomGame">Random game</button>
        <button>Continue last game</button>
        <button>Solution</button>
      </nav>
    </div>
    `;
  }

  render = () => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
