import Publisher from '../component/base-component/publisher';
import {
  AuthenticationErrorMessage,
  ServerReadyState,
  messageId,
  messageType,
  publisherActionType,
} from '../types/enum';
import {
  AuthenticatedUsers,
  AuthenticationLogin,
  AuthenticationMsg,
  LogoutMsg,
  MessageDeletMsg,
  MessageDeletedStatus,
  MessageEditRequest,
  MessageEditStatus,
  MessageReadStatusChange,
  ResponseAuthentication,
  ServerResponse,
  UnauthorizedUsers,
  UserInfo,
  UserParams,
  messageHistoryWithTheUser,
  sendingMessageToUserMsg,
} from '../types/types';
import { debounce } from './utils';

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

function sendingMessageToUserMsgCreater(user: string, message: string): sendingMessageToUserMsg {
  return {
    id: messageId.SendMessage,
    type: messageType.MsgSend,
    payload: {
      message: {
        to: user,
        text: message,
      },
    },
  };
}

function messageHistoryWithTheUserMsgCreater(loginUser: string, selectUser: string): messageHistoryWithTheUser {
  return {
    id: messageId.MessageHistory + '-' + loginUser + '-' + selectUser,
    type: messageType.MsgHistory,
    payload: {
      user: {
        login: selectUser,
      },
    },
  };
}

function DeleteMessageMsgCreater(id: string): MessageDeletMsg {
  return {
    id: messageId.DeleteMessage,
    type: messageType.MsgDelete,
    payload: {
      message: {
        id,
      },
    },
  };
}

function MessageReadStatusChangeMsgCreater(id: string): MessageReadStatusChange {
  return {
    id: messageId.MsgReadStatus,
    type: messageType.MsgRead,
    payload: {
      message: {
        id,
      },
    },
  };
}

function MessageEditMsgCreater(id: string, text: string): MessageEditRequest {
  return {
    id: messageId.MessageEdit,
    type: messageType.MsgEdit,
    payload: {
      message: {
        id,
        text,
      },
    },
  };
}

export default class WebSocketController extends Publisher {
  private ws: WebSocket | null = null;
  private msgAuthentication: AuthenticationMsg = {} as AuthenticationMsg;
  private authenticatedUsers: UserInfo[] | null = null;
  private unauthorizedUsers: UserInfo[] | null = null;
  private userParamsCache: UserParams = {
    login: null,
    password: null,
  };
  private isDisconnect: boolean = false;
  private debounceMsgDeliver: (args: typeof publisherActionType.DeliveryStatusChange) => void;
  private debounceMsgRead: (args: typeof publisherActionType.ReadStatusChange) => void;

