import { Store } from '../../types/redux-type';

export default class App {
  private container: HTMLBodyElement;
  public store: Store;

  constructor(props: Store) {
    this.container = document.body as HTMLBodyElement;
    this.store = props;
    this.init();
  }

  public init(): void {}

  public destroy(): void {}

  private toHTML(): string {
    return '<h1>Race</h1>';
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    return this.container;
  };
}
