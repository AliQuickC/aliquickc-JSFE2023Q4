import { Store } from '../../types/redux-type';
import Publisher from './publisher';

export default abstract class BaseComponent extends Publisher {
  protected container: HTMLElement;
  protected store: Store;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super();
    this.container = document.createElement(tagName);
    this.store = props;
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
