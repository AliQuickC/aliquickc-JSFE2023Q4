import { drive, startEngine, stopEngine } from '../../modules/api';
import { ActionID, Store } from '../../types/redux-type';
import { Car, DriveStatus, EngineStatus, GarageButtons } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import getSvgCar from './car-icon';

export default class CarRace extends BaseComponent {
  private car!: Car;
  private carId: number;
  private deleteCarInGarage: (id: number) => Promise<void>;
  private idReqAnim!: number | null;
  private onePercentDistance!: number;
  private countTime!: number;
  private driveStartTime!: number;
  private carIcon!: HTMLElement;
  private starCarEvent: () => void;

  constructor(
    props: { store: Store; car: Car; deleteCarInGarage: (id: number) => Promise<void>; starCarEvent: () => void },
    tagName: keyof HTMLElementTagNameMap = 'div',
    className: string
  ) {
    super(props.store, tagName, className);
    this.car = props.car;
    this.carId = this.car.id;
    this.container.setAttribute('data-car-id', this.carId.toString());
    this.deleteCarInGarage = props.deleteCarInGarage;
    this.starCarEvent = props.starCarEvent;

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
        const { cars } = this.store.getState();
        const selectCarNumber: number = cars.findIndex((item) => item.id === this.carId);

        this.store.dispatch({ type: ActionID.SelectCar, selectCarNumber });
        break;
      }
      case GarageButtons.Remove: {
        this.deleteCarInGarage(this.carId);
        break;
      }
      case GarageButtons.Start: {
        this.startCar();
        break;
      }
      case GarageButtons.Stop: {
        this.stopCar();
        break;
      }
      default:
        break;
    }
  };

  private carAnimation = (): void => {
    const currentTime: number = new Date().getTime();
    const percentTimeAhead: number = 100 - (currentTime - this.driveStartTime) / (this.countTime / 100);
    const positionRight: number = this.onePercentDistance * percentTimeAhead;
    if (positionRight > 0) {
      this.carIcon.style.right = positionRight + 'px';
      this.idReqAnim = requestAnimationFrame(this.carAnimation);
    }
  };

  async startCar(): Promise<number> {
    const carElement = this.container;
    this.carIcon = carElement.querySelector('.car__icon') as HTMLElement;
    const startBtn = carElement.querySelector('.car__race-start-btn') as HTMLButtonElement;
    const stopBtn: HTMLButtonElement = carElement.querySelector('.car__race-stop-btn') as HTMLButtonElement;
    const selectBtn = carElement.querySelector('.select-btn') as HTMLButtonElement;
    const removeBtn = carElement.querySelector('.remove-btn') as HTMLButtonElement;
    const distanceInPixel: number = carElement.offsetWidth - this.carIcon.offsetWidth - this.carIcon.offsetLeft;

    startBtn.disabled = true;
    selectBtn.disabled = true;
    removeBtn.disabled = true;
    this.starCarEvent();

    const timeCorrection = 0;

    this.onePercentDistance = distanceInPixel / 100;
    this.carIcon.style.right = `${distanceInPixel.toString()}px`;

    const engineStat: EngineStatus = await startEngine(this.carId);
    stopBtn.disabled = false;

    this.countTime = engineStat.distance / engineStat.velocity + timeCorrection;

    this.driveStartTime = new Date().getTime();
    this.idReqAnim = requestAnimationFrame(this.carAnimation);

    const driveStart: DriveStatus = await drive(this.carId);

    cancelAnimationFrame(this.idReqAnim);

    if (driveStart.success && this.idReqAnim) {
      stopBtn.disabled = false;
      this.carIcon.style.right = '0px';
      return this.carId;
    }

    return this.carId;
  }

  async stopCar(): Promise<void> {
    const carElement = this.container;
    const carIcon = carElement.querySelector('.car__icon') as HTMLElement;
    const selectBtn = carElement.querySelector('.select-btn') as HTMLButtonElement;
    const removeBtn = carElement.querySelector('.remove-btn') as HTMLButtonElement;
    const startBtn = carElement.querySelector('.car__race-start-btn') as HTMLButtonElement;
    const stopBtn = carElement.querySelector('.car__race-stop-btn') as HTMLButtonElement;
    stopBtn.disabled = true;
    selectBtn.disabled = false;
    removeBtn.disabled = false;

    const carId: number = +(this.container.getAttribute('data-car-id') as string);

    // const engineStopStatus: EngineStatus =
    await stopEngine(carId);
    cancelAnimationFrame(this.idReqAnim as number);
    this.idReqAnim = null;
    carIcon.style.right = '';

    startBtn.disabled = false;
  }

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
