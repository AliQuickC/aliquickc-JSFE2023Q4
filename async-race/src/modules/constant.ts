import { State } from '../types/redux-type';
import { Car, Order, Page, Sort, WinnerFull } from '../types/types';

export const MAX_CARS_ON_PAGE = 7;
export const DEFAULT_WINNERS_ON_PAGE = 10;
export const DEFAULT_FIRST_CARS_PAGE = 1;
export const DEFAULT_FIRST_WINNERS_PAGE = 1;

export const defaultState: State = {
  carsPage: DEFAULT_FIRST_CARS_PAGE,
  carsLimit: MAX_CARS_ON_PAGE,
  cars: [] as Car[],
  carCount: 0,
  selectCarId: 0,
  winnersPage: 1,
  winnersLimit: 10,
  winners: [] as WinnerFull[],
  winnerCount: 0,
  sortWinners: Sort.none,
  sortOrder: Order.asc,
  selectCar: null,
  viewPage: Page.Garage,
};
