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
  switch (action.type) {
    case 'INIT_NEW_GAME':
      const topClues = countSequencesInColumn(state.gameMatrix);
      const leftClues = countSequencesInRow(state.gameMatrix);

      state.fieldSize = state.gameMatrix.length;
      state.topClues = topClues;
      state.leftClues = leftClues;
      return state;

    case 'SET_USER_DATA':
      state.gameMatrix = templates[action.userData.selectidTemplate];

      if (action.userData.userMatrix === null) {
        state.userData = {
          ...action.userData,
          userMatrix: new Array(state.gameMatrix.length)
            .fill(null)
            .map(() => new Array(state.gameMatrix.length).fill(null)),
        };
      } else {
        state.userData = JSON.parse(JSON.stringify(action.userData));
      }
      return state;
    case 'GAME_RESTART':
      state.userData = {
        ...state.userData,
        userMatrix: new Array(state.gameMatrix.length)
          .fill(null)
          .map(() => new Array(state.gameMatrix.length).fill(null)),
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
