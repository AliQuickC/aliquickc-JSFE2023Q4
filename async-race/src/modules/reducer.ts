import { CarInputData, Page } from './../types/types';
import { State, Action, ActionID, ActionSetCars } from '../types/redux-type';

export default function reducer(stateData: State, action: Action): State {
  let state = stateData;

  switch (action.type) {
    case ActionID.SetPage: {
      if (action.page != Page.Garage) {
        const { inputCarCreateData, inputCarEditData } = action.carInputData as CarInputData;
        state.carCreateData = inputCarCreateData;
        state.carEditData = inputCarEditData;
      }
      state.viewPage = action.page;
      return state;
    }
    case ActionID.SetCars: {
      const cars = action.cars;
      const carCount = action.carCount;
      const carsPage = action.carsPage;
      const { inputCarCreateData, inputCarEditData } = action.carInputData;
      const carCreateData = {
        name: inputCarCreateData.name,
        color: inputCarCreateData.color,
      };
      const carEditData = {
        name: inputCarEditData.name,
        color: inputCarEditData.color,
      };
      state = { ...state, cars, carCount, carsPage, carCreateData, carEditData };
      return state;
    }
    case ActionID.SetWinnes: {
      const winners = action.winners;
      const winnerCount = action.winnerCount;
      const winnersPage = action.winnersPage;

      state = { ...state, winners, winnerCount, winnersPage };
      return state;
    }
    case ActionID.DeleteCar: {
      state.selectCarNumber = null;
      const carsPage = action.carsPage;

      const winnerCount = action.winnerCount;
      const winnersPage = action.newWinnersPage;
      state = { ...stateData, winnerCount, winnersPage };

      const newAction: ActionSetCars = { ...action, carsPage, type: ActionID.SetCars };
      return reducer(state, newAction);
    }
    case ActionID.ChangeCarsPage: {
      const cars = action.cars;
      const carsPage = action.carsPage;
      const { name, color } = action.inputCarCreateData;
      const carCreateData = { name, color };
      state = { ...state, cars, carsPage, carCreateData, selectCarNumber: null };
      return state;
    }

    case ActionID.SelectCar: {
      const selectCarNumber = action.selectCarNumber;
      const name = state.cars[selectCarNumber].name;
      const color = state.cars[selectCarNumber].color;
      state = { ...state, selectCarNumber, carEditData: { name, color } };
      return state;
    }
    case ActionID.ChangeCarInputData: {
      state.carCreateData = { name: action.inputCarCreateData.name, color: action.inputCarCreateData.color };
      state.carEditData = { name: action.inputCarEditData.name, color: action.inputCarEditData.color };
      return state;
    }
    case ActionID.CreateCar: {
      state.carCreateData.name = '';
      return state;
    }
    default:
      return state;
  }
}
