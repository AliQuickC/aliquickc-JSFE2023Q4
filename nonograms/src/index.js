import './sass/main.sass';
import App from './components/app';
import reducer from './modules/reducer';
import createStore from './redux/store';
import {SELECT_TEMPLATE} from './modules/field-template';

const storeKEY = 'nonogram';

const defaultUserData = {
  selectidTemplate: SELECT_TEMPLATE,
  isWin: true,
  userMatrix: null,
  userMatrixlatestGame: null,
  rezults: {},
  currentPage: 'selectGame', // 'gameField' | 'selectGame'
  timerValue: 0,
};

const initialState = {
  userData: null,
  gameMatrix: [],
  topClues: [],
  leftClues: [],
  fieldSize: 0,
};

const store = createStore(reducer, initialState);

function getLocalStorage() {
  if (!localStorage.getItem(storeKEY) || localStorage.getItem(storeKEY) === '{}') {
    // if there is no data in the store, create it from a template object
    const stringUserData = JSON.stringify(defaultUserData); // object to string
    localStorage.setItem(storeKEY, stringUserData); // string to Local Storage
  }
  // read date from the store
  return JSON.parse(localStorage.getItem(storeKEY));
}

function setItemToLocalStorage() {
  localStorage.setItem(storeKEY, JSON.stringify(store.getState().userData));
}

window.addEventListener('beforeunload', setItemToLocalStorage);

const userData = getLocalStorage();
if (userData.isWin) {
  store.dispatch({type: 'SET_USER_DATA', userData});
  store.dispatch({
    type: 'SET_CURRENT_PAGE',
    currentPage: 'selectGame',
  });
} else {
  store.dispatch({type: 'INIT_SAVED_GAME', userData});
}

const app = new App(store);
app.render();
