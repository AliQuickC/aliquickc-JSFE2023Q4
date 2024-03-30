import { getWinners } from '../../modules/api';
import { FIRST_WINNERS_PAGE } from '../../modules/constant';
import { ActionID, Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';
import WinnerTable from '../winner-table/winner-table';

export default class WinnersPage extends BaseComponent {
  private winnerTable!: WinnerTable;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.init();
  }

  private init(): void {}

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
  <button class="prev-page-btn" id="prev-page-btn" ${winnersPage === FIRST_WINNERS_PAGE ? 'disabled' : ''}>Prev</button>
  <button class="next-page-btn" id="next-page-btn" ${Math.ceil(winnerCount / winnersLimit) === winnersPage ? 'disabled' : ''}>Next</button>
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
