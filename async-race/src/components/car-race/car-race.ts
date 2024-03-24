import { Store } from '../../types/redux-type';
import { Car } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import getSvgCar from './car-icon';

export default class CarRace extends BaseComponent {
  private car!: Car;

  constructor(props: { store: Store; car: Car }, tagName: keyof HTMLElementTagNameMap = 'div', className: string) {
    super(props.store, tagName, className);
    this.car = props.car;
    this.container.setAttribute('data-id', this.car.id.toString());
  }

  private init(): void {}

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
