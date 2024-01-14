import Component from './component';

export default class Quiz extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {}

  destroy() {}

  toHTML() {
    const {numberOfMistakes, currentQuestion, guessingLetters} = this.store.getState().userData;
    const riddle = this.store.getState().riddles[currentQuestion];
    let word = Array(riddle.word.length).fill('_');
    guessingLetters.forEach(element => {
      word[element] = riddle.word[element].toUpperCase();
    });
    word = word.join('');
    console.log('questions: ', riddle.word);

    return `
    <div class="quiz__secret-word">${word}</div>
    <div class="quiz__question">
      <label>Вопрос: </label><output>${riddle.question} ?</output>
    </div>
    <div class="quiz__incorrect">
      <label>Количество неправильных догадок: </label>
      <output class="quiz__incorrect-counter">${numberOfMistakes} / 6</output>
    </div>
      `;
  }

  render() {
    this.container.innerHTML = this.toHTML();
    return this.container;
  }
}
