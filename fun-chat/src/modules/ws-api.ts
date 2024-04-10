/* eslint-disable @typescript-eslint/no-unused-vars */
import Publisher from '../component/base-component/publisher';
import { AuthenticationError, ServerReadyState, messageId } from '../types/enum';
import { AuthenticationLogin, AuthenticationMsg, AuthenticationSuccess } from '../types/types';

const baseURL = 'ws://localhost:4000';
let ws: WebSocket | null = null;

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

function logoutMsgCreator(name: string, userPassword: string): AuthenticationMsg {
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

// function connectToServer(name: string, password: string): void {
//   function errorHandler(error: Event): void {
//     if ((error.currentTarget as WebSocket).readyState === ServerReadyState.CLOSED) {
//       console.log('Не удалось установить соединение с сервером!');
//     }
//   }

//   function messageHandler(event: MessageEvent): void {
//     const eventData = JSON.parse(event.data);
//     console.log(eventData);

//     if (eventData.id === messageId.Authentication) {
//       responseAuthentication(eventData);
//     }
//   }

//   function responseAuthentication(eventData: AuthenticationSuccess): void {
//     if (
//       eventData.type === 'USER_LOGIN' ||
//       (eventData.type === 'ERROR' && eventData.payload.error === AuthenticationError.AlreadyAuthorized)
//     ) {
//       console.log('Authentication Success');
//     }
//   }

//   function wsOpenHandler(event: Event): void {
//     (event.target as WebSocket).send(JSON.stringify(msgAuthentication));
//     // ws.readyState
//     // ws.send(JSON.stringify(msgAuthentication));
//     // ws.send(JSON.stringify(msgLogout));
//     (event.target as WebSocket).send(JSON.stringify(allAuthenticatedUsersMsg));
//     (event.target as WebSocket).send(JSON.stringify(allUnauthorizedUsersMsg));
//   }

//   const msgAuthentication: AuthenticationMsg = authenticationMsgCreator(name, password);

//   if (ws) {
//     ws.close();
//   }

//   ws = new WebSocket(baseURL);
//   ws.addEventListener('error', errorHandler);

//   ws.addEventListener('message', messageHandler);

//   ws.addEventListener('open', wsOpenHandler);
// }

export default class WebSocketController extends Publisher {
  // private isConnect: boolean;
  // private isLogin: boolean;
  private ws: WebSocket | null = null;
  private msgAuthentication: AuthenticationMsg = {} as AuthenticationMsg;

  // constructor() {
  //   super();
  // }

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
      // this._triggerEvent('Authentication-Success', { name, password });
      console.log('Authentication Success');
    }
  };

  private messageHandler = (event: MessageEvent): void => {
    const eventData = JSON.parse(event.data);
    console.log(eventData);

    if (eventData.id === messageId.Authentication) {
      this.responseAuthentication(eventData);
    }
  };

  private wsOpenHandler = (event: Event): void => {
    (event.target as WebSocket).send(JSON.stringify(this.msgAuthentication));
    // ws.readyState
    // ws.send(JSON.stringify(msgAuthentication));
    // ws.send(JSON.stringify(msgLogout));
    (event.target as WebSocket).send(JSON.stringify(allAuthenticatedUsersMsg));
    (event.target as WebSocket).send(JSON.stringify(allUnauthorizedUsersMsg));
  };

  public connectToServer = (name: string, password: string): void => {
    this.msgAuthentication = authenticationMsgCreator(name, password);

    ws = new WebSocket(baseURL);
    ws.addEventListener('error', this.errorHandler);
    ws.addEventListener('message', this.messageHandler);
    ws.addEventListener('open', this.wsOpenHandler);
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
