import Publisher from './publisher';

export default abstract class BaseComponent extends Publisher {
  protected container: HTMLElement;

  constructor(tagName: keyof HTMLElementTagNameMap, className: string) {
    super();
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  public render(): HTMLElement {
    return this.container;
  }

  public destroy(): void {
    this.container.innerHTML = '';
    this.container.remove();
  }
}
