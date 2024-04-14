import WebSocketController from '../../modules/ws-api';
import { Page, publisherActionType } from '../../types/enum';
import { AuthenticationEvent, UserEvent, UserLisReadyEvent, publisherEvent } from '../../types/publisher-type';
import { ActionID, Store } from '../../types/redux-type';
import Footer from '../footer/footer';
import Header from '../header/header';
import Main from '../main/main';
import ModalDialog from '../modal-dialog/modal-dialog';

export default class App {
  private container: HTMLBodyElement;
  private store: Store;
  private header!: Header;
  private main!: Main;
  private footer!: Footer;
  private wsController!: WebSocketController;
  private modalDialog!: ModalDialog;

  constructor(props: Store) {
    this.container = document.body as HTMLBodyElement;
    this.store = props;
    this.init();
  }

  private init(): void {
    this.enableRouterChange();
    this.store.subscribe(this.render);

    this.modalDialog = new ModalDialog(this.store);
    this.wsController = new WebSocketController(this.modalDialog);

    this.wsController.addEventListener(publisherActionType.AuthenticationSuccess, (event: publisherEvent): void => {
      this.store.dispatch({
        type: ActionID.Authentication,
        login: (event as AuthenticationEvent).login,
        password: (event as AuthenticationEvent).password,
      });
    });

    this.wsController.addEventListener(publisherActionType.UserLisReady, (event: publisherEvent): void => {
      this.store.dispatch({
        type: ActionID.RenewUserList,
        userList: (event as UserLisReadyEvent).userList,
      });
    });

    this.wsController.addEventListener(publisherActionType.LogoutSuccess, (): void => {
      this.store.dispatch({ type: ActionID.Logout });
    });

    this.wsController.addEventListener(publisherActionType.AddUser, (event: publisherEvent): void => {
      this.store.dispatch({ type: ActionID.AddUser, user: (event as UserEvent).user });
    });

    this.wsController.addEventListener(publisherActionType.RemoveUser, (event: publisherEvent): void => {
      this.store.dispatch({ type: ActionID.RemoveUser, user: (event as UserEvent).user });
    });
  }

  public destroy(): void {}

  // private showModal = (message: string): void => {
  //   this.modalDialog.showModal(message);
  // };

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
        const { isLogin } = this.store.getState().userData;
        let page: Page = pageHash.toLocaleLowerCase() as Page;

        if (page === Page.Chat && !isLogin) {
          page = Page.Login;
        } else if (page === Page.Login && isLogin) {
          page = Page.Chat;
        }

        this.store.dispatch({
          type: ActionID.SetPage,
          page: page,
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
    this.container.append(this.modalDialog.render());

    // this.modalDialog.showModal('adfhfgdh');

    this.container.onkeydown = (event: KeyboardEvent): void => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        if (!this.modalDialog.isShowModal) {
          this.main.enterKeyDown();
        }
      }
    };

    return this.container;
  };
}
