/* eslint-disable max-lines-per-function */
import { Action, CardsData, CardsRow, State } from '../types/redux-type';
import { ActionID, Page } from '../types/enum';
import { shuffle } from '../core/utils';

export const REZULT_ROWS = 10;
export const CURRENT_ROW = 8;

export default function reducer(stateData: State, action: Action): State {
  const state = stateData;

  switch (action.type) {
    case ActionID.AppInit: {
      if (state.userData.firstName) {
        state.appData = { ...state.appData, currentPage: Page.Start };
      } else {
        state.appData = { ...state.appData, currentPage: Page.Login };
      }
      return state;
    }
    case ActionID.SetUser: {
      state.userData = {
        ...state.userData,
        firstName: action.firstName,
        lastName: action.lastName,
      };
      state.appData = { ...state.appData, currentPage: Page.Start };
      return state;
    }
    case ActionID.LogOff: {
      state.userData = { ...state.userData, firstName: null, lastName: null };
      state.appData = { ...state.appData, currentPage: Page.Login };
      return state;
    }
    case ActionID.SetPage: {
      state.appData.currentPage = action.page as Page;
      return state;
    }
    case ActionID.StartGame: {
      const { currentCollection, currentRound } = state.appData;
      const { words } = state.appData.wordCollection[currentCollection].rounds[currentRound];

      state.appData.etalonRezultMatrix = new Array(REZULT_ROWS).fill(null).map((_, index): CardsRow => {
        const wordsArray: string[] = words[index].textExample.split(' ');
        return new Array(wordsArray.length).fill(null).map(
          (_, j): CardsData => ({
            cardNumb: j,
            word: wordsArray[j],
          })
        );
      });

      const currentRezultMatrix = JSON.parse(JSON.stringify(state.appData.etalonRezultMatrix));

      state.appData.currentRezultMatrix = new Array(REZULT_ROWS)
        .fill(null)
        .map((_, index): CardsRow => shuffle(currentRezultMatrix[index]));

      state.appData.cardsInCurrentRezultRow = [];
      state.appData.cardsSourceInRow = new Array(state.appData.currentRezultMatrix[CURRENT_ROW].length)
        .fill(null)
        .map((_, index) => state.appData.currentRezultMatrix[CURRENT_ROW][index].cardNumb);

      state.appData.currentPage = Page.Game;
      return state;
    }
    case ActionID.MoveSorceCard: {
      const cardsInCurrentRezultRow = state.appData.cardsInCurrentRezultRow.slice(0);
      cardsInCurrentRezultRow.push(+action.cardNumber);
      state.appData.cardsInCurrentRezultRow = cardsInCurrentRezultRow;

      const cardsSourceInRow = state.appData.cardsSourceInRow.slice(0);
      const elemNumb = cardsSourceInRow.indexOf(+action.cardNumber);
      cardsSourceInRow.splice(elemNumb, 1);
      state.appData.cardsSourceInRow = cardsSourceInRow;

      return state;
    }
    case ActionID.MoveRezultCard: {
      const cardsSourceInRow = state.appData.cardsSourceInRow.slice(0);
      cardsSourceInRow.push(+action.cardNumber);
      state.appData.cardsSourceInRow = cardsSourceInRow;

      const cardsInCurrentRezultRow = state.appData.cardsInCurrentRezultRow.slice(0);
      const elemNumb = cardsInCurrentRezultRow.indexOf(+action.cardNumber);
      cardsInCurrentRezultRow.splice(elemNumb, 1);
      state.appData.cardsInCurrentRezultRow = cardsInCurrentRezultRow;
      return state;
    }
    default:
      return state;
  }
}
