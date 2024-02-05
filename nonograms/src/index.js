import './sass/main.sass';
import App from './components/app';
import reducer from './modules/reducer';
import createStore from './redux/store';
import {SELECT_TEMPLATE} from './modules/field-template';

const storeKEY = 'nonogram';

const defaultUserData = {
  selectedTemplate: SELECT_TEMPLATE,
  isWin: false,
  isGameEnd: true,
  userMatrix: null,
  userSavedGame: null,
  rezults: [
    {selectedTemplate: 'hourglass', fieldSize: 5, timerValue: 459},
    {selectedTemplate: 'castle', fieldSize: 15, timerValue: 4925},
    {selectedTemplate: 'tv', fieldSize: 10, timerValue: 55},
    {selectedTemplate: 'tree', fieldSize: 10, timerValue: 374},
  ],
  currentPage: 'selectGame', // 'gameField' | 'selectGame'| 'gameRezults'
  timerValue: 0,
  themeIsDark: true,
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
if (userData.isGameEnd) {
  store.dispatch({type: 'SET_USER_DATA', userData});
  store.dispatch({
    type: 'SET_CURRENT_PAGE',
    currentPage: 'selectGame',
  });
} else {
  store.dispatch({type: 'INIT_GAME_FROM_OBJECT', userData});
}

const app = new App(store);
app.render();
