import BaseComponent from '../../core/base-component';
import { Store } from '../../types/redux-type';
import { Page } from '../../types/types';
import LoginPage from '../login-page/login';
import StartPage from '../start-page/start';

export default class Main extends BaseComponent {
  protected store: Store;
  private page!: LoginPage | StartPage;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  public destroy(): void {}

  public render = (): HTMLElement => {
    if (this.page) {
      this.page.destroy();
    }
    this.container.innerHTML = '';

    switch (this.store.getState().appData.currentPage) {
      case Page.Login:
        this.page = new LoginPage(this.store, 'div', 'login');
        break;
      case Page.Start:
        this.page = new StartPage(this.store, 'div', 'start');
        break;

      default:
        break;
    }

    this.container.append(this.page.render());
    return this.container;
  };
}
