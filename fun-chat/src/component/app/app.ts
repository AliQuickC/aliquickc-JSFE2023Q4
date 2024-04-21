import WebSocketController from '../../modules/ws-api';
import { Page, publisherActionType } from '../../types/enum';
import {
  UserLoginLogoutEvent,
  UserLisReadyEvent,
  publisherEvent,
  MessageDeletedEvent,
  MessageEditEvent,
} from '../../types/publisher-type';
import { ActionID, Store } from '../../types/redux-type';
import { MessageHistoryInfo } from '../../types/types';
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
    this.wsController = new WebSocketController();

    this.wsController.addEventListener(publisherActionType.AlreadyAuthorized, (): void => {
      this.modalDialog.showModal(publisherActionType.AlreadyAuthorized);
    });
    this.wsController.addEventListener(publisherActionType.IncorrectPassword, (): void => {
      this.modalDialog.showModal(publisherActionType.IncorrectPassword);
    });

    this.wsController.addEventListener(publisherActionType.ServerIsNotAvailable, (): void => {
      this.modalDialog.showModal(publisherActionType.ServerIsNotAvailable);
    });

    this.wsController.addEventListener(publisherActionType.UserListReady, (event: publisherEvent): void => {
      this.modalDialog.closeModal();
      this.store.dispatch({
        type: ActionID.RenewUserList,
        userList: (event as UserLisReadyEvent).userList,
        loginParams: (event as UserLisReadyEvent).LoginParams,
      });
    });

    this.wsController.addEventListener(publisherActionType.LogoutSuccess, (): void => {
      this.store.dispatch({ type: ActionID.Logout });
    });

    this.wsController.addEventListener(publisherActionType.AddUser, (event: publisherEvent): void => {
      this.store.dispatch({ type: ActionID.AddUser, user: (event as UserLoginLogoutEvent).user });
    });

    this.wsController.addEventListener(publisherActionType.RemoveUser, (event: publisherEvent): void => {
      this.store.dispatch({ type: ActionID.RemoveUser, user: (event as UserLoginLogoutEvent).user });
    });

    this.wsController.addEventListener(
      publisherActionType.UpdateMessageHistorySelectUser,
      (event: publisherEvent): void => {
        this.store.dispatch({
          type: ActionID.UpdateMessageHistorySelectUser,
          messageHistoryInfo: event as MessageHistoryInfo,
        });
      }
    );

    this.wsController.addEventListener(publisherActionType.Disconnect, (): void => {
      const { isLogin } = this.store.getState().loginedUser;
      if (isLogin) {
        this.store.dispatch({ type: ActionID.DisconnectSetPage, page: Page.Chat });
      } else {
        if (!this.modalDialog.isShowModal) {
          this.modalDialog.showModal(publisherActionType.Disconnect);
        }
      }
    });

    this.wsController.addEventListener(publisherActionType.DeliveryStatusChange, this.getMessageHistory);

    this.wsController.addEventListener(publisherActionType.ReadStatusChange, this.getMessageHistory);

    this.wsController.addEventListener(publisherActionType.MessageDeleted, (event: publisherEvent) => {
      if (this.store.getState().currentMessageHistory) {
        const messageId = (event as MessageDeletedEvent).deleteStatus.id;
        this.store.dispatch({ type: ActionID.DeleteMessage, messageId });
      }
    });

    this.wsController.addEventListener(publisherActionType.EditStatusChange, (event: publisherEvent) => {
      this.store.dispatch({ type: ActionID.EditMessage, editStatus: (event as MessageEditEvent).editStatus });
    });
  }

  private getMessageHistory = (): void => {
    const { selectedUser } = this.store.getState().appData;
    const loginUser = this.store.getState().loginedUser.login as string;
    if (selectedUser) {
      this.wsController.sendRequestMessageHistory(loginUser, selectedUser);
    }
  };

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
        const { isLogin } = this.store.getState().loginedUser;
        let page: Page = pageHash.toLocaleLowerCase() as Page;

        if (page === Page.Chat && !isLogin) {
          page = Page.Login;
        } else if (page === Page.Login && isLogin) {
          page = Page.Chat;
        } else if (page === Page.Login && !isLogin) {
          page = Page.Login;
        }

        const currentPage = this.store.getState().appData.currentPage;
        if (page !== currentPage) {
          this.store.dispatch({
            type: ActionID.SetPage,
            page: page,
          });
        }
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

    this.container.onkeydown = (event: KeyboardEvent): void => {
      const { currentPage } = this.store.getState().appData;
      if (currentPage === Page.Login && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        if (!this.modalDialog.isShowModal) {
          this.main.enterKeyDown();
        }
      }
    };

    return this.container;
  };
}
