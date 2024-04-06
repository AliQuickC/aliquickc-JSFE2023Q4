import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';

export default class Footer extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  public destroy(): void {}

  private toHTML(): string {
    return `
    <div class="container footer__container">
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
