import Component from './component';

export default class Quiz extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {}

  destroy() {}

  toHTML() {
    return `
      <div class="quiz"></div>`;
  }

  render() {
    this.container.innerHTML = this.toHTML();
    return this.container;
  }
}
