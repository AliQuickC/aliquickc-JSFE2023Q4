import { State } from '../types/redux-type';
import { Car, Order, Page, Sort, WinnerFull } from '../types/types';

export const MAX_CARS_ON_PAGE = 7;
export const DEFAULT_WINNERS_ON_PAGE = 10;
export const FIRST_CARS_PAGE = 1;
export const FIRST_WINNERS_PAGE = 1;
const DEFAULT_CAR_COUNT = 0;

export const defaultState: State = {
  carsPage: FIRST_CARS_PAGE,
  carsLimit: MAX_CARS_ON_PAGE,
  cars: [] as Car[],
  carCount: DEFAULT_CAR_COUNT,
  winnersPage: 1,
  winnersLimit: 10,
  winners: [] as WinnerFull[],
  winnerCount: 0,
  sortWinners: Sort.none,
  sortOrder: Order.asc,
  selectCarNumber: null,
  viewPage: Page.Garage,
  carCreateData: { name: '', color: '#000000' },
  carEditData: { name: '', color: '#000000' },
};
