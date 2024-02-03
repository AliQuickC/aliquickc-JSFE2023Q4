import Header from './header';
import InfoPanel from './info-panel';
import Field from './field';
import SelectGame from './select-game';
import GameTimer from './geme-timer';

export default class App {
  constructor(props) {
    this.container = document.body;
    this.store = props;
    this.init();
  }

  init() {
    this.header = new Header(this.store, 'header', 'header');

    this.header.addEventListener('selectGame', this.render);
    this.header.addEventListener('reStartgame', this.reStartGame);
  }

  destroy() {}

  reStartGame = () => {
    this.store.dispatch({
      type: 'GAME_RESTART',
    });
    this.render();
  };

  startGame = () => {
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
      this.selectGame.addEventListener('startNewGame', this.render);

      mainContainer.append(this.selectGame.render());
    }

    return this.container;
  };
}
