import './sass/main.sass';
import reducer from './modules/reducer';
import createStore from './redux/store';
import App from './components/app';

const initialState = {
  userData: {},
};

const store = createStore(reducer, initialState);
console.log('store: ', store.getState());

const app = new App(store);
app.run();
