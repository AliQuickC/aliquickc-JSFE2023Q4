import { ActionID, Store } from '../../types/redux-type';
import { Car, GarageButtons } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import getSvgCar from './car-icon';

export default class CarRace extends BaseComponent {
  private car!: Car;
  private deleteCarInGarage: (id: number) => Promise<void>;

  constructor(
    props: { store: Store; car: Car; deleteCarInGarage: (id: number) => Promise<void> },
    tagName: keyof HTMLElementTagNameMap = 'div',
    className: string
  ) {
    super(props.store, tagName, className);
    this.car = props.car;
    this.container.setAttribute('data-car-id', this.car.id.toString());
    this.deleteCarInGarage = props.deleteCarInGarage;

    this.init();
  }

  private init(): void {
    this.container.onclick = this.clickHandler;
  }

  private clickHandler = (event: Event): void => {
    if (!event.target || !(event.target as HTMLElement).hasAttribute('data-btn-name')) {
      return;
    }

    const elementBtnName = (event.target as HTMLElement).dataset.btnName;
    switch (elementBtnName) {
      case GarageButtons.Select: {
        const carElement: HTMLElement = (<HTMLElement>event.target).closest('[data-car-id]') as HTMLElement;
        const carId: number = +(carElement.getAttribute('data-car-id') as string);
        const { cars } = this.store.getState();
        const selectCarNumber: number = cars.findIndex((item) => item.id === carId);

        this.store.dispatch({ type: ActionID.SelectCar, selectCarNumber });
        break;
      }
      case GarageButtons.Remove: {
        const carElement: HTMLElement = (<HTMLElement>event.target).closest('[data-car-id]') as HTMLElement;
        const carId: number = +(carElement.getAttribute('data-car-id') as string);
        this.deleteCarInGarage(carId);
        break;
      }
      case GarageButtons.Start: {
        break;
      }
      case GarageButtons.Stop: {
        break;
      }
      default:
        break;
    }
  };

  private toHTML(): string {
    return `
    <div class="car__edit">
      <button class="select-btn" data-btn-name="select-btn">select</button>
      <button class="remove-btn" data-btn-name="remove-btn">remove</button>
      <h5 class="car__name">${this.car.name}</h5>
    </div>
      <div class="car__race-buttons select_none">
        <button class="car__race-start-btn" data-btn-name="start-btn"></button>
        <button class="car__race-stop-btn" data-btn-name="stop-btn" disabled></button>
      </div>
    <span class="car__race-flag"></span>
    <div class="car__icon car__icon-garage">
      ${getSvgCar(this.car.color)}
    </div>
    <!-- </car__icon> -->`;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    return this.container;
  };
}
