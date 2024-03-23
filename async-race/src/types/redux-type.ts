import { Car, Order, Page, Sort, WinnerFull } from './types';

export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export interface State {
  carsPage: number;
  carsLimit: number;
  cars: Car[];
  carCount: number;
  selectCarId: number;
  winnersPage: number;
  winnersLimit: number;
  winners: WinnerFull[];
  winnerCount: number;
  sortWinners: Sort;
  sortOrder: Order;
  selectCar: number | null;
  viewPage: Page;
}

export interface Store {
  subscribe: (fn: Listiner) => Unsubscribe;
  getState: () => State;
  dispatch: (action: Action) => void;
}

type ActionSetPage = {
  type: typeof ActionID.SetPage;
  page: Page;
};

export type Action = ActionSetPage;

export enum ActionID {
  SetPage = 'SET-PAGE',
}
