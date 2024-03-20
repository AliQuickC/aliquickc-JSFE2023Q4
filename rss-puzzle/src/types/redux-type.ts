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

type ActionAppInit = {
  type: typeof ActionID.AppInit;
};

type ActionSetUser = {
  type: typeof ActionID.SetUser;
  firstName: string;
  lastName: string;
};

type ActionLogOff = {
  type: typeof ActionID.LogOff;
};

type ActionSetPage = {
  type: typeof ActionID.SetPage;
  page: Page;
};

type ActionStartGame = {
  type: typeof ActionID.StartGame;
};

type ActionMoveSorceCard = {
  type: typeof ActionID.MoveSorceCard;
  cardNumber: number;
};

type ActionMoveRezultCard = {
  type: typeof ActionID.MoveRezultCard;
  cardNumber: number;
};

type ActionCheckCorrectlySentence = {
  type: typeof ActionID.CheckCorrectlySentence;
};

type ActionautoCompleteSentence = {
  type: typeof ActionID.autoCompleteSentence;
};

type ActionCheckCorrectlyWords = {
  type: typeof ActionID.CheckCorrectlyWords;
};

type ActionNextSentence = {
  type: typeof ActionID.NextSentence;
};

type ActionNextRound = {
  type: typeof ActionID.NextRound;
};

type ActionReplaceRezultCard = {
  type: typeof ActionID.replaceRezultCard;
  startPosMoveCard: number;
  posCardAfterEndPosMoveCard: number;
};

export type Action =
  | ActionAppInit
  | ActionSetUser
  | ActionLogOff
  | ActionSetPage
  | ActionStartGame
  | ActionMoveSorceCard
  | ActionMoveRezultCard
  | ActionCheckCorrectlySentence
  | ActionautoCompleteSentence
  | ActionCheckCorrectlyWords
  | ActionNextSentence
  | ActionNextRound
  | ActionReplaceRezultCard;
