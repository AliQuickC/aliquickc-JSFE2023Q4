/* eslint-disable max-lines-per-function */
import { Action, CardsData, State } from '../types/redux-type';
import { ActionID, Page } from '../types/enum';
import { shuffle } from '../core/utils';
import { SentenceData } from '../types/types';
import { FIRST_SENTENCE, MAX_REZULT_ROWS } from './constants';

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
      const { currentCollection, currentRoundNumber, currentSentenceNumber } = state.appData;

      const words: SentenceData[] = state.wordCollection[currentCollection].rounds[currentRoundNumber].words;

      const etalonRezultMatrix: CardsData[][] = getEtalonSentenceMatrix(words);

      const currentRezultMatrix: CardsData[][] = shuffleRezultMatrix(etalonRezultMatrix);

      const RezultMatrixRow: CardsData[] = currentRezultMatrix[currentSentenceNumber];
      const cardsSourceInRow: number[] = getCardsSourceInRow(RezultMatrixRow);

      state.appData = {
        ...state.appData,
        etalonRezultMatrix,
        currentRezultMatrix,
        cardsSourceInRow,
        cardsInCurrentRezultRow: [],
      };

      state.appData.currentPage = Page.Game;
      return state;
    }
    case ActionID.MoveSorceCard: {
      const cardsInCurrentRezultRow: number[] = state.appData.cardsInCurrentRezultRow.slice(0);
      cardsInCurrentRezultRow.push(+action.cardNumber);

      const cardsSourceInRow: number[] = state.appData.cardsSourceInRow.slice(0);
      const elemNumb = cardsSourceInRow.indexOf(+action.cardNumber);
      cardsSourceInRow.splice(elemNumb, 1);

      state.appData = {
        ...state.appData,
        cardsInCurrentRezultRow,
        cardsSourceInRow,
      };

      return reducer(state, { type: ActionID.CheckCorrectlySentence });
    }
    case ActionID.MoveRezultCard: {
      const cardsSourceInRow = state.appData.cardsSourceInRow.slice(0);
      cardsSourceInRow.push(+action.cardNumber);

      const cardsInCurrentRezultRow = state.appData.cardsInCurrentRezultRow.slice(0);
      const elemNumb = cardsInCurrentRezultRow.indexOf(+action.cardNumber);
      cardsInCurrentRezultRow.splice(elemNumb, 1);

      state.appData = {
        ...state.appData,
        cardsSourceInRow,
        cardsInCurrentRezultRow,
        haveFeedbackWordOrder: false,
      };
      return state;
    }
    case ActionID.autoCompleteSentence: {
      const { etalonRezultMatrix, currentSentenceNumber } = state.appData;
      const length: number = etalonRezultMatrix[currentSentenceNumber].length;
      const cardsInCurrentRezultRow: number[] = [];

      for (let i = 0; i < length; i++) {
        cardsInCurrentRezultRow.push(i);
      }

      state.appData = {
        ...state.appData,
        cardsInCurrentRezultRow,
        cardsSourceInRow: [],
      };

      return reducer(state, { type: ActionID.CheckCorrectlySentence });
    }
    case ActionID.CheckCorrectlySentence: {
      if (state.appData.cardsSourceInRow.length === 0) {
        const { cardsInCurrentRezultRow, currentSentenceNumber, etalonRezultMatrix, currentRezultMatrix } =
          state.appData;

        const rezultSentence: string = getRezultSentence(
          etalonRezultMatrix[currentSentenceNumber],
          cardsInCurrentRezultRow
        );

        const etalonSentence: string = getSentence(etalonRezultMatrix[currentSentenceNumber]);

        if (etalonSentence === rezultSentence) {
          const currentEtalonMatrixRow: CardsData[] = JSON.parse(
            JSON.stringify(etalonRezultMatrix[currentSentenceNumber])
          );
          currentRezultMatrix[currentSentenceNumber] = currentEtalonMatrixRow;
          state.appData.sentenceSuccess = true;
          if (currentSentenceNumber + 1 === MAX_REZULT_ROWS) {
            state.appData.roundComplete = true;
          }
        }
      }
      return state;
    }
    case ActionID.CheckCorrectlyWords: {
      const { currentSentenceNumber, etalonRezultMatrix, cardsInCurrentRezultRow } = state.appData;

      const etalonSentenceWordsArray: string[] = getSentenceWordsArray(etalonRezultMatrix[currentSentenceNumber]);

      const rezultSentenceWordsArray: string[] = getRezultSentenceWordsArray(
        etalonRezultMatrix[currentSentenceNumber],
        cardsInCurrentRezultRow
      );

      const wordOrder = etalonSentenceWordsArray.map((item, index) => item === rezultSentenceWordsArray[index]);

      state.appData = {
        ...state.appData,
        wordOrder,
        haveFeedbackWordOrder: true,
      };

      return state;
    }
    case ActionID.NextSentence: {
      const { currentSentenceNumber, currentRezultMatrix } = state.appData;
      if (currentSentenceNumber + 1 === MAX_REZULT_ROWS) {
        return state;
      }

      const nextRezultMatrixRow: CardsData[] = currentRezultMatrix[currentSentenceNumber + 1];
      const cardsSourceInRow: number[] = getCardsSourceInRow(nextRezultMatrixRow);

      state.appData = {
        ...state.appData,
        currentSentenceNumber: currentSentenceNumber + 1,
        cardsSourceInRow,
        cardsInCurrentRezultRow: [],
        sentenceSuccess: false,
        haveFeedbackWordOrder: false,
      };
      return state;
    }
    case ActionID.NextRound: {
      const wordCollection = state.wordCollection[state.appData.currentCollection];

      if (wordCollection.roundsCount <= state.appData.currentRoundNumber + 1) {
        return state;
      }

      const { currentRoundNumber } = state.appData;
      const nextRoundWords: SentenceData[] = wordCollection.rounds[currentRoundNumber + 1].words;

      const etalonRezultMatrix: CardsData[][] = getEtalonSentenceMatrix(nextRoundWords);

      const currentRezultMatrix: CardsData[][] = shuffleRezultMatrix(etalonRezultMatrix);

      const RezultMatrixCurrentRow: CardsData[] = currentRezultMatrix[FIRST_SENTENCE];
      const cardsSourceInRow: number[] = getCardsSourceInRow(RezultMatrixCurrentRow);

      state.appData = {
        ...state.appData,
        etalonRezultMatrix,
        currentRezultMatrix,
        cardsSourceInRow,
        cardsInCurrentRezultRow: [],
        currentRoundNumber: currentRoundNumber + 1,
        currentSentenceNumber: FIRST_SENTENCE,
        sentenceSuccess: false,
        roundComplete: false,
        haveFeedbackWordOrder: false,
      };
      return state;
    }
    default:
      return state;
  }
}

