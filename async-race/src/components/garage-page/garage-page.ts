import { createCar, deleteCar, getCars, updateCar } from '../../modules/api';
import { FIRST_CARS_PAGE } from '../../modules/constant';
import { getRandomCarName, getRandomColor } from '../../modules/utils';
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
        break;
      }
      case GarageButtons.GenerateCars: {
        this.generateCars();
        break;
      }
      case GarageButtons.Next: {
        const { carsPage } = this.store.getState();
        this.changeCarsPageInGarage(carsPage + 1);
        break;
      }
      case GarageButtons.Prev: {
        const { carsPage } = this.store.getState();
        this.changeCarsPageInGarage(carsPage - 1);
        break;
      }
      default:
        break;
    }
  };

  private getCarsInGarage = async (pageNumber: number): Promise<void> => {
    const { items, count } = await getCars(pageNumber);
    this.store.dispatch({ type: ActionID.SetCars, cars: items, carCount: count, carsPage: pageNumber });

    this.render();
  };

  private changeCarsPageInGarage = async (pageNumber: number): Promise<void> => {
    const { items, count } = await getCars(pageNumber);
    this.store.dispatch({ type: ActionID.ChangeCarsPage, cars: items, carCount: count, carsPage: pageNumber });

    this.render();
  };

  private generateCars = async (): Promise<void> => {
    const createCarArray = new Array(100)
      .fill('undefined')
      .map(() => createCar({ name: getRandomCarName(), color: getRandomColor() }));
    await Promise.all(createCarArray);

    this.getCarsInGarage(FIRST_CARS_PAGE);
  };

  private updateCarInGarage = async (id: number, body: CarParams): Promise<void> => {
    await updateCar(id, body);
    this.render();
  };

  private deleteCarInGarage = async (id: number): Promise<void> => {
    await deleteCar(id);
    const { carsPage, carsLimit } = this.store.getState();
    const { count } = await getCars(carsPage);
    const carsPages = Math.ceil(count / carsLimit);
    if (carsPages < carsPage && carsPages >= FIRST_CARS_PAGE) {
      this.changeCarsPageInGarage(carsPages);
      return;
    }
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
    if (this.garageCars) {
      this.garageCars.destroy();
    }
    this.garageCars = new GarageCars(this.store, 'div', 'garage__cars');
    this.container.append(this.garageCars.render());

    return this.container;
  };
}
