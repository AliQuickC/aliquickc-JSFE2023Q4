import './sass/main.sass';
import App from './components/app/app';
import reducer from './modules/reducer';
import createStore from './redux/store';

const initialState = {};

const store = createStore(reducer, initialState);

const app = new App(store);
app.render();
