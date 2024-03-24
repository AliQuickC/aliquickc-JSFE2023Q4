import { Car, CarParams, Order, Page, Sort, WinnerFull } from './types';

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
  carCreateData: CarParams;
  carEditData: CarParams;
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

type ActionSetCars = {
  type: typeof ActionID.SetCars;
  cars: Car[];
  carsCount: number;
};

type ActionInputCreateName = {
  type: typeof ActionID.InputCreateName;
  value: string;
};

type ActionInputCreateColor = {
  type: typeof ActionID.InputCreateColor;
  value: string;
};

export type Action = ActionSetPage | ActionSetCars | ActionInputCreateName | ActionInputCreateColor;

export enum ActionID {
  SetPage = 'SET-PAGE',
  SetCars = 'SET-CARS',
  InputCreateName = 'INPUT-CREATE-NAME',
  InputCreateColor = 'INPUT-CREATE-COLOR',
  InputEditName = 'INPUT-EDIT-NAME',
  InputEditColor = 'INPUT-EDIT-COLOR',
}
