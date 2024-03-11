import { Action, State } from '../types/redux-type';
import { Page } from '../types/types';

export default function reducer(stateData: State, action: Action): State {
  const state = stateData;

  /* eslint-disable indent */
  switch (action.type) {
    case 'INIT':
      if (state.userData.firstName) {
        state.appData = { ...state.appData, currentPage: Page.Start };
      } else {
        state.appData = { ...state.appData, currentPage: Page.Login };
      }
      return state;
    case 'SET_USER':
      state.userData = { ...state.userData, firstName: action.firstName, lastName: action.lastName };
      state.appData = { ...state.appData, currentPage: Page.Start };
      return state;
    case 'LOG-OFF':
      state.userData = { ...state.userData, firstName: null, lastName: null };
      state.appData = { ...state.appData, currentPage: Page.Login };
      return state;
    default:
      return state;
  }
}
