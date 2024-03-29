import { State, Action, ActionID } from '../types/redux-type';

export default function reducer(stateData: State, action: Action): State {
  let state = stateData;

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
    case ActionID.SelectCar: {
      const selectCarNumber = action.selectCarNumber;
      const name = state.cars[selectCarNumber].name;
      const color = state.cars[selectCarNumber].color;
      state = { ...state, selectCarNumber, carEditData: { name, color } };
      return state;
    }
    case ActionID.InputEditName: {
      state.carEditData.name = action.value;
      return state;
    }
    case ActionID.InputEditColor: {
      state.carEditData.color = action.value;
      return state;
    }
    default:
      return state;
  }
}
