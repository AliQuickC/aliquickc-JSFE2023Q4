import { createCar, deleteCar, getCars, updateCar } from '../../modules/api';
import { FIRST_CARS_PAGE } from '../../modules/constant';
import { getRandomCarName, getRandomColor } from '../../modules/utils';
import { ActionID, Store } from '../../types/redux-type';
import { CarInputData, CarParams, GarageButtons, GarageInput } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import GarageCars from '../garage-cars/garage-cars';
import carManagementLayout from './car-management';
import raceManagment from './race-managment.html';

export default class GaragePage extends BaseComponent {
  private garageCars!: GarageCars;
  private setCarInputData: (carInputData: CarInputData) => void;
  private getCarInputData: () => CarInputData;

  constructor(
    props: {
      store: Store;
      setCarInputData: (carInputData: CarInputData) => void;
      getCarInputData: () => CarInputData;
    },
    tagName: keyof HTMLElementTagNameMap,
    className: string
  ) {
    super(props.store, tagName, className);
    this.setCarInputData = props.setCarInputData;
    this.getCarInputData = props.getCarInputData;
    this.setCarInputData({
      inputCarCreateData: this.store.getState().carCreateData,
      inputCarEditData: this.store.getState().carEditData,
    });
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
          const carInputData = this.getCarInputData();
          carInputData.inputCarCreateData.name = element.value;
          this.setCarInputData(carInputData);
          break;
        }
        case GarageInput.CreateColor: {
          const carInputData = this.getCarInputData();
          carInputData.inputCarCreateData.color = element.value;
          this.setCarInputData(carInputData);
          break;
        }
        case GarageInput.EditName: {
          const carInputData = this.getCarInputData();
          carInputData.inputCarEditData.name = element.value;
          this.setCarInputData(carInputData);
          break;
        }
        case GarageInput.EditColor: {
          const carInputData = this.getCarInputData();
          carInputData.inputCarEditData.color = element.value;
          this.setCarInputData(carInputData);
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

    const elementBtnName = (event.target as HTMLElement).dataset.btnName;
    switch (elementBtnName) {
      case GarageButtons.Create: {
        this.createNewCarInGarage();
        break;
      }
      case GarageButtons.Update: {
        const { selectCarNumber } = this.store.getState();
        if (selectCarNumber === null) {
          return;
        }
        const carId: number = this.store.getState().cars[selectCarNumber].id;
        this.updateCarInGarage(carId);
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
      case GarageButtons.RaceBtn: {
        break;
      }
      case GarageButtons.ResetBtn: {
        break;
      }
      default:
        break;
    }
  };

  private renderCarsInGarage = async (pageNumber: number): Promise<void> => {
    const { items, count } = await getCars(pageNumber);

    const carInputData = this.getCarInputData();

    this.store.dispatch({ type: ActionID.SetCars, cars: items, carCount: count, carsPage: pageNumber, carInputData });
  };

  private changeCarsPageInGarage = async (pageNumber: number): Promise<void> => {
    const { items } = await getCars(pageNumber);
    const { inputCarCreateData } = this.getCarInputData();

    this.store.dispatch({
      type: ActionID.ChangeCarsPage,
      cars: items,
      carsPage: pageNumber,
      inputCarCreateData: inputCarCreateData,
    });
  };

  private generateCars = async (): Promise<void> => {
    const createCarArray = new Array(100)
      .fill('undefined')
      .map(() => createCar({ name: getRandomCarName(), color: getRandomColor() }));
    await Promise.all(createCarArray);

    this.renderCarsInGarage(FIRST_CARS_PAGE);
  };

  private updateCarInGarage = async (id: number): Promise<void> => {
    const { carsPage } = this.store.getState();
    const { inputCarEditData } = this.getCarInputData();
    await updateCar(id, inputCarEditData);
    this.renderCarsInGarage(carsPage);
  };

  private deleteCarInGarage = async (id: number): Promise<void> => {
    await deleteCar(id);
    const { carsPage, carsLimit } = this.store.getState();
    const { items, count } = await getCars(carsPage);
    const carsPages = Math.ceil(count / carsLimit);
    if (carsPages < carsPage && carsPages >= FIRST_CARS_PAGE) {
      this.changeCarsPageInGarage(carsPages);
      return;
    }
    const carInputData = this.getCarInputData();
    this.store.dispatch({ type: ActionID.DeleteCar, cars: items, carCount: count, carsPage: carsPage, carInputData });
  };

  private createNewCarInGarage = async (): Promise<void> => {
    const { inputCarCreateData } = this.getCarInputData();

    if (inputCarCreateData.name.length !== 0) {
      await createCar(inputCarCreateData);
      this.store.dispatch({ type: ActionID.CreateCar });
    }
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
    this.garageCars = new GarageCars(
      { store: this.store, renderGaragePage: this.renderCarsInGarage, deleteCarInGarage: this.deleteCarInGarage },
      'div',
      'garage__cars'
    );
    this.container.append(this.garageCars.render());

    return this.container;
  };
}
