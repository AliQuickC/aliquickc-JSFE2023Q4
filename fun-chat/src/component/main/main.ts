import WebSocketController from '../../modules/ws-api';
import About from '../../pages/about/about';
import Chat from '../../pages/chat/chat';
import ErrorPage from '../../pages/error/error';
import LoginPage from '../../pages/login/login-page';
import { Page } from '../../types/enum';
import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';

export default class Main extends BaseComponent {
  private page!: LoginPage | Chat | About | ErrorPage;
  private wsController: WebSocketController;

  constructor(
    props: { store: Store; wsController: WebSocketController },
    tagName: keyof HTMLElementTagNameMap,
    className: string
  ) {
    super(props.store, tagName, className);
    this.store = props.store;
    this.wsController = props.wsController;
    this.init();
  }

  public init(): void {}

  public enterKeyDown = (): void => {
    if (this.store.getState().appData.currentPage === Page.Login) {
      (this.page as LoginPage).enterKeyDown();
    }
  };

  public render = (): HTMLElement => {
    if (this.page) {
      this.page.destroy();
    }

    this.container.innerHTML = '';

    const { currentPage } = this.store.getState().appData;
    switch (currentPage) {
      case Page.Login:
        this.page = new LoginPage({ store: this.store, wsController: this.wsController }, 'div', 'login');
        break;
      case Page.Chat:
        this.page = new Chat(this.store, 'div', 'chat');
        break;
      case Page.About:
        this.page = new About(this.store, 'div', 'about');
        break;
      case Page.Error:
        this.page = new ErrorPage(this.store, 'div', 'error');
        break;
      default:
        break;
    }
    window.location.hash = currentPage;

    this.container.append(this.page.render());

    return this.container;
  };
}
