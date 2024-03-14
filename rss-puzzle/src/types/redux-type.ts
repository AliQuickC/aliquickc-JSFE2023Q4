import { ActionID, Page } from './enum';
import { WordCollection } from './types';

export type Reducer = (state: State, action: Action) => State;
export type Listiner = (state: State) => void;
export type Unsubscribe = { unsubscribe: () => void };

export type UserData = {
  firstName: string | null;
  lastName: string | null;
};

export type CardsData = { cardNumb: number; word: string };
export type CardsRow = CardsData[];
export type RezultMatrix = CardsRow[];

export type AppData = {
  currentPage: Page;
  currentCollection: number;
  currentRound: number;
  wordCollection: WordCollection[];
  etalonRezultMatrix: RezultMatrix;
  currentRezultMatrix: RezultMatrix;
  sourceCards: CardsRow;
  cardsInCurrentRezultRow: number[];
  cardsSourceInRow: number[];
};

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
  type: ActionID;
  [key: string]: string;
}
