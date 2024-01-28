/* eslint-disable no-case-declarations */

import {countSequencesInColumn, countSequencesInRow} from '../core/utils';

export default function reducer(stateData, action) {
  const state = stateData;
  switch (action.type) {
    case 'INIT_NEW_GAME':
      const topClues = countSequencesInColumn(state.userData.gameMatrix);
      const leftClues = countSequencesInRow(state.userData.gameMatrix);

      state.userData = {...state.userData, fieldSize: state.userData.gameMatrix.length, topClues, leftClues};
      return state;
    default:
      return state;
  }
}
