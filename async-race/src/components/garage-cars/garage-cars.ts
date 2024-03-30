import { getCars } from '../../modules/api';
import { FIRST_CARS_PAGE } from '../../modules/constant';
import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';
import CarRace from '../car-race/car-race';

export default class GarageCars extends BaseComponent {
  private raceCars: CarRace[] = [];
  private renderGaragePage: (pageNumber: number) => Promise<void>;

  constructor(
    props: { store: Store; renderGaragePage: (pageNumber: number) => Promise<void> },
    tagName: keyof HTMLElementTagNameMap,
    className: string
  ) {
    super(props.store, tagName, className);
    this.renderGaragePage = props.renderGaragePage;
    this.init();
  }

  private init(): void {}

  public destroy(): void {
    this.raceCars.forEach((car) => car.destroy());
    super.destroy();
  }

  private toHTML(): string {
    const state = this.store.getState();
    const { carCount, carsPage, carsLimit } = this.store.getState();

    return `
    <div class="garage__cars-page" id="cars-page">
      <h2 class="garage__title">Garage (${carCount})</h2>
      <h3 class="garage__page-title">Page #${carsPage} (${carCount === 0 ? 1 : Math.ceil(carCount / carsLimit)})</h3>
      <h3 class="garage__winner-info hide" id="winner-info">Winner Winner Winner Winner Winner</h3>
      <div class="garage__car-list" id="car-list"></div>
    </div>

    <div class="page-buttons select_none">
      <button class="prev-page-btn" id="prev-page-btn" data-btn-name="prev-page-btn" ${state.carsPage === FIRST_CARS_PAGE ? 'disabled' : ''}>Prev</button>
      <button class="next-page-btn" id="next-page-btn" data-btn-name="next-page-btn" ${Math.ceil(state.carCount / state.carsLimit) <= state.carsPage ? 'disabled' : ''}>Next</button>
  </div>`;
  }

  public checkCarChanges = async (pageNumber: number): Promise<void> => {
    const { carCount, carsPage } = this.store.getState();
    const { count } = await getCars(pageNumber);
    if (count != carCount) {
      this.renderGaragePage(carsPage);
    }
  };

  public render = (): HTMLElement => {
    const { carsPage } = this.store.getState();
    this.checkCarChanges(carsPage);

    this.container.innerHTML = this.toHTML();

    const { carCount } = this.store.getState();
    if (carCount) {
      this.raceCars.forEach((car) => car.destroy());

      const { cars } = this.store.getState();
      const carList: HTMLElement = this.container.querySelector('#car-list') as HTMLElement;
      this.raceCars = cars.map(
        (car) => new CarRace({ store: this.store, car: { id: car.id, name: car.name, color: car.color } }, 'div', 'car')
      );
      this.raceCars.forEach((car) => carList.append(car.render()));
    }

    return this.container;
  };
}
