import App from './components/app/app';
import reducer from './modules/reducer';
import createStore from './redux/store';
import './sass/main.sass';
import { State, UserData } from './types/redux-type';
import { Page } from './types/types';

const storeKEY = 'puzzle';

const defaultUserData: UserData = {
  firstName: null,
  lastName: null,
};

const initialState: State = {
  userData: defaultUserData,
  appData: {
    currentPage: Page.Login,
  },
};

function getLocalStorage(): UserData {
  if (!localStorage.getItem(storeKEY) || localStorage.getItem(storeKEY) === '{}') {
    // if there is no data in the store, create it from a template object
    const stringUserData = JSON.stringify(defaultUserData); // object to string
    localStorage.setItem(storeKEY, stringUserData); // string to Local Storage
  }
  // read date from the store
  return JSON.parse(localStorage.getItem(storeKEY) as string);
}

function setItemToLocalStorage(): void {
  localStorage.setItem(storeKEY, JSON.stringify(store.getState().userData));
}

window.addEventListener('beforeunload', setItemToLocalStorage);

initialState.userData = getLocalStorage();
const store = createStore(reducer, initialState);
const app = new App(store);
app.render();
