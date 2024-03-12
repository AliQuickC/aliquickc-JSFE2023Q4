import BaseComponent from '../../core/base-component';
import { Store } from '../../types/redux-type';

export default class GamePage extends BaseComponent {
  protected store: Store;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  public destroy(): void {}

  private toHTML(): string {
    return `
    <div class="container game__container">
      Game page
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
