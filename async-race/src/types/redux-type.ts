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
  selectCarNumber: number | null;
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
  carCount: number;
  carsPage: number;
};

type ActionChangeCarsPage = {
  type: typeof ActionID.ChangeCarsPage;
  cars: Car[];
  carCount: number;
  carsPage: number;
};

type ActionInputCreateName = {
  type: typeof ActionID.InputCreateName;
  value: string;
};

type ActionInputCreateColor = {
  type: typeof ActionID.InputCreateColor;
  value: string;
};

type ActionSelectCar = {
  type: typeof ActionID.SelectCar;
  selectCarNumber: number;
};

type ActionInputEditName = {
  type: typeof ActionID.InputEditName;
  value: string;
};

type ActionInputEditColor = {
  type: typeof ActionID.InputEditColor;
  value: string;
};

export type Action =
  | ActionSetPage
  | ActionSetCars
  | ActionChangeCarsPage
  | ActionInputCreateName
  | ActionInputCreateColor
  | ActionSelectCar
  | ActionInputEditName
  | ActionInputEditColor;

export enum ActionID {
  SetPage = 'SET-PAGE',
  SetCars = 'SET-CARS',
  ChangeCarsPage = 'CHANGE-CARS-PAGE',
  InputCreateName = 'INPUT-CREATE-NAME',
  InputCreateColor = 'INPUT-CREATE-COLOR',
  SelectCar = 'SELECT-CAR',
  InputEditName = 'INPUT-EDIT-NAME',
  InputEditColor = 'INPUT-EDIT-COLOR',
}
