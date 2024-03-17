import { State, UserData } from '../types/redux-type';
import { Page } from '../types/enum';

const CURENT_COLLECTION = 0;
const DEFAULT_CURENT_ROUND = 0;
export const FIRST_REZULT_ROWS = 0;
export const MAX_REZULT_ROWS = 10;
export const FIRST_SENTENCE = 0;

export const defaultUserData: UserData = {
  firstName: null,
  lastName: null,
};

export const initialState: State = {
  userData: defaultUserData,
  appData: {
    currentPage: Page.Login,
    currentCollection: CURENT_COLLECTION,
    etalonRezultMatrix: [],
    currentRezultMatrix: [],
    cardsInCurrentRezultRow: [],
    cardsSourceInRow: [],
    currentRoundNumber: DEFAULT_CURENT_ROUND,
    currentSentenceNumber: FIRST_SENTENCE,
    sentenceSuccess: false,
    roundComplete: false,
    wordOrder: [],
    haveFeedbackWordOrder: false,
  },
  wordCollection: [],
};
