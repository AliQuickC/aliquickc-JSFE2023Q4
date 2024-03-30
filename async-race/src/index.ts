import './sass/main.sass';
import App from './components/app/app';
import reducer from './modules/reducer';
import createStore from './redux/store';
import { defaultState } from './modules/constant';

(async function (): Promise<void> {
  const store = createStore(reducer, JSON.parse(JSON.stringify(defaultState)));

  const app = new App(store);
  app.render();
})();