function shuffleRezultMatrix(rezultMatrix: CardsData[][]): CardsData[][] {
  const copyEtalonRezultMatrix: CardsData[][] = JSON.parse(JSON.stringify(rezultMatrix));

  return new Array(MAX_REZULT_ROWS).fill(null).map((_, index): CardsData[] => shuffle(copyEtalonRezultMatrix[index]));
}

function getEtalonSentenceMatrix(sentenceArray: SentenceData[]): CardsData[][] {
  return new Array(MAX_REZULT_ROWS).fill(null).map((_, index): CardsData[] => {
    const wordsArray: string[] = sentenceArray[index].textExample.split(' ');
    return new Array(wordsArray.length).fill(null).map(
      (_, j): CardsData => ({
        cardNumb: j,
        word: wordsArray[j],
      })
    );
  });
}

function getCardsSourceInRow(matrixRow: CardsData[]): number[] {
  return new Array(matrixRow.length).fill(null).map((_, index) => matrixRow[index].cardNumb);
}

function getSentence(sentanceArray: CardsData[]): string {
  return sentanceArray.map((item) => item.word).join(' ');
}
function getSentenceWordsArray(sentanceArray: CardsData[]): string[] {
  return sentanceArray.map((item) => item.word);
}

function getRezultSentence(sentanceArray: CardsData[], wordsArray: number[]): string {
  return wordsArray.map((item) => sentanceArray[item].word).join(' ');
}

function getRezultSentenceWordsArray(sentanceArray: CardsData[], wordsArray: number[]): string[] {
  return wordsArray.map((item) => sentanceArray[item].word);
}
