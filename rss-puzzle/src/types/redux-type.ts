export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export type UserData = {
  firstName: string | null;
  lastName: string | null;
};

export type AppData = { [ket: string]: string };

export interface State {
  userData: UserData;
  appData: AppData;
}

export interface Store {
  subscribe: (fn: Listiner) => Unsubscribe;
  getState: () => State;
  dispatch: (action: Action) => void;
}

export interface Action {
  type: string;
  [key: string]: string;
}
