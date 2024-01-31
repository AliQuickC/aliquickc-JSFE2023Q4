import './sass/main.sass';
import App from './components/app';
import reducer from './modules/reducer';
import createStore from './redux/store';
import {templates, SELECT_TEMPLATE} from './modules/field-template';

const storeKEY = 'nonogram';

const defaultUserData = {
  selectidTemplate: SELECT_TEMPLATE,
  userMatrix: [],
  userMatrixHistori: [],
  rezults: [],
  isWin: false,
};

const initialState = {
  userData: {},
  gameMatrix: [],
  topClues: [],
  leftClues: [],
  fieldSize: 0,
};

initialState.userData = JSON.parse(JSON.stringify(defaultUserData));
initialState.gameMatrix = templates[initialState.userData.selectidTemplate];

const store = createStore(reducer, initialState);

const app = new App(store);
app.startGame();
