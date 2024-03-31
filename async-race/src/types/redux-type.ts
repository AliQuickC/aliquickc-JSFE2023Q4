import { Car, CarInputData, CarParams, Order, Page, Sort, WinnerFull } from './types';

export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export interface State {
  carsPage: number;
  carsLimit: number;
  cars: Car[];
  carCount: number;
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
  carInputData?: CarInputData;
};

export type ActionSetCars = {
  type: typeof ActionID.SetCars;
  cars: Car[];
  carCount: number;
  carsPage: number;
  carInputData: CarInputData;
};

type ActionChangeCarsPage = {
  type: typeof ActionID.ChangeCarsPage;
  cars: Car[];
  carsPage: number;
  inputCarCreateData: CarParams;
};

type ActionChangeCarInputData = {
  type: typeof ActionID.ChangeCarInputData;
  inputCarCreateData: CarParams;
  inputCarEditData: CarParams;
};

type ActionSelectCar = {
  type: typeof ActionID.SelectCar;
  selectCarNumber: number;
};

type ActionCreateCar = {
  type: typeof ActionID.CreateCar;
};

type ActionDeleteCar = {
  type: typeof ActionID.DeleteCar;
  cars: Car[];
  carCount: number;
  carsPage: number;
  carInputData: CarInputData;
  newWinnersPage: number;
  winnerCount: number;
};

export type ActionSetWinnes = {
  type: typeof ActionID.SetWinnes;
  winners: WinnerFull[];
  winnerCount: number;
  winnersPage: number;
};

type ActionChangeWinnersPage = {
  type: typeof ActionID.ChangeWinnersPage;
  winners: WinnerFull[];
  winnersPage: number;
};

type ActionChangeWinnersTable = {
  type: typeof ActionID.ChangeWinnersTable;
  winners: WinnerFull[];
  winnersPage: number;
  winnerCount: number;
  sortWinners: Sort;
  sortOrder: Order;
};

export type Action =
  | ActionSetPage
  | ActionSetCars
  | ActionChangeCarsPage
  | ActionSelectCar
  | ActionChangeCarInputData
  | ActionCreateCar
  | ActionDeleteCar
  | ActionSetWinnes
  | ActionChangeWinnersPage
  | ActionChangeWinnersTable;

export enum ActionID {
  SetPage = 'SET-PAGE',
  SetCars = 'SET-CARS',
  ChangeCarsPage = 'CHANGE-CARS-PAGE',
  InputCreateName = 'INPUT-CREATE-NAME',
  InputCreateColor = 'INPUT-CREATE-COLOR',
  SelectCar = 'SELECT-CAR',
  InputEditName = 'INPUT-EDIT-NAME',
  InputEditColor = 'INPUT-EDIT-COLOR',
  ChangeCarInputData = 'CHANGE-CAR-INPUT-DATA',
  CreateCar = 'CREATE-CAR',
  DeleteCar = 'DELETE-CAR',
  SetWinnes = 'SWT-WINNERS',
  ChangeWinnersPage = 'CHANGE-WINNERS-PAGE',
  ChangeWinnersTable = 'CHANGE-WINNERS-TABLE',
}
