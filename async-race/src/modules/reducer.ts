import { State, Action, ActionID } from '../types/redux-type';

export default function reducer(stateData: State, action: Action): State {
  const state = stateData;

  switch (action.type) {
    case ActionID.SetPage: {
      state.viewPage = action.page;
      return state;
    }
    case ActionID.SetCars: {
      state.cars = action.cars;
      state.carCount = action.carsCount;
      return state;
    }
    case ActionID.InputCreateName: {
      state.carCreateData.name = action.value;
      return state;
    }
    case ActionID.InputCreateColor: {
      state.carCreateData.color = action.value;
      return state;
    }

    default:
      return state;
  }
}
