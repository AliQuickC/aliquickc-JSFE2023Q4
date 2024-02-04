import Component from './component';
import {templates} from '../modules/field-template';

export default class SelectGame extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {
    this.container.onclick = (event) => {
      if (event.target && event.target.closest('[data-type="selectGameItem"]')) {
        const elem = event.target.closest('[data-type="selectGameItem"]');
        const gameName = elem.getAttribute('data-game-name');
        /* eslint-disable-next-line no-underscore-dangle */
        this._triggerEvent('startNewGame', {gameName});
      }
    };
  }

  destroy() {
    this.container.onclick = null;
  }

  toHTML() {
    const arr = Object.entries(templates).map((item) => [item[0], item[1].length]);
    const game5x5 = arr.filter((item) => item[1] === 5);
    const game10x10 = arr.filter((item) => item[1] === 10);
    const game15x15 = arr.filter((item) => item[1] === 15);

    function gamesLayout(templateArray) {
      return templateArray
        .map(
          (item) => `
      <div class="select-game__item" data-type="selectGameItem" data-game-name="${item[0]}">
        <div class="select-game__picture">
          <img src="./assets/templates/${item[0]}.jpg" alt="${item[0]}">
        </div>
        <span>${item[0]}</span>
      </div>`
        )
        .join('');
    }

    return `
    <h3 class="select-game__title">Select game</h3>
    <p class="select-game__subtitle">5x5</p>
    <div  class="select-game__group">
    ${gamesLayout(game5x5)}
    </div>
    <p class="select-game__subtitle">10x10</p>
    <div  class="select-game__group">
    ${gamesLayout(game10x10)}
    </div>
    <p class="select-game__subtitle">15x15</p>
    <div  class="select-game__group">
    ${gamesLayout(game15x15)}
    </div>
    `;
  }

  render = () => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
