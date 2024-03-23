export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export type Action = {
  type: string;
};

export interface State {}

export interface Store {
  subscribe: (fn: Listiner) => Unsubscribe;
  getState: () => State;
  dispatch: (action: Action) => void;
}
