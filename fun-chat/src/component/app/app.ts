import WebSocketController from '../../modules/ws-api';
import { Page, publisherActionType } from '../../types/enum';
import { AuthenticationEvent, publisherEvent } from '../../types/publisher-type';
import { ActionID, Store } from '../../types/redux-type';
import Footer from '../footer/footer';
import Header from '../header/header';
import Main from '../main/main';

export default class App {
  private container: HTMLBodyElement;
  private store: Store;
  private header!: Header;
  private main!: Main;
  private footer!: Footer;
  private wsController!: WebSocketController;

  constructor(props: Store) {
    this.container = document.body as HTMLBodyElement;
    this.store = props;
    this.init();
  }

  private init(): void {
    this.enableRouterChange();
    this.store.subscribe(this.render);

    this.wsController = new WebSocketController();

    this.wsController.addEventListener(publisherActionType.AuthenticationSuccess, (event: publisherEvent): void => {
      this.store.dispatch({
        type: ActionID.Authentication,
        login: (event as AuthenticationEvent).login,
        password: (event as AuthenticationEvent).password,
      });
    });

    this.wsController.addEventListener(publisherActionType.LogoutSuccess, (): void => {
      this.store.dispatch({ type: ActionID.Logout });
    });
  }

  public destroy(): void {}

  private enableRouterChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      const splitted = hash.toLocaleLowerCase().split('');
      const first = splitted[0]?.toUpperCase();
      splitted.splice(0, 1);
      const pageHash = [first, ...splitted].join('');

      const hasPage = Object.prototype.hasOwnProperty.call(Page, pageHash);
      if (!hasPage) {
        window.location.hash = Page.Error;
      } else {
        this.store.dispatch({
          type: ActionID.SetPage,
          page: pageHash.toLocaleLowerCase() as Page,
        });
      }
    });
  }

  public render = (): HTMLElement => {
    this.header?.destroy();
    this.main?.destroy();
    this.footer?.destroy();
    this.container.innerHTML = '';

    this.header = new Header({ store: this.store, wsController: this.wsController }, 'header', 'header');
    this.main = new Main({ store: this.store, wsController: this.wsController }, 'main', 'main');
    this.footer = new Footer(this.store, 'footer', 'footer');

    this.container.append(this.header.render());
    this.container.append(this.main.render());
    this.container.append(this.footer.render());

    this.container.onkeydown = (event: KeyboardEvent): void => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        this.main.enterKeyDown();
      }
    };

    return this.container;
  };
}
