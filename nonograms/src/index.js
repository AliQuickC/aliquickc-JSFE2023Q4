import './sass/main.sass';
import App from './components/app';
import reducer from './modules/reducer';
import createStore from './redux/store';

const initialState = {
  userData: {
    fieldSize: 0,
    gameMatrix: [
      [true, false, true, false, true],
      [true, true, true, true, true],
      [false, true, true, true, false],
      [false, true, false, true, false],
      [false, true, true, true, false],
    ],
    userMatrix: [],
    topClues: [],
    leftClues: [],
    isWin: false,
  },
};

const store = createStore(reducer, initialState);

const app = new App(store);
app.startGame();
