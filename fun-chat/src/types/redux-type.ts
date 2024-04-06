export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export interface State {}

type ActionSetPage = {
  type: typeof ActionID.SetPage;
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
