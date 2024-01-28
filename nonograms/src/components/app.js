import InfoPanel from './info-panel';
import Field from './field';

export default class App {
  constructor(props) {
    this.container = document.body;
    this.store = props;
    this.init();
  }

  init() {}

  destroy() {}

  startGame = () => {
    this.store.dispatch({type: 'INIT_NEW_GAME'});
    this.render();
  };

  toHTML() {
    return `
    <main class="app">
      <div class="app__container container">
        <div class="app__wrap">
        </div>
      </div>
    </main>
    `;
  }

  render = () => {
    if (this.panel) {
      this.panel.destroy();
      this.panel.removeEventListener('startgame', this.startGame);
    }
    if (this.field) {
      this.field.destroy();
      this.field.removeEventListener('endgame', this.panel.render);
    }

    this.panel = new InfoPanel(this.store, 'div', 'panel');
    this.field = new Field(this.store, 'div', 'field');
    this.field.addEventListener('endgame', this.panel.render);
    this.panel.addEventListener('startgame', this.startGame);

    this.container.innerHTML = this.toHTML();
    const componentContainer = this.container.querySelector('.app__wrap');
    componentContainer.append(this.panel.render());
    componentContainer.append(this.field.render());

    return this.container;
  };
}
