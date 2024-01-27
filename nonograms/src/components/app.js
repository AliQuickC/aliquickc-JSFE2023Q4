import Field from './field';

export default class App {
  constructor(props) {
    this.container = document.body;
    this.store = props;
    this.init();
  }

  init() {
    this.field = new Field(this.store, 'div', 'field');
  }

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
    this.container.innerHTML = this.toHTML();
    const componentContainer = this.container.querySelector('.app__wrap');
    componentContainer.append(this.field.render());

    return this.container;
  };
}
