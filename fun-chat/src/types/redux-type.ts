import { Page } from './enum';

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

export type Action = ActionSetPage | ActionAuthentication | ActionLogout;

export enum ActionID {
  SetPage = 'SET-PAGE',
  Authentication = 'AUTHENTICATION',
  Logout = 'LOGOUT',
}

export interface Store {
  subscribe: (fn: Listiner) => Unsubscribe;
  getState: () => State;
  dispatch: (action: Action) => void;
}
