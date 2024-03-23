import { FIRST_CARS_PAGE } from '../../modules/constant';
import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';
import carManagementLayout from './car-management.html';
import raceManagment from './race-managment.html';

export default class GaragePage extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.init();
  }

  private init(): void {}

  public destroy(): void {}

  private toHTML(): string {
    const state = this.store.getState();

    return `${carManagementLayout} ${raceManagment}
  <div class="garage__list">
    <div class="garage__cars-page" id="cars-page">
      <h2 class="garage__title">Garage (5)</h2>
      <h3 class="garage__page-title">Page #1</h3>
      <h3 class="garage__winner-info hide" id="winner-info">Winner Winner Winner Winner Winner</h3>
      <div class="garage__car-list" id="car-list"></div>
    </div>

    <div class="page-buttons select_none">
      <button class="prev-page-btn" id="prev-page-btn" data-btn-name="prev-page-btn" ${state.carsPage === FIRST_CARS_PAGE ? 'disabled' : ''}>Prev</button>
      <button class="next-page-btn" id="next-page-btn" data-btn-name="next-page-btn" ${Math.ceil(state.carCount / state.carsLimit) === state.carsPage ? 'disabled' : ''}>Next</button>
    </div>
  </div>`;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    return this.container;
  };
}
