import Component from './component';

export default class Keyboard extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {}

  destroy() {}

  toHTML() {
    return `
      <div class="keyboard"></div>`;
  }

  render() {
    this.container.innerHTML = this.toHTML();
    return this.container;
  }
}
