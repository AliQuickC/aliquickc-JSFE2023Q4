import './sass/main.sass';
import App from './components/app';
import reducer from './modules/reducer';
import createStore from './redux/store';

const initialState = {
  userData: {
    fieldSize: 5,
    gameMatrix: [
      [true, false, true, false, true],
      [true, true, true, true, true],
      [false, true, true, true, false],
      [false, true, false, true, false],
      [true, false, true, false, true],
    ],
    userMatrix: [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ],
  },
};

const store = createStore(reducer, initialState);

const app = new App(store);
app.startGame();
