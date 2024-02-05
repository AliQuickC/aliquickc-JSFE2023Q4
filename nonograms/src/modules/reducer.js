import MOUSE_BUTTONS from './constants';
import {countSequencesInColumn, countSequencesInRow} from '../core/utils';
import {templates} from './field-template';

function isWin(templateArr, userArr) {
  for (let i = 0; i < userArr.length; i += 1) {
    for (let j = 0; j < userArr.length; j += 1) {
      if (templateArr[i][j] !== !!userArr[i][j]) {
        return false;
      }
    }
  }
  return true;
}

export default function reducer(stateData, action) {
  const state = stateData;

  let topClues;
  let leftClues;
  switch (action.type) {
    case 'CHANGE_THEME':
      state.userData.themeIsDark = action.themeIsDark;
      return state;
    case 'INIT_NEW_GAME':
      state.gameMatrix = templates[action.selectGame];
      state.fieldSize = state.gameMatrix.length;

      state.userData = {
        ...state.userData,
        selectedTemplate: action.selectGame,
        isWin: false,
        isGameEnd: false,
        currentPage: 'gameField',
        timerValue: 0,
        userMatrix: new Array(state.gameMatrix.length)
          .fill(null)
          .map(() => new Array(state.gameMatrix.length).fill(null)),
      };

      topClues = countSequencesInColumn(state.gameMatrix);
      leftClues = countSequencesInRow(state.gameMatrix);

      state.topClues = topClues;
      state.leftClues = leftClues;
      return state;
    case 'INIT_GAME_FROM_OBJECT':
      state.gameMatrix = templates[action.userData.selectedTemplate];
      state.fieldSize = state.gameMatrix.length;

      state.userData = {
        ...action.userData,
      };

      topClues = countSequencesInColumn(state.gameMatrix);
      leftClues = countSequencesInRow(state.gameMatrix);

      state.topClues = topClues;
      state.leftClues = leftClues;
      return state;
    case 'SAVE_GAME':
      const userSavedGame = {
        selectedTemplate: state.userData.selectedTemplate,
        userMatrix: JSON.parse(JSON.stringify(state.userData.userMatrix)),
        timerValue: state.userData.timerValue,
      };
      state.userData = {
        ...state.userData,
        userSavedGame,
      };

      return state;
    case 'LOAD_GAME':
      const userLoadGame = JSON.parse(JSON.stringify(state.userData.userSavedGame));
      state.userData = {
        ...state.userData,
        ...userLoadGame,
        isWin: false,
        isGameEnd: false,
        currentPage: 'gameField',
      };

      state.gameMatrix = templates[state.userData.selectedTemplate];
      state.fieldSize = state.gameMatrix.length;
      topClues = countSequencesInColumn(state.gameMatrix);
      leftClues = countSequencesInRow(state.gameMatrix);
      state.topClues = topClues;
      state.leftClues = leftClues;

      return state;
    case 'SAVE_REZULT':
      const rezults = state.userData.rezults.slice();
      rezults.push(action.rezult);
      if (rezults.length > 5) rezults.shift();
      state.userData.rezults = rezults;
      return state;
    case 'SET_USER_DATA':
      state.userData = JSON.parse(JSON.stringify(action.userData));
      return state;
    case 'SET_CURRENT_PAGE':
      state.userData = {
        ...state.userData,
        currentPage: action.currentPage,
      };
      return state;
    case 'GAME_RESTART':
      state.userData = {
        ...state.userData,
        timerValue: 0,
        isWin: false,
        isGameEnd: false,
        userMatrix: new Array(state.gameMatrix.length)
          .fill(null)
          .map(() => new Array(state.gameMatrix.length).fill(null)),
      };
      return state;
    case 'RENEW_TIMER_VALUE':
      state.userData.timerValue = action.time;
      return state;
    case 'SHOW_SOLUTION':
      const {gameMatrix} = state;
      const userMatrix = JSON.parse(JSON.stringify(state.userData.userMatrix));

      for (let i = 0; i < userMatrix.length; i += 1) {
        for (let j = 0; j < userMatrix.length; j += 1) {
          if (gameMatrix[i][j]) {
            userMatrix[i][j] = true;
          } else if (userMatrix[i][j] === true) {
            userMatrix[i][j] = null;
          }
        }
      }
      state.userData = {
        ...state.userData,
        userMatrix,
        isWin: false,
        isGameEnd: true,
      };
      return state;
    case 'CELL_CLICK':
      if (action.event.button === MOUSE_BUTTONS.leftButton) {
        const selectCall = state.userData.userMatrix[action.event.x][action.event.y];

        if (selectCall) {
          state.userData.userMatrix[action.event.x][action.event.y] = null;
        } else {
          state.userData.userMatrix[action.event.x][action.event.y] = true;
        }
      } else if (action.event.button === MOUSE_BUTTONS.rightButton) {
        const selectCall = state.userData.userMatrix[action.event.x][action.event.y];
        if (selectCall === null || selectCall) {
          state.userData.userMatrix[action.event.x][action.event.y] = false;
        } else if (selectCall === false) {
          state.userData.userMatrix[action.event.x][action.event.y] = null;
        }
      }

      if (isWin(state.gameMatrix, state.userData.userMatrix)) {
        state.userData.isWin = true;
        state.userData.isGameEnd = true;
      }

      return state;
    default:
      return state;
  }
}
