import { Page } from './enum';
import { MessageHistoryInfo, MessageReceive, UserInfo, UserLoginParams, UserParams } from './types';

export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export type UserData = UserParams & { isLogin: boolean };

export type AppData = {
  currentPage: Page;
  userList: UserInfo[];
  selectedUser: string | null;
};

export type State = {
  appData: AppData;
  loginedUser: UserData;
  currentMessageHistory: MessageHistoryInfo | null;
};

type ActionSetPage = {
  type: typeof ActionID.SetPage;
  page: Page;
};

type ActionAuthentication = {
  type: typeof ActionID.Authentication;
  login: string;
  password: string;
};

type ActionLogout = {
  type: typeof ActionID.Logout;
};

type ActionRenewUserList = {
  type: typeof ActionID.RenewUserList;
  userList: UserInfo[];
  loginParams: UserLoginParams;
};

type ActionAddUser = {
  type: typeof ActionID.AddUser;
  user: UserInfo;
};

type ActionRemoveUser = {
  type: typeof ActionID.RemoveUser;
  user: UserInfo;
};

type ActionSelectUser = {
  type: typeof ActionID.SelectUser;
  login: string;
};

type ActionUpdateMessageHistory = {
  type: typeof ActionID.UpdateMessageHistory;
  messageHistoryInfo: MessageHistoryInfo;
};

type ActionDisconnectSetPage = {
  type: typeof ActionID.DisconnectSetPage;
  page: Page;
};

type ActionNewMessageReceive = {
  type: typeof ActionID.NewMessageReceive;
  message: MessageReceive;
};

export type Action =
  | ActionSetPage
  | ActionAuthentication
  | ActionLogout
  | ActionRenewUserList
  | ActionAddUser
  | ActionRemoveUser
  | ActionSelectUser
  | ActionUpdateMessageHistory
  | ActionDisconnectSetPage
  | ActionNewMessageReceive;

export enum ActionID {
  SetPage = 'SET-PAGE',
  Authentication = 'AUTHENTICATION',
  Logout = 'LOGOUT',
  RenewUserList = 'RenewUserList',
  AddUser = 'AddUser',
  RemoveUser = 'RemoveUser',
  SelectUser = 'SelectUser',
  UpdateMessageHistory = 'UpdateMessageHistory',
  DisconnectSetPage = 'DisconnectSetPage',
  NewMessageReceive = 'NewMessageReceive',
}

export interface Store {
  subscribe: (fn: Listiner) => Unsubscribe;
  getState: () => State;
  dispatch: (action: Action) => void;
}
