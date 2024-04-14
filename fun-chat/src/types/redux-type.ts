import { Page } from './enum';
import { UserInfo } from './types';

export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export type UserData = {
  login: string | null;
  password: string | null;
  isLogin: boolean;
};

export type AppData = {
  currentPage: Page;
  userList: UserInfo[];
};

export interface State {
  appData: AppData;
  userData: UserData;
}

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
};

type ActionAddUser = {
  type: typeof ActionID.AddUser;
  user: UserInfo;
};

type ActionRemoveUser = {
  type: typeof ActionID.RemoveUser;
  user: UserInfo;
};

export type Action =
  | ActionSetPage
  | ActionAuthentication
  | ActionLogout
  | ActionRenewUserList
  | ActionAddUser
  | ActionRemoveUser;

export enum ActionID {
  SetPage = 'SET-PAGE',
  Authentication = 'AUTHENTICATION',
  Logout = 'LOGOUT',
  RenewUserList = 'RenewUserList',
  AddUser = 'AddUser',
  RemoveUser = 'RemoveUser',
}

export interface Store {
  subscribe: (fn: Listiner) => Unsubscribe;
  getState: () => State;
  dispatch: (action: Action) => void;
}
