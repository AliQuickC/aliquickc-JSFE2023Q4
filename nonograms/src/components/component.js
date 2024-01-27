import Publisher from '../core/publisher';

export default class Component extends Publisher {
  constructor(tagName, className) {
    super();
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  render() {
    return this.container;
  }

  destroy() {
    this.container.remove();
  }
}
