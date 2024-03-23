import { FIRST_WINNERS_PAGE } from '../../modules/constant';
import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';

export default class WinnersPage extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.init();
  }

  private init(): void {}

  public destroy(): void {}

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

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    return this.container;
  };
}
