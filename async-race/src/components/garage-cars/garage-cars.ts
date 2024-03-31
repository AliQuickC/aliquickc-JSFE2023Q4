import { getCars } from '../../modules/api';
import { FIRST_CARS_PAGE } from '../../modules/constant';
import { Store } from '../../types/redux-type';
import { Car } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import CarRace from '../car-race/car-race';

export default class GarageCars extends BaseComponent {
  private raceCars: CarRace[] = [];
  private renderGaragePage: (pageNumber: number) => Promise<void>;
  private deleteCarInGarage: (id: number) => Promise<void>;
  private starCarEvent: () => void;
  private checkWinner: (id: number, time: number) => boolean;

  constructor(
    props: {
      store: Store;
      renderGaragePage: (pageNumber: number) => Promise<void>;
      deleteCarInGarage: (id: number) => Promise<void>;
      starCarEvent: () => void;
      checkWinner: (id: number, time: number) => boolean;
    },
    tagName: keyof HTMLElementTagNameMap,
    className: string
  ) {
    super(props.store, tagName, className);
    this.renderGaragePage = props.renderGaragePage;
    this.deleteCarInGarage = props.deleteCarInGarage;
    this.starCarEvent = props.starCarEvent;
    this.checkWinner = props.checkWinner;
    this.init();
  }

  private init(): void {}

  public destroy(): void {
    this.raceCars.forEach((car) => car.destroy());
    super.destroy();
  }

  public interfaseSwitchRaceStart = (): void => {
    const prevPageBtn = document.querySelector('#prev-page-btn') as HTMLButtonElement;
    const nextPageBtn = document.querySelector('#next-page-btn') as HTMLButtonElement;
    prevPageBtn.disabled = true;
    nextPageBtn.disabled = true;
  };

  public interfaseSwitchRaceStop = (): void => {
    const { carsPage, carCount, carsLimit } = this.store.getState();
    const maxPagesCount = Math.ceil(carCount / carsLimit);
    const prevPageBtn = document.querySelector('#prev-page-btn') as HTMLButtonElement;
    const nextPageBtn = document.querySelector('#next-page-btn') as HTMLButtonElement;
    if (carsPage !== FIRST_CARS_PAGE) {
      prevPageBtn.disabled = false;
    }
    if (carsPage !== maxPagesCount) {
      nextPageBtn.disabled = false;
    }
  };

  private toHTML(): string {
    const { carCount, carsPage, carsLimit } = this.store.getState();
    const maxPagesCount = Math.ceil(carCount / carsLimit);

    return `
    <div class="garage__cars-page" id="cars-page">
      <h2 class="garage__title">Garage (${carCount})</h2>
      <h3 class="garage__page-title">Page #${carsPage} (${carCount === 0 ? 1 : Math.ceil(carCount / carsLimit)})</h3>
      <h3 class="garage__winner-info hide" id="winner-info">Winner Winner Winner Winner Winner</h3>
      <div class="garage__car-list" id="car-list"></div>
    </div>

    <div class="page-buttons select_none">
      <button class="prev-page-btn" id="prev-page-btn" data-btn-name="prev-page-btn" ${carsPage <= FIRST_CARS_PAGE ? 'disabled' : ''}>Prev</button>
      <button class="next-page-btn" id="next-page-btn" data-btn-name="next-page-btn" ${carsPage >= maxPagesCount ? 'disabled' : ''}>Next</button>
  </div>`;
  }

  public showWinner = (id: number, time: number): void => {
    const { cars } = this.store.getState();
    const winnerCar = cars.find((item) => item.id === id) as Car;

    const winnerInfo = this.container.querySelector('#winner-info') as HTMLElement;
    winnerInfo.textContent = `${winnerCar.name} went first (${(time / 1000).toFixed(2)}s)!`;
    winnerInfo.classList.remove('hide');
  };

  public hideWinner = (): void => {
    const winnerInfo = this.container.querySelector('#winner-info') as HTMLElement;
    winnerInfo.classList.add('hide');
  };

  public async startAllCars(callback: (status: boolean) => void): Promise<void> {
    const startCarArray = this.raceCars.map((raceCar) => raceCar.startCar());

    await Promise.all(startCarArray).then(() => {
      callback(false);
    });
  }

  public async stopAllCars(): Promise<void> {
    const stopCarArray = this.raceCars.map((raceCar) => raceCar.stopCar());

    await Promise.all(stopCarArray);
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
        (car) =>
          new CarRace(
            {
              store: this.store,
              car: { id: car.id, name: car.name, color: car.color },
              deleteCarInGarage: this.deleteCarInGarage,
              starCarEvent: this.starCarEvent,
              checkWinner: this.checkWinner,
            },
            'div',
            'car'
          )
      );
      this.raceCars.forEach((car) => carList.append(car.render()));
    }

    return this.container;
  };
}
