/* eslint-disable @typescript-eslint/no-unused-vars */
import Publisher from '../component/base-component/publisher';
import { ServerReadyState, messageId, publisherActionType } from '../types/enum';
import { AuthenticationLogin, AuthenticationMsg, LogoutMsg } from '../types/types';

const baseURL = 'ws://localhost:4000';

const allAuthenticatedUsersMsg = {
  id: 'AuthenticatedUsers',
  type: 'USER_ACTIVE',
  payload: null,
};

const allUnauthorizedUsersMsg = {
  id: 'UnauthorizedUsers',
  type: 'USER_INACTIVE',
  payload: null,
};

function logoutMsgCreator(name: string, userPassword: string): LogoutMsg {
  const login = name;
  const password = userPassword;
  return {
    id: 'logOut',
    type: 'USER_LOGOUT',
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
    id: 'Authentication',
    type: 'USER_LOGIN',
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
  private passwordCache!: string;

  public init(): void {}

  public destroy(): void {
    this.closeServer();
  }

  private errorHandler(error: Event): void {
    if ((error.currentTarget as WebSocket).readyState === ServerReadyState.CLOSED) {
      console.log('Не удалось установить соединение с сервером!');
    }
  }

  private responseAuthentication = (eventData: AuthenticationLogin): void => {
    if (eventData.type === 'USER_LOGIN') {
      //  ||
      // (eventData.type === 'ERROR' && eventData.payload.error === AuthenticationError.AlreadyAuthorized))
      // const { login: name, password } = eventData.payload.user;
      this._triggerEvent(publisherActionType.AuthenticationSuccess, {
        login: eventData.payload.user.login,
        password: this.passwordCache,
      });
      // Authentication Success
    }
  };

  private messageHandler = (event: MessageEvent): void => {
    const eventData = JSON.parse(event.data);
    console.log(eventData);

    if (eventData.id === messageId.Authentication) {
      this.responseAuthentication(eventData);
    } else if (eventData.id === messageId.LogOut) {
      if (eventData.type === 'USER_LOGOUT' && !eventData.payload.user.isLogin) {
        this._triggerEvent(publisherActionType.LogoutSuccess);
        this.closeServer();
        this.ws = null;
      }
    }
  };

  private wsOpenHandler = (event: Event): void => {
    (event.target as WebSocket).send(JSON.stringify(this.msgAuthentication));
    // ws.readyState
    (event.target as WebSocket).send(JSON.stringify(allAuthenticatedUsersMsg));
    (event.target as WebSocket).send(JSON.stringify(allUnauthorizedUsersMsg));
  };

  public connectToServer = (name: string, password: string): void => {
    this.passwordCache = password;
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
