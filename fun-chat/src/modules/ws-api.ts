/* eslint-disable @typescript-eslint/no-unused-vars */
import Publisher from '../component/base-component/publisher';
import ModalDialog from '../component/modal-dialog/modal-dialog';
import {
  AuthenticationErrorMessage,
  ServerReadyState,
  messageId,
  messageType,
  publisherActionType,
} from '../types/enum';
import {
  AuthenticationMsg,
  LogoutMsg,
  ResponseAuthentication,
  ServerResponse,
  UserInfo,
  UserParams,
} from '../types/types';

const baseURL = 'ws://localhost:4000';

const allAuthenticatedUsersMsg = {
  id: messageId.UsersList,
  type: messageType.UserActive,
  payload: null,
};

const allUnauthorizedUsersMsg = {
  id: messageId.UsersList,
  type: messageType.UserInactive,
  payload: null,
};

function logoutMsgCreator(name: string, userPassword: string): LogoutMsg {
  const login = name;
  const password = userPassword;
  return {
    id: messageId.LogOut,
    type: messageType.Userlogout,
    payload: {
      user: {
        login,
        password,
      },
    },
  };
}

function authenticationMsgCreator(name: string, userPassword: string): AuthenticationMsg {
  const login = name;
  const password = userPassword;
  return {
    id: messageId.Authentication,
    type: messageType.UserLogin,
    payload: {
      user: {
        login,
        password,
      },
    },
  };
}

export default class WebSocketController extends Publisher {
  private ws: WebSocket | null = null;
  private msgAuthentication: AuthenticationMsg = {} as AuthenticationMsg;
  private modalDialog: ModalDialog;
  private authenticatedUsers: UserInfo[] | null = null;
  private unauthorizedUsers: UserInfo[] | null = null;
  private userParamsCache: UserParams = {
    login: null,
    password: null,
  };

  constructor(modalDialog: ModalDialog) {
    super();
    this.modalDialog = modalDialog;
  }

  public init(): void {}

  public destroy(): void {
    this.closeServer();
  }

  get wsState(): ServerReadyState {
    if (this.ws) {
      return this.ws.readyState;
    }
    return ServerReadyState.CLOSED;
  }

  private errorHandler(error: Event): void {
    if ((error.currentTarget as WebSocket).readyState === ServerReadyState.CLOSED) {
      console.log('Не удалось установить соединение с сервером!');
    }
  }

  private responseAuthentication = (eventData: ResponseAuthentication): void => {
    if (eventData.type === messageType.UserLogin) {
      // this._triggerEvent(publisherActionType.AuthenticationSuccess, {
      //   login: eventData.payload.user.login,
      //   password: this.userParamsCache.password,
      // });

      this.getUserList();
    } else if (eventData.type === messageType.Error) {
      if (eventData.payload.error === AuthenticationErrorMessage.AlreadyAuthorized) {
        this.modalDialog.showModal('пользователь с таким именем, уже вошол в чат!');
      } else if (eventData.payload.error === AuthenticationErrorMessage.IncorrectPassword) {
        this.modalDialog.showModal('Введен неверный пароль!');
      }
    }
  };

  private getUserList = (): void => {
    this.authenticatedUsers = null;
    this.unauthorizedUsers = null;
    (this.ws as WebSocket).send(JSON.stringify(allAuthenticatedUsersMsg));
    (this.ws as WebSocket).send(JSON.stringify(allUnauthorizedUsersMsg));
  };

  private messageHandler = (event: MessageEvent): void => {
    const eventData: ServerResponse = JSON.parse(event.data);
    console.log(eventData);

    if (eventData.id === messageId.Authentication) {
      this.responseAuthentication(eventData);
    } else if (eventData.id === messageId.LogOut) {
      if (eventData.type === messageType.Userlogout && !eventData.payload.user.isLogined) {
        this._triggerEvent(publisherActionType.LogoutSuccess);
        this.closeServer();
        this.userParamsCache = {
          login: null,
          password: null,
        };
        this.ws = null;
      }
    } else if (eventData.id === messageId.UsersList) {
      const { users } = eventData.payload;
      if (eventData.type === messageType.UserActive) {
        this.authenticatedUsers = users;
      } else if (eventData.type === messageType.UserInactive) {
        this.unauthorizedUsers = users;
      }

      if (this.authenticatedUsers && this.unauthorizedUsers) {
        const userList: UserInfo[] = this.authenticatedUsers.concat(this.unauthorizedUsers);

        this._triggerEvent(publisherActionType.UserLisReady, { userList, LoginParams: this.userParamsCache });
      }
    } else if (eventData.id === null) {
      if (eventData.type === messageType.UserExternalLogin) {
        const user: UserInfo = eventData.payload.user;
        this._triggerEvent(publisherActionType.AddUser, { user });
      } else if (eventData.type === messageType.UserExternalLogout) {
        const user: UserInfo = eventData.payload.user;
        this._triggerEvent(publisherActionType.RemoveUser, { user });
      }
    }
  };

  private wsOpenHandler = (event: Event): void => {
    (event.target as WebSocket).send(JSON.stringify(this.msgAuthentication));
  };

  public connectToServer = (name: string, password: string): void => {
    this.userParamsCache = { login: name, password: password };

    this.msgAuthentication = authenticationMsgCreator(name, password);

    this.ws = new WebSocket(baseURL);
    this.ws.addEventListener('error', this.errorHandler);
    this.ws.addEventListener('message', this.messageHandler);
    this.ws.addEventListener('open', this.wsOpenHandler);
  };

  public userLogout = (name: string, password: string): void => {
    const logoutMsg = logoutMsgCreator(name, password);
    this.ws?.send(JSON.stringify(logoutMsg));
  };

  public closeServer = (): void => {
    if (this.ws) {
      this.ws.removeEventListener('error', this.errorHandler);
      this.ws.removeEventListener('message', this.messageHandler);
      this.ws.removeEventListener('open', this.wsOpenHandler);
      this.ws.close();
    }
  };
}
