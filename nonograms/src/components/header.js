import Component from './component';

export default class Header extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {
    this.container.onclick = (event) => {
      if (event.target && event.target.closest('[data-type="startGame"]')) {
        /* eslint-disable-next-line no-underscore-dangle */
        this._triggerEvent('startgame');
      }
    };
  }

  destroy() {
    this.container.remove();
  }

  toHTML() {
    return `
    <div class="container header__container">
      <nav class="menu">
        <button data-type="startGame">Select new game</button>
        <button>Restart game</button>
        <button>Random game</button>
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
