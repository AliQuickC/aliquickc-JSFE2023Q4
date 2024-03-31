import { getWinners } from '../../modules/api';
import { ActionID, Store } from '../../types/redux-type';
import { Order, Sort, WinnersButtons } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import getSvgCar from '../car-race/car-icon';

export default class WinnerTable extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.container.id = 'winners-table';
    this.init();
  }

  private init(): void {
    this.container.onclick = this.clickHandler;
  }

  private clickHandler = (event: Event): void => {
    if (event.target) {
      if (!event.target || !(event.target as HTMLElement).hasAttribute('data-btn-name')) {
        return;
      }

      const elementBtnName = (event.target as HTMLElement).dataset.btnName;
      const { sortOrder } = this.store.getState();

      let newSortOrder: Order;
      if (sortOrder === Order.asc) {
        newSortOrder = Order.desc;
      } else {
        newSortOrder = Order.asc;
      }

      switch (elementBtnName) {
        case WinnersButtons.SortWins: {
          const sortWinners = Sort.wins;

          this.renderWinnersTable(sortWinners, newSortOrder);
          break;
        }
        case WinnersButtons.SortTime: {
          const sortWinners = Sort.time;

          this.renderWinnersTable(sortWinners, newSortOrder);
          break;
        }
        default:
          break;
      }
    }
  };

  private renderWinnersTable = async (sortWinners: Sort, sortOrder: Order): Promise<void> => {
    const { winnersPage, winnersLimit } = this.store.getState();

    const { items, count } = await getWinners(
      winnersPage,
      winnersLimit,
      sortWinners === Sort.none ? undefined : sortWinners,
      sortOrder
    );

    this.store.dispatch({
      type: ActionID.ChangeWinnersTable,
      winners: items,
      winnerCount: count,
      winnersPage: winnersPage,
      sortWinners,
      sortOrder,
    });
  };

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
        <th data-btn-name="th-wins">Wins${sortWins}</th>
        <th data-btn-name="th-time">Best time${sortTime}</th>
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
