import Component from './component';
import {getTimeString} from '../core/utils';

export default class Rezults extends Component {
  constructor(props, tagName, className) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  init() {}

  toHTML() {
    const rezults = this.store.getState().userData.rezults.slice();

    rezults.sort((a, b) => a.timerValue - b.timerValue);
    let tableRows = '';

    for (let index = 0; index < rezults.length; index += 1) {
      tableRows += `
      <tr>
      <td>${rezults[index].selectedTemplate}</td>
      <td>${rezults[index].fieldSize}x${rezults[index].fieldSize}</td>
      <td>${getTimeString(rezults[index].timerValue)}</td>
      </tr>
      `;
    }

    return `
    <table class="rezults__table">
      <caption class="rezults__table-title">Rezults</caption>
      <thead>
        <tr>
          <th>puzzle</th><th>difficulty</th><th>time</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    `;
  }

  render = () => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
