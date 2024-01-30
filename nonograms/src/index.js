import './sass/main.sass';
import App from './components/app';
import reducer from './modules/reducer';
import createStore from './redux/store';
import {templates, SELECT_TEMPLATE} from './modules/field-template';

const initialState = {
  userData: {
    fieldSize: 0,
    gameMatrix: templates[SELECT_TEMPLATE],
    userMatrix: [],
    topClues: [],
    leftClues: [],
    isWin: false,
  },
};

const store = createStore(reducer, initialState);

const app = new App(store);
app.startGame();
