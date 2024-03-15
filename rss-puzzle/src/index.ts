import App from './components/app/app';
import { initialState } from './modules/constants';
import getData from './modules/getData';
import { getLocalStorage, setItemToLocalStorage } from './modules/local-storage';
import reducer from './modules/reducer';
import createStore from './redux/store';
import './sass/main.sass';
import { WordCollection } from './types/types';

(async function (): Promise<void> {
  const GAME_LEVELS = 6;

  const wordCollection: WordCollection[] = [];
  for (let i = 1; i <= GAME_LEVELS; i++) {
    wordCollection.push(await getData(`./data/wordCollectionLevel${i}.json`));
  }

  initialState.wordCollection = wordCollection;

  initialState.userData = getLocalStorage();
  const store = createStore(reducer, initialState);
  const app = new App(store);
  app.render();

  window.addEventListener('beforeunload', () => {
    setItemToLocalStorage(store.getState().userData);
  });
})();
