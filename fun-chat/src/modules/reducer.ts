import { Page } from '../types/enum';
import { State, Action, ActionID } from '../types/redux-type';

export default function reducer(stateData: State, action: Action): State {
  const state = stateData;

  switch (action.type) {
    case ActionID.SetPage: {
      state.appData = { ...state.appData, currentPage: action.page };
      return state;
    }
    case ActionID.Authentication: {
      state.userData = { ...state.userData, name: action.name, password: action.password, isLogin: true };
      state.appData = { ...state.appData, currentPage: Page.Chat };
      return state;
    }

    default:
      return state;
  }
}
