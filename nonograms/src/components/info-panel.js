import Component from './component';

export default class InfoPanel extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {}

  toHTML() {
    const {isWin} = this.store.getState().userData;
    const {timerValue} = this.store.getState().userData;

    return `
    <p class="panel__information ${isWin ? 'panel__information_visible' : ''}">
      Great!
      <br>
      You have solved the nonogram in ${timerValue} seconds!
    </p>
    `;
  }

  render = () => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
