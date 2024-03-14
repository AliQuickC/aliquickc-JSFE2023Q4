import { State, UserData } from '../types/redux-type';
import { Page } from '../types/enum';

const CURENT_COLLECTION = 0;
const CURENT_ROUND = 0;

export const defaultUserData: UserData = {
  firstName: null,
  lastName: null,
};

export const initialState: State = {
  userData: defaultUserData,
  appData: {
    currentPage: Page.Login,
    currentCollection: CURENT_COLLECTION,
    currentRound: CURENT_ROUND,
    wordCollection: [],
    etalonRezultMatrix: [],
    currentRezultMatrix: [],
    sourceCards: [],
    cardsInCurrentRezultRow: [],
    cardsSourceInRow: [],
  },
};
