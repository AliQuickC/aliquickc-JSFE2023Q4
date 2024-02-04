import Component from './component';

export default class Header extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  /* eslint-disable no-underscore-dangle */
  init() {
    this.container.onclick = (event) => {
      if (!event.target || !event.target.closest('[data-type]')) return;

      const type = event.target.closest('[data-type]').getAttribute('data-type');
      switch (type) {
        case 'selectNewGame':
          this._triggerEvent('selectHeaderNav', {type: 'selectGame'});
          break;
        case 'randomGame':
          this._triggerEvent('selectHeaderNav', {type: 'randomGame'});
          break;
        case 'loadGame':
          this._triggerEvent('selectHeaderNav', {type: 'loadGame'});
          break;
        case 'showRezults':
          this._triggerEvent('selectHeaderNav', {type: 'showRezults'});
          break;
        case 'resetGame':
          this._triggerEvent('selectHeaderNav', {type: 'resetGame'});
          break;
        case 'showSolution':
          this._triggerEvent('selectHeaderNav', {type: 'showSolution'});
          break;
        case 'saveGame':
          const {userData} = this.store.getState();
          if (userData && !userData.isWin && !userData.isGameEnd) {
            this.store.dispatch({
              type: 'SAVE_GAME',
            });
          }
          break;
        default:
          break;
      }
    };
  }

  toHTML() {
    const {currentPage} = this.store.getState().userData;
    return `
    <div class="container header__container">
      <nav class="menu">
        <button data-type="selectNewGame">Select new game</button>
        <button data-type="randomGame">Random game</button>
        <button data-type="loadGame">Continue last game</button>
        ${
          currentPage === 'gameField'
            ? `
        <button data-type="saveGame">Save game</button>
        <button data-type="resetGame">Reset game</button>
        <button data-type="showSolution">Solution</button>
        `
            : ''
        }
        <button data-type="showRezults">Rezults</button>
      </nav>
    </div>
    `;
  }

  render = () => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
