import Component from './component';

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
        <button>Random game</button>
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
