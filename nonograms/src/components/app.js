import Header from './header';
import InfoPanel from './info-panel';
import Field from './field';
import SelectGame from './select-game';
import GameTimer from './geme-timer';
import Rezults from './rezults';
import {templates} from '../modules/field-template';
import {randomInteger} from '../core/utils';

export default class App {
  constructor(props) {
    this.container = document.body;
    this.store = props;
    this.init();
  }

  headerHandler = (action) => {
    switch (action.type) {
      case 'selectGame':
        this.store.dispatch({
          type: 'SET_CURRENT_PAGE',
          currentPage: 'selectGame',
        });
        this.render();
        break;
      case 'randomGame':
        const gameNames = Object.keys(templates);
        const gameName = gameNames[randomInteger(0, gameNames.length - 1)];
        this.startGame({gameName});
        break;
      case 'showRezults':
        this.store.dispatch({
          type: 'SET_CURRENT_PAGE',
          currentPage: 'gameRezults',
        });
        this.render();
        break;
      case 'loadGame':
        const {userSavedGame} = this.store.getState().userData;
        if (userSavedGame) {
          this.store.dispatch({
            type: 'LOAD_GAME',
          });
          this.render();
        }
        break;
      case 'resetGame':
        this.reStartGame();
        break;
      case 'showSolution':
        if (!this.store.getState().userData.isWin) {
          this.store.dispatch({
            type: 'SHOW_SOLUTION',
          });
          this.render();
        }
        break;
      case 'changeTheme':
        this.changeThemeHandler();
        break;
      default:
        break;
    }
  };

  changeThemeHandler() {
    const {themeIsDark} = this.store.getState().userData;
    if (themeIsDark) {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
    }
  }

  init() {
    this.changeThemeHandler();
    this.header = new Header(this.store, 'header', 'header');
    this.header.addEventListener('selectHeaderNav', this.headerHandler);
  }

  destroy() {
    this.header.destroy();
  }

  reStartGame = () => {
    this.store.dispatch({
      type: 'GAME_RESTART',
    });
    this.render();
  };

  startGame = (event) => {
    this.store.dispatch({
      type: 'INIT_NEW_GAME',
      selectGame: event.gameName,
    });
    this.render();
  };

  toHTML() {
    return `
    <div class="app">
      <main class="app__container container main">
      </main>
    </div>
    `;
  }

  startTimerHandler = () => {
    if (!this.gameTimer.isActive()) this.gameTimer.startTimer();
  };

  pauseTimerHandler = () => {
    this.gameTimer.pauseTimer();
  };

  render = () => {
    if (this.panel) {
      this.panel.destroy();
    }
    if (this.field) {
      this.field.destroy();
      this.field.removeEventListener('endgame', this.panel.render);
      this.field.removeEventListener('endgame', this.pauseTimerHandler);
      this.field.removeEventListener('onclick', this.startTimerHandler);
    }
    if (this.selectGame) {
      this.selectGame.destroy();
    }
    if (this.gameTimer) {
      this.gameTimer.destroy();
    }
    if (this.gameRezults) {
      this.gameRezults.destroy();
    }
    if (this.header) {
      this.header.destroy();
    }

    const {currentPage} = this.store.getState().userData;

    this.panel = new InfoPanel(this.store, 'div', 'panel');

    this.container.innerHTML = this.toHTML();
    const appContainer = this.container.querySelector('.app');
    const mainContainer = this.container.querySelector('.main');
    appContainer.prepend(this.header.render());

    if (currentPage === 'gameField') {
      this.gameTimer = new GameTimer(this.store, 'div', 'timer');
      this.field = new Field(this.store, 'div', 'field');
      this.field.addEventListener('endgame', this.panel.render);
      this.field.addEventListener('endgame', this.pauseTimerHandler);
      this.field.addEventListener('onclick', this.startTimerHandler);
      mainContainer.append(this.gameTimer.render());
      mainContainer.append(this.field.render());
      mainContainer.append(this.panel.render());
    } else if (currentPage === 'selectGame') {
      this.selectGame = new SelectGame(this.store, 'div', 'select-game');
      this.selectGame.addEventListener('startNewGame', this.startGame);

      mainContainer.append(this.selectGame.render());
    } else if (currentPage === 'gameRezults') {
      this.gameRezults = new Rezults(this.store, 'div', 'rezults');
      mainContainer.append(this.gameRezults.render());
    }

    return this.container;
  };
}
