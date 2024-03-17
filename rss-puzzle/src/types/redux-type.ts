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

export type AppData = {
  currentPage: Page;
  currentCollection: number;
  etalonRezultMatrix: CardsData[][];
  currentRezultMatrix: CardsData[][];
  sourceCards: CardsData[];
  cardsInCurrentRezultRow: number[];
  cardsSourceInRow: number[];
  currentSentenceNumber: number;
  currentRoundNumber: number;
  sentenceSuccess: boolean;
  roundComplete: boolean;
  wordOrder: boolean[];
  haveFeedbackWordOrder: boolean;
};

export interface State {
  userData: UserData;
  appData: AppData;
  wordCollection: WordCollection[];
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
