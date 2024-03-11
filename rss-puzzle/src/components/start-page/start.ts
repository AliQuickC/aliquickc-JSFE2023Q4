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
      <h2 class="start__title">RSS-Puzzle</h2>
      <p class="start__description">
        This is a fun game. Here you need to collect sentences from words. If you collect all the proposals, a painting by a famous artist will open.
      </p>
      <button class="start__start-button">Start</button>
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
