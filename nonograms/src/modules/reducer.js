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
    case 'INIT_NEW_GAME':
      state.gameMatrix = templates[action.selectGame];
      state.fieldSize = state.gameMatrix.length;

      state.userData = {
        ...state.userData,
        selectidTemplate: action.selectGame,
        isWin: false,
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
    case 'INIT_SAVED_GAME':
      state.gameMatrix = templates[action.userData.selectidTemplate];
      state.fieldSize = state.gameMatrix.length;

      state.userData = {
        ...action.userData,
        currentPage: 'gameField',
      };

      topClues = countSequencesInColumn(state.gameMatrix);
      leftClues = countSequencesInRow(state.gameMatrix);

      state.topClues = topClues;
      state.leftClues = leftClues;
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
        userMatrix: new Array(state.gameMatrix.length)
          .fill(null)
          .map(() => new Array(state.gameMatrix.length).fill(null)),
      };
      return state;
    case 'RENEW_TIMER_VALUE':
      state.userData.timerValue = action.time;
      return state;
    case 'CELL_CLICK':
      if (action.event.button === MOUSE_BUTTONS.leftButton) {
        const selectCall = state.userData.userMatrix[action.event.x][action.event.y];

        if (selectCall) {
          state.userData.userMatrix[action.event.x][action.event.y] = null;
        } else {
          state.userData.userMatrix[action.event.x][action.event.y] = true;
        }
        if (isWin(state.gameMatrix, state.userData.userMatrix)) {
          state.userData.isWin = true;
        }
      } else if (action.event.button === MOUSE_BUTTONS.rightButton) {
        const selectCall = state.userData.userMatrix[action.event.x][action.event.y];
        if (selectCall === null || selectCall) {
          state.userData.userMatrix[action.event.x][action.event.y] = false;
        } else if (selectCall === false) {
          state.userData.userMatrix[action.event.x][action.event.y] = null;
        }
      }
      return state;
    default:
      return state;
  }
}
