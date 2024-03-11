import BaseComponent from '../../core/base-component';
import { Store } from '../../types/redux-type';

export default class StartPage extends BaseComponent {
  public store: Store;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  public destroy(): void {}

  private toHTML(): string {
    return `
    <div class="container start__container">
      Start
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
