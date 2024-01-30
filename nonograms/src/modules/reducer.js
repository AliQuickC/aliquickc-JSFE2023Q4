import MOUSE_BUTTONS from './constants';
import {countSequencesInColumn, countSequencesInRow} from '../core/utils';

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
      const topClues = countSequencesInColumn(state.userData.gameMatrix);
      const leftClues = countSequencesInRow(state.userData.gameMatrix);
      const userMatrix = new Array(state.userData.gameMatrix.length).fill(
        new Array(state.userData.gameMatrix.length).fill(null)
      );

      state.userData = {
        ...state.userData,
        userMatrix,
        fieldSize: state.userData.gameMatrix.length,
        topClues,
        leftClues,
        isWin: false,
      };
      return state;
    case 'CELL_CLICK':
      if (action.event.button === MOUSE_BUTTONS.leftButton) {
        const selectCall = state.userData.userMatrix[action.event.x][action.event.y];

        if (selectCall) {
          state.userData.userMatrix[action.event.x][action.event.y] = false;
        } else {
          state.userData.userMatrix[action.event.x][action.event.y] = true;
        }
        if (isWin(state.userData.gameMatrix, state.userData.userMatrix)) {
          state.userData.isWin = true;
        }
      }
      return state;
    default:
      return state;
  }
}
