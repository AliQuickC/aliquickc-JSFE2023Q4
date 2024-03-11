import App from './components/app/app';
import { initialState } from './modules/constants';
import { getLocalStorage, setItemToLocalStorage } from './modules/local-storage';
import reducer from './modules/reducer';
import createStore from './redux/store';
import './sass/main.sass';

window.addEventListener('beforeunload', () => {
  setItemToLocalStorage(store.getState().userData);
});

initialState.userData = getLocalStorage();
const store = createStore(reducer, initialState);
const app = new App(store);
app.render();
