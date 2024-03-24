import { createCar } from '../../modules/api';
import { ActionID, Store } from '../../types/redux-type';
import { GarageButtons, GarageInput } from '../../types/types';
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
        default:
          break;
      }
    };

    this.container.onclick = (event: Event): void => {
      if (!event.target || !(event.target as HTMLElement).hasAttribute('data-btn-name')) {
        return;
      }

      const elementName = (event.target as HTMLElement).dataset.btnName;
      switch (elementName) {
        case GarageButtons.create: {
          const { carCreateData } = this.store.getState();
          if (carCreateData.name.length !== 0) {
            this.createNewCar();
            this.store.dispatch({ type: ActionID.InputCreateName, value: '' });
            this.render();
          }
          break;
        }
        default:
          break;
      }
    };
  }

  private createNewCar = async (): Promise<void> => {
    const { carCreateData, carsPage } = this.store.getState();
    await createCar(carCreateData);
    this.garageCars?.renderCarsList(carsPage);
  };

  public destroy(): void {
    this.garageCars?.destroy();
    super.destroy();
  }

  private toHTML(): string {
    const { name, color } = this.store.getState().carCreateData;
    return `
    ${carManagementLayout({ name, color })} ${raceManagment}
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    this.garageCars = new GarageCars(this.store, 'div', 'garage__cars');
    this.container.append(this.garageCars.render());

    return this.container;
  };
}
