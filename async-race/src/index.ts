import './sass/main.sass';
import App from './components/app/app';
import reducer from './modules/reducer';
import createStore from './redux/store';
import { getCars, getWinners } from './modules/api';
import { DEFAULT_FIRST_CARS_PAGE, DEFAULT_FIRST_WINNERS_PAGE } from './modules/constant';

const initialState = {};

const store = createStore(reducer, initialState);

(async function (): Promise<void> {
  {
    const { items, count } = await getCars(DEFAULT_FIRST_CARS_PAGE);
    console.log('items: ', items);
    console.log('count: ', count);
  }

  {
    const { items, count } = await getWinners(DEFAULT_FIRST_WINNERS_PAGE);
    console.log('items: ', items);
    console.log('count: ', count);
  }

  const app = new App(store);
  app.render();
})();
