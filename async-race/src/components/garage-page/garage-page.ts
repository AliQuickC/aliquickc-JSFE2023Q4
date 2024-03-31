import { createCar, deleteCar, deleteWinner, getCars, getWinners, updateCar } from '../../modules/api';
import { FIRST_CARS_PAGE } from '../../modules/constant';
import { getRandomCarName, getRandomColor } from '../../modules/utils';
import { ActionID, Store } from '../../types/redux-type';
import { CarInputData, GarageButtons, GarageInput } from '../../types/types';
import BaseComponent from '../base-component/base-component';
import GarageCars from '../garage-cars/garage-cars';
import GarageManagement from '../garage-management/garage-management';

export default class GaragePage extends BaseComponent {
  private garageCars!: GarageCars;
  private garageManagement!: GarageManagement;
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
    this.container.oninput = this.inputHandler;
    this.container.onclick = this.clickHandler;
  }

  private starCarEvent = (): void => {
    this._triggerEvent('start-car');
  };

  private inputHandler = (event: Event): void => {
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
    const { winnersPage } = this.store.getState();

    const { items: carItems, count: carCount } = await getCars(pageNumber);
    const { items: winnerItems, count: winnerCount } = await getWinners(winnersPage);

    const carInputData = this.getCarInputData();

    this.store.dispatch({
      type: ActionID.SetCars,
      cars: carItems,
      carCount: carCount,
      carsPage: pageNumber,
      carInputData,
      winnerCount: winnerCount,
      winners: winnerItems,
    });
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
    await deleteWinner(id);

    const { carsPage, carsLimit } = this.store.getState();
    const { items: carItems, count: carCount } = await getCars(carsPage);

    const carsPages: number = Math.ceil(carCount / carsLimit);
    let newCarPage: number;
    if (carsPages < carsPage && carsPages >= FIRST_CARS_PAGE) {
      newCarPage = carsPages;
    } else {
      newCarPage = carsPage;
    }

    let newWinnersPage: number;
    const { winnerCount, winnersLimit, winnersPage } = this.store.getState();
    if ((winnerCount - 1) / winnersLimit < winnersPage) {
      newWinnersPage = winnersPage === 1 ? 1 : winnersPage - 1;
    } else {
      newWinnersPage = winnersPage;
    }

    const { items: winnerItems, count: newWinnerCount } = await getWinners(newWinnersPage);

    const carInputData = this.getCarInputData();
    this.store.dispatch({
      type: ActionID.DeleteCar,
      cars: carItems,
      carCount: carCount,
      carInputData,
      carsPage: newCarPage,
      winnerCount: newWinnerCount,
      winners: winnerItems,
      newWinnersPage,
    });
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

  public render = (): HTMLElement => {
    this.container.innerHTML = '';
    if (this.garageCars) {
      this.garageCars.destroy();
    }
    if (this.garageManagement) {
      this.removeEventListener('start-car', this.garageManagement.disableUpdateCar);
      this.garageManagement.destroy();
    }

    this.garageManagement = new GarageManagement(this.store, 'div', 'garage-managment select_none');

    this.garageCars = new GarageCars(
      {
        store: this.store,
        renderGaragePage: this.renderCarsInGarage,
        deleteCarInGarage: this.deleteCarInGarage,
        starCarEvent: this.starCarEvent,
      },
      'div',
      'garage__cars'
    );

    this.container.append(this.garageManagement.render());
    this.container.append(this.garageCars.render());

    this.addEventListener('start-car', this.garageManagement.disableUpdateCar);

    return this.container;
  };
}
