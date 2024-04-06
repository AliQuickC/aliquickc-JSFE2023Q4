import App from './component/app/app';
import { defaultState } from './modules/constant';
import reducer from './modules/reducer';
import createStore from './redux/store';
import './sass/main.sass';

(async function (): Promise<void> {
  const store = createStore(reducer, JSON.parse(JSON.stringify(defaultState)));

  const app = new App(store);
  app.render();
})();
