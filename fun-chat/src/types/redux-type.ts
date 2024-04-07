import { Page } from './enum';

export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export type UserData = {
  name: string | null;
  password: string | null;
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

export interface Store {
  subscribe: (fn: Listiner) => Unsubscribe;
  getState: () => State;
  dispatch: (action: Action) => void;
}

export type Action = ActionSetPage;

export enum ActionID {
  SetPage = 'SET-PAGE',
}
