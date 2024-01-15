import Gallows from './gallows';
import Quiz from './quiz';
import Keyboard from './keyboard';
import Modal from './modal';

export default class App {
  constructor(props) {
    this.container = document.body;
    this.store = props;
    this.init();
  }

  init() {
    this.quiz = new Quiz(this.store, 'div', 'quiz');
    this.keyboard = new Keyboard(this.store, 'div', 'keyboard');
    this.gallows = new Gallows(this.store, 'div', 'gallows');
    this.modal = new Modal(this.store, 'dialog', 'dialog');

    this.keyboard.addEventListener('onbutton', this.quiz.render);
    this.keyboard.addEventListener('onbutton', this.gallows.render);
    this.keyboard.addEventListener('endgame', this.modal.openModal);
  }

  destroy() {}

  run() {
    this.render();
  }

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
    componentContainer.append(this.gallows.render());
    componentContainer.append(this.quiz.render());
    componentContainer.append(this.keyboard.render());
    componentContainer.append(this.modal.render());

    return this.container;
  };
}
