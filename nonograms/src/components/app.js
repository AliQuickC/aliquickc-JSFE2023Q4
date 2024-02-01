import Header from './header';
import InfoPanel from './info-panel';
import Field from './field';
import SelectGame from './select-game';

export default class App {
  constructor(props) {
    this.container = document.body;
    this.store = props;
    this.init();
  }

  init() {}

  destroy() {}

  reStartGame = () => {
    this.store.dispatch({
      type: 'GAME_RESTART',
    });
    this.render();
  };

  startGame = () => {
    this.store.dispatch({
      type: 'INIT_NEW_GAME',
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

  render = () => {
    if (this.panel) {
      this.panel.destroy();
    }
    if (this.field) {
      this.field.destroy();
      this.field.removeEventListener('endgame', this.panel.render);
    }

    if (this.selectGame) {
      this.selectGame.destroy();
    }

    this.header = new Header(this.store, 'header', 'header');
    this.panel = new InfoPanel(this.store, 'div', 'panel');
    this.field = new Field(this.store, 'div', 'field');
    this.selectGame = new SelectGame(this.store, 'div', 'select-game');

    this.field.addEventListener('endgame', this.panel.render);
    this.header.addEventListener('startgame', this.startGame);
    this.header.addEventListener('reStartgame', this.reStartGame);

    this.container.innerHTML = this.toHTML();
    const appContainer = this.container.querySelector('.app');
    const mainContainer = this.container.querySelector('.main');
    appContainer.prepend(this.header.render());
    // mainContainer.append(this.field.render());
    // mainContainer.append(this.panel.render());
    mainContainer.append(this.selectGame.render());

    return this.container;
  };
}
