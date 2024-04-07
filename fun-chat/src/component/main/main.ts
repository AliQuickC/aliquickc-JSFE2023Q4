import LoginPage from '../../pages/login/login-page';
import { Page } from '../../types/enum';
import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';

export default class Main extends BaseComponent {
  private page!: LoginPage;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  public enterKeyDown = (): void => {
    if (this.store.getState().appData.currentPage === Page.Login) {
      this.page.enterKeyDown();
    }
  };

  public render = (): HTMLElement => {
    if (this.page) {
      this.page.destroy();
    }
    this.container.innerHTML = '';

    switch (this.store.getState().appData.currentPage) {
      case Page.Login:
        this.page = new LoginPage(this.store, 'div', 'login');
        break;
      default:
        break;
    }

    this.container.append(this.page.render());
    return this.container;
  };
}
