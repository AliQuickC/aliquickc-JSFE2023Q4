import './sass/main.sass';
import App from './components/app/app';
import reducer from './modules/reducer';
import createStore from './redux/store';
import { getCars, getWinners } from './modules/api';
import { FIRST_CARS_PAGE, FIRST_WINNERS_PAGE, defaultState } from './modules/constant';

(async function (): Promise<void> {
  {
    const { items, count } = await getCars(FIRST_CARS_PAGE);
    defaultState.cars = items;
    defaultState.carCount = count;
  }

  {
    const { items, count } = await getWinners(FIRST_WINNERS_PAGE);
    defaultState.winners = items;
    defaultState.winnerCount = count;
  }

  const store = createStore(reducer, JSON.parse(JSON.stringify(defaultState)));

  const app = new App(store);
  app.render();
})();
