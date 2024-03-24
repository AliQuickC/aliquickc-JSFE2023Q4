import './sass/main.sass';
import App from './components/app/app';
import reducer from './modules/reducer';
import createStore from './redux/store';
import { getWinners } from './modules/api';
import { FIRST_WINNERS_PAGE, defaultState } from './modules/constant';

(async function (): Promise<void> {
  {
    const { items, count } = await getWinners(FIRST_WINNERS_PAGE);
    defaultState.winners = items;
    defaultState.winnerCount = count;
  }

  const store = createStore(reducer, JSON.parse(JSON.stringify(defaultState)));

  const app = new App(store);
  app.render();
})();
