import { Store } from '../../types/redux-type';
import { CarParams } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import carManagementLayout from './car-management';
import raceManagment from './race-managment.html';

export default class GarageManagement extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);

    this.init();
  }

  private init(): void {}

  public interfaseSwitchRaceStart = (): void => {
    const updateBtn = this.container.querySelector('[data-btn-name="update-btn"]') as HTMLButtonElement;
    updateBtn.disabled = true;
    const raceBtn = this.container.querySelector('#race-btn') as HTMLButtonElement;
    raceBtn.disabled = true;
  };

  public interfaseSwitchRaceStop = (): void => {
    const resetBtn = this.container.querySelector('#reset-btn') as HTMLButtonElement;
    resetBtn.disabled = false;
  };

  public interfaseSwitchRaceResetStart = (): void => {
    const resetBtn = this.container.querySelector('#reset-btn') as HTMLButtonElement;
    resetBtn.disabled = true;
  };

  public interfaseSwitchRaceResetEnd = (): void => {
    const raceBtn = this.container.querySelector('#race-btn') as HTMLButtonElement;
    raceBtn.disabled = false;
  };

  public disableUpdateCar = (): void => {
    const updateBtn = this.container.querySelector('[data-btn-name="update-btn"]') as HTMLButtonElement;
    updateBtn.disabled = true;
  };

  private toHTML(): string {
    const { name, color } = this.store.getState().carCreateData;
    const { selectCarNumber } = this.store.getState();
    const selectCar: CarParams | null = selectCarNumber === null ? null : this.store.getState().carEditData;

    return `${carManagementLayout({ name, color }, selectCar)}${raceManagment}`;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    return this.container;
  };
}
