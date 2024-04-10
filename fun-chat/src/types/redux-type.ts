import { Page } from './enum';

export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export type UserData = {
  name: string | null;
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
  name: string;
  password: string;
};

export interface Store {
  subscribe: (fn: Listiner) => Unsubscribe;
  getState: () => State;
  dispatch: (action: Action) => void;
}

export type Action = ActionSetPage | ActionAuthentication;

export enum ActionID {
  SetPage = 'SET-PAGE',
  Authentication = 'AUTHENTICATION',
}
