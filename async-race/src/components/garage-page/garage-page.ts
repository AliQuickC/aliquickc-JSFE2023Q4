import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';
import GarageCars from '../garage-cars/garage-cars';
import carManagementLayout from './car-management.html';
import raceManagment from './race-managment.html';

export default class GaragePage extends BaseComponent {
  private garageCars!: GarageCars;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.init();
  }

  private init(): void {}

  public destroy(): void {
    this.garageCars?.destroy();
    super.destroy();
  }

  private toHTML(): string {
    return `
    ${carManagementLayout} ${raceManagment}
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    this.garageCars = new GarageCars(this.store, 'div', 'garage__cars');
    this.container.append(this.garageCars.render());

    return this.container;
  };
}
