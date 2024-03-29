import { createCar, deleteCar, updateCar } from '../../modules/api';
import { ActionID, Store } from '../../types/redux-type';
import { CarParams, GarageButtons, GarageInput } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import GarageCars from '../garage-cars/garage-cars';
import carManagementLayout from './car-management';
import raceManagment from './race-managment.html';

export default class GaragePage extends BaseComponent {
  private garageCars!: GarageCars;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.init();
  }

  // eslint-disable-next-line max-lines-per-function
  private init(): void {
    this.container.oninput = (event: Event): void => {
      if (!event.target || !(event.target as HTMLElement).hasAttribute('data-input-name')) {
        return;
      }

      const element = event.target as HTMLInputElement;
      const elementName = element.dataset.inputName;
      switch (elementName) {
        case GarageInput.CreateName: {
          this.store.dispatch({ type: ActionID.InputCreateName, value: element.value });
          break;
        }
        case GarageInput.CreateColor: {
          this.store.dispatch({ type: ActionID.InputCreateColor, value: element.value });
          break;
        }
        case GarageInput.EditName: {
          this.store.dispatch({ type: ActionID.InputEditName, value: element.value });
          break;
        }
        case GarageInput.EditColor: {
          this.store.dispatch({ type: ActionID.InputEditColor, value: element.value });
          break;
        }
        default:
          break;
      }
    };

    this.container.onclick = this.clickHandler;
  }

  private clickHandler = (event: Event): void => {
    if (!event.target || !(event.target as HTMLElement).hasAttribute('data-btn-name')) {
      return;
    }

    const elementName = (event.target as HTMLElement).dataset.btnName;
    switch (elementName) {
      case GarageButtons.Create: {
        const { carCreateData } = this.store.getState();
        if (carCreateData.name.length !== 0) {
          this.createNewCarInGarage();
          this.store.dispatch({ type: ActionID.InputCreateName, value: '' });
        }
        break;
      }
      case GarageButtons.Remove: {
        const carElement: HTMLElement = (<HTMLElement>event.target).closest('[data-car-id]') as HTMLElement;
        const carId: number = +(carElement.getAttribute('data-car-id') as string);
        this.deleteCarInGarage(carId);
        break;
      }
      case GarageButtons.Select: {
        const carElement: HTMLElement = (<HTMLElement>event.target).closest('[data-car-id]') as HTMLElement;
        const carId: number = +(carElement.getAttribute('data-car-id') as string);
        const { cars } = this.store.getState();
        const selectCarNumber: number = cars.findIndex((item) => item.id === carId);

        this.store.dispatch({ type: ActionID.SelectCar, selectCarNumber });
        this.render();
        break;
      }
      case GarageButtons.Update: {
        const { selectCarNumber } = this.store.getState();
        if (selectCarNumber === null) {
          return;
        }
        const carId: number = this.store.getState().cars[selectCarNumber].id;
        const { carEditData } = this.store.getState();
        this.updateCarInGarage(carId, carEditData);
        this.render();
        break;
      }
      default:
        break;
    }
  };

  private updateCarInGarage = async (id: number, body: CarParams): Promise<void> => {
    await updateCar(id, body);
    this.render();
  };

  private deleteCarInGarage = async (id: number): Promise<void> => {
    await deleteCar(id);
    this.render();
  };

  private createNewCarInGarage = async (): Promise<void> => {
    const { carCreateData } = this.store.getState();
    await createCar(carCreateData);
    this.render();
  };

  public destroy(): void {
    this.garageCars?.destroy();
    super.destroy();
  }

  private toHTML(): string {
    const { name, color } = this.store.getState().carCreateData;
    const { selectCarNumber } = this.store.getState();
    const selectCar: CarParams | null = selectCarNumber === null ? null : this.store.getState().carEditData;
    return `
    ${carManagementLayout({ name, color }, selectCar)} ${raceManagment}
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    this.garageCars = new GarageCars(this.store, 'div', 'garage__cars');
    this.container.append(this.garageCars.render());

    return this.container;
  };
}
