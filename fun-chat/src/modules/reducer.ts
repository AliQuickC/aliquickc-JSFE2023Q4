import { State, Action, ActionID } from '../types/redux-type';

export default function reducer(stateData: State, action: Action): State {
  let state = stateData;

  switch (action.type) {
    case ActionID.SetPage: {
      state = { ...state };
      return state;
    }
    default:
      return state;
  }
}
