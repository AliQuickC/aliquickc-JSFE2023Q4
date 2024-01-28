import Component from './component';

export default class InfoPanel extends Component {
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
    const {isWin} = this.store.getState().userData;
    return `
    <button class="panel__start-button" data-type="startGame">Start new game</button>
    <p class="panel__information ${isWin ? 'panel__information_visible' : ''}">
      Great!
      <br>
      You have solved the nonogram!
    </p>
    `;
  }

  render = () => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
