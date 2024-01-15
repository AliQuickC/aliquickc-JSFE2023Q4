import Component from './component';

export default class Gallows extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {}

  destroy() {}

  toHTML() {
    return '<div class="gallows__picture gallows-picture"></div>';
  }

  showMistakes = () => {
    const mistakesStyles = [
      'url("./assets/gallows/gallows.png") no-repeat',
      ',url("./assets/gallows/head.png") no-repeat 252px 149px',
      ',url("./assets/gallows/torso.png") no-repeat 300px 250px',
      ',url("./assets/gallows/hand-one.png") no-repeat 237px 270px',
      ',url("./assets/gallows/hand-two.png") no-repeat 300px 270px',
      ',url("./assets/gallows/leg-one.png") no-repeat 237px 378px',
      ',url("./assets/gallows/leg-two.png") no-repeat 300px 378px',
    ];
    const mistakes = this.store.getState().userData.numberOfMistakes;
    const picture = this.container.querySelector('.gallows-picture');
    picture.style.background = mistakesStyles.slice(0, mistakes + 1).join('');
  };

  render = () => {
    this.container.innerHTML = this.toHTML();
    this.showMistakes();
    return this.container;
  };
}
