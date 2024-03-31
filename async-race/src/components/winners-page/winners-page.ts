import { getWinners } from '../../modules/api';
import { FIRST_WINNERS_PAGE } from '../../modules/constant';
import { ActionID, Store } from '../../types/redux-type';
import { Sort, WinnerFull, WinnersButtons } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import WinnerTable from '../winner-table/winner-table';

export default class WinnersPage extends BaseComponent {
  private winnerTable!: WinnerTable;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
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
      const { winnersPage } = this.store.getState();
      switch (elementBtnName) {
        case WinnersButtons.Next: {
          this.changeWinnersPage(winnersPage + 1);
          break;
        }
        case WinnersButtons.Prev: {
          this.changeWinnersPage(winnersPage - 1);
          break;
        }
        default:
          break;
      }
    }
  };

  private changeWinnersPage = async (pageNumber: number): Promise<void> => {
    const { sortWinners, winnersLimit, sortOrder } = this.store.getState();
    let winners: { items: WinnerFull[]; count: number };
    if (sortWinners === Sort.none) {
      winners = await getWinners(pageNumber);
    } else {
      winners = await getWinners(pageNumber, winnersLimit, sortWinners, sortOrder);
    }

    this.store.dispatch({
      type: ActionID.ChangeWinnersPage,
      winners: winners.items,
      winnersPage: pageNumber,
    });
  };

  private toHTML(): string {
    const state = this.store.getState();
    const { winnerCount, winnersPage, winnersLimit } = this.store.getState();
    const numberOfPages = winnerCount ? Math.ceil(winnerCount / winnersLimit) : 1;

    return `
<div class="winners__cars-page" id="cars-page">
  <h2 class="winners__title">Winners (${winnerCount})</h2>
  <h3 class="winners__page-title">Page #${state.winnersPage}(${numberOfPages})</h3>
</div>

<div class="winners__table" id="winners-table"></div>

<div class="page-buttons">
  <button class="prev-page-btn" id="prev-page-btn" data-btn-name="prev-page-btn" ${winnersPage === FIRST_WINNERS_PAGE ? 'disabled' : ''}>Prev</button>
  <button class="next-page-btn" id="next-page-btn" data-btn-name="next-page-btn" ${Math.ceil(winnerCount / winnersLimit) === winnersPage ? 'disabled' : ''}>Next</button>
</div>
`;
  }

  private renderWinnerPage = async (pageNumber: number): Promise<void> => {
    const { items, count } = await getWinners(pageNumber);

    this.store.dispatch({ type: ActionID.SetWinnes, winners: items, winnerCount: count, winnersPage: pageNumber });
  };

  public checkWinnerChanges = async (pageNumber: number): Promise<void> => {
    const { winnerCount, winnersPage } = this.store.getState();
    const { count } = await getWinners(pageNumber);
    if (count != winnerCount) {
      this.renderWinnerPage(winnersPage);
    }
  };

  public render = (): HTMLElement => {
    const { winnersPage } = this.store.getState();
    this.checkWinnerChanges(winnersPage);

    this.container.innerHTML = this.toHTML();

    const winnersTableElement = this.container.querySelector('#winners-table') as HTMLElement;

    this.winnerTable = new WinnerTable(this.store, 'div', 'winners__table');
    winnersTableElement.replaceWith(this.winnerTable.render());

    return this.container;
  };
}
