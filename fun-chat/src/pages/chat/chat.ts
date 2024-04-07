import BaseComponent from '../../component/base-component/base-component';
import { Store } from '../../types/redux-type';

export default class Chat extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  private toHTML(): string {
    return `<div class="container chat__container">
      <h2>Chat</h2>
    </div>`;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
