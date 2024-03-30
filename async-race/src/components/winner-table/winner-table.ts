import { Store } from '../../types/redux-type';
import { Order, Sort } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import getSvgCar from '../car-race/car-icon';

export default class WinnerTable extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.container.id = 'winners-table';
    this.init();
  }

  private init(): void {}

  private toHTML(): string {
    const { winnersPage, winnersLimit, sortWinners, sortOrder, winners } = this.store.getState();

    const beginCount = (winnersPage - 1) * winnersLimit;

    const tBodyWinners = winners
      .map(
        (elem, index) =>
          `<tr>
    <td>${beginCount + index + 1}</td>
    <td><div class="car__icon car__icon-table">${getSvgCar(elem.car.color)}</div></td>
    <td>${elem.car.name}</td>
    <td>${elem.wins}</td>
    <td>${elem.time}</td>
    </tr>`
      )
      .join('');

    const sortWins = sortWinners === Sort.wins ? (sortOrder === Order.desc ? '↑' : '↓') : '';
    const sortTime = sortWinners === Sort.time ? (sortOrder === Order.desc ? '↑' : '↓') : '';

    return `
  <table class="table">
    <thead>
      <tr>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th id="th-wins">Wins${sortWins}</th>
        <th id="th-time">Best time${sortTime}</th>
      </tr>
    </thead>
    <tbody>
		${tBodyWinners}
    </tbody>
  </table>
	`;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    return this.container;
  };
}
