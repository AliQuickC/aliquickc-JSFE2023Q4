import Component from './component';

export default class InfoPanel extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {}

  destroy() {
    this.container.remove();
  }

  toHTML() {
    const {isWin} = this.store.getState().userData;
    return `
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
