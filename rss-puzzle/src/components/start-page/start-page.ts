import BaseComponent from '../../core/base-component';
import { Store } from '../../types/redux-type';
import { ActionID } from '../../types/enum';

export default class StartPage extends BaseComponent {
  public store: Store;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {
    this.container.onclick = (event: Event): void => {
      if (event.target && (event.target as HTMLElement).closest('[data-type="startButton"]')) {
        this.store.dispatch({
          type: ActionID.StartGame,
        });
      }
    };
  }

  public destroy(): void {}

  private toHTML(): string {
    const { firstName, lastName } = this.store.getState().userData;
    return `
    <div class="container start__container">
      <h2 class="start__title">RSS-Puzzle</h2>
      <p class="start__description">
        This is a fun game. Here you need to collect sentences from words. If you collect all the proposals, a painting by a famous artist will open.
      </p>
      <p class="start__greet">
        Hello<br>
        dear ${firstName} ${lastName}<br>
        press the "Start" button to start the game
      </p>
      <button class="start__start-button" data-type="startButton">Start</button>
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
