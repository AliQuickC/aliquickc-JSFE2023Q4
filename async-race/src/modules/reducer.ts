import { State, Action } from '../types/redux-type';

export default function reducer(stateData: State, action: Action): State {
  const state = stateData;

  switch (action.type) {
    case 'test': {
      return state;
    }
    default:
      return state;
  }
}