  constructor() {
    super();

    // this.debounceMsgDeliver = debounce((action: typeof publisherActionType.DeliveryStatusChange) => {
    //   this._triggerEvent(action);
    // }, 500);
    this.debounceMsgDeliver = debounce(this._triggerEvent.bind(this), 500);
    this.debounceMsgRead = debounce(this._triggerEvent.bind(this), 500);
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

  private errorHandler = (error: Event): void => {
    if ((error.currentTarget as WebSocket).readyState === ServerReadyState.CLOSED) {
      this._triggerEvent(publisherActionType.ServerIsNotAvailable);
    }
  };

  private responseAuthentication = (eventData: ResponseAuthentication): void => {
    if (eventData.type === messageType.UserLogin) {
      // this._triggerEvent(publisherActionType.AuthenticationSuccess, {
      //   login: eventData.payload.user.login,
      //   password: this.userParamsCache.password,
      // });

      this.isDisconnect = true;

      this.getUserList();
      return;
    } else if (eventData.type === messageType.Error) {
      if (eventData.payload.error === AuthenticationErrorMessage.AlreadyAuthorized) {
        this._triggerEvent(publisherActionType.AlreadyAuthorized);
      } else if (eventData.payload.error === AuthenticationErrorMessage.IncorrectPassword) {
        this._triggerEvent(publisherActionType.IncorrectPassword);
      }
      this.closeServer();
    }
  };

  private getUserList = (): void => {
    this.authenticatedUsers = null;
    this.unauthorizedUsers = null;
    (this.ws as WebSocket).send(JSON.stringify(allAuthenticatedUsersMsg));
    (this.ws as WebSocket).send(JSON.stringify(allUnauthorizedUsersMsg));
  };

  private responseDeleteMessage = (deleteStatus: MessageDeletedStatus): void => {
    this._triggerEvent(publisherActionType.MessageDeleted, { deleteStatus });
  };

  private responseEditMessage = (editStatus: MessageEditStatus): void => {
    this._triggerEvent(publisherActionType.EditStatusChange, { editStatus });
  };

  private messageHandler = (event: MessageEvent): void => {
    const eventData: ServerResponse = JSON.parse(event.data);
    console.log(eventData);

    switch (eventData.id) {
      case messageId.Authentication: {
        this.responseAuthentication(eventData as AuthenticationLogin);
        break;
      }
      case messageId.LogOut: {
        if (eventData.type === messageType.Userlogout && !eventData.payload.user.isLogined) {
          this._triggerEvent(publisherActionType.LogoutSuccess);
          this.closeServer();
          this.userParamsCache = {
            login: null,
            password: null,
          };
          this.ws = null;
        }
        break;
      }
      case messageId.UsersList: {
        const users = (eventData as AuthenticatedUsers | UnauthorizedUsers).payload.users;
        if (eventData.type === messageType.UserActive) {
          this.authenticatedUsers = users;
        } else if (eventData.type === messageType.UserInactive) {
          this.unauthorizedUsers = users;
        }

        if (this.authenticatedUsers && this.unauthorizedUsers) {
          const userList: UserInfo[] = this.authenticatedUsers.concat(this.unauthorizedUsers);

          this._triggerEvent(publisherActionType.UserLisReady, { userList, LoginParams: this.userParamsCache });
        }
        break;
      }
      case messageId.SendMessage: {
        if (eventData.type === messageType.MsgSend) {
          const message = eventData.payload.message;
          this._triggerEvent(publisherActionType.AddNewMessage, { message });
        }
        break;
      }
      case messageId.DeleteMessage: {
        if (eventData.type === messageType.MsgDelete) {
          this.responseDeleteMessage(eventData.payload.message);
        }
        break;
      }
      case messageId.MsgReadStatus: {
        if (eventData.type === messageType.MsgRead) {
          this.debounceMsgRead(publisherActionType.ReadStatusChange);
        }
        break;
      }
      case messageId.MessageEdit: {
        if (eventData.type === messageType.MsgEdit) {
          this.responseEditMessage(eventData.payload.message);
        }
        break;
      }
      case null: {
        if (eventData.type === messageType.UserExternalLogin) {
          const user: UserInfo = eventData.payload.user;
          this._triggerEvent(publisherActionType.AddUser, { user });
        } else if (eventData.type === messageType.UserExternalLogout) {
          const user: UserInfo = eventData.payload.user;
          this._triggerEvent(publisherActionType.RemoveUser, { user });
        }
        // Receive message from user
        else if (eventData.type === messageType.MsgSend) {
          this._triggerEvent(publisherActionType.AddNewMessage, { message: eventData.payload.message });
        }
        // Singl message, delivery status change
        else if (eventData.type === messageType.MsgDeliver) {
          // within 500ms, waiting for new server events about changes in message delivery status.
          // if there are no new server events, the action is to request the history of all messages
          this.debounceMsgDeliver(publisherActionType.DeliveryStatusChange);
        } else if (eventData.type === messageType.MsgDelete) {
          this.responseDeleteMessage(eventData.payload.message);
        } else if (eventData.type === messageType.MsgRead) {
          this.debounceMsgRead(publisherActionType.ReadStatusChange);
        } else if (eventData.type === messageType.MsgEdit) {
          this.responseEditMessage(eventData.payload.message);
        }
        break;
      }
      // typeof eventData.id === 'string'
      default: {
        if (eventData.type === messageType.MsgHistory) {
          const [, loginUser, chatUser] = eventData.id.split('-');
          this._triggerEvent(publisherActionType.UpdateMessageHistory, {
            loginUser,
            chatUser,
            messages: eventData.payload.messages,
          });
        }
        break;
      }
    }
  };

  private wsOpenHandler = (event: Event): void => {
    (event.target as WebSocket).send(JSON.stringify(this.msgAuthentication));
  };

  public connectToServer = (name: string, password: string): void => {
    if (this.ws) {
      this.closeServer();
    }
    this.userParamsCache = { login: name, password: password };
    this.msgAuthentication = authenticationMsgCreator(name, password);

    this.ws = new WebSocket(baseURL);
    this.addEvents();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public closeHandler = (event: CloseEvent): void => {
    // console.log('event: ', event.code);
    // console.log('close: ', this.ws?.readyState);

    if (this.isDisconnect) {
      this._triggerEvent(publisherActionType.Disconnect);
      this.removeEvents();
      this.ws = null;

      this.connectToServer(this.userParamsCache.login as string, this.userParamsCache.password as string);
    }
  };

  public userLogout = (name: string, password: string): void => {
    const logoutMsg = logoutMsgCreator(name, password);
    this.ws?.send(JSON.stringify(logoutMsg));
  };

  private addEvents = (): void => {
    if (this.ws) {
      this.ws.addEventListener('open', this.wsOpenHandler);
      this.ws.addEventListener('close', this.closeHandler);
      this.ws.addEventListener('error', this.errorHandler);
      this.ws.addEventListener('message', this.messageHandler);
    }
  };
  private removeEvents = (): void => {
    if (this.ws) {
      this.ws.removeEventListener('error', this.errorHandler);
      this.ws.removeEventListener('close', this.closeHandler);
      this.ws.removeEventListener('message', this.messageHandler);
      this.ws.removeEventListener('open', this.wsOpenHandler);
    }
  };

  public closeServer = (): void => {
    this.isDisconnect = false;
    if (this.ws) {
      this.removeEvents();
      this.ws.close(1000, 'user logout');
    }
  };

  public sendMessageToUser = (user: string, message: string): void => {
    this.ws?.send(JSON.stringify(sendingMessageToUserMsgCreater(user, message)));
  };

  public sendRequestMessageHistory = (loginUser: string, selectUser: string): void => {
    this.ws?.send(JSON.stringify(messageHistoryWithTheUserMsgCreater(loginUser, selectUser)));
  };

  public deleteMessage = (messageId: string): void => {
    this.ws?.send(JSON.stringify(DeleteMessageMsgCreater(messageId)));
  };

  public changeMessageStatusRead = (messageId: string): void => {
    this.ws?.send(JSON.stringify(MessageReadStatusChangeMsgCreater(messageId)));
  };

  public messageEdit = (messageId: string, text: string): void => {
    this.ws?.send(JSON.stringify(MessageEditMsgCreater(messageId, text)));
  };
}
