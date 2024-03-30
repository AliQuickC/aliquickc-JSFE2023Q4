import { CarInputData, CarParams } from './../../types/types';
import { ActionID, Store } from '../../types/redux-type';
import { Page } from '../../types/types';
import GaragePage from '../garage-page/garage-page';
import WinnersPage from '../winners-page/winners-page';

export default class App {
  private container: HTMLBodyElement;
  public store: Store;
  private garage!: GaragePage;
  private winners!: WinnersPage;
  private inputCarCreateData!: CarParams;
  private inputCarEditData!: CarParams;

  constructor(props: Store) {
    this.container = document.body as HTMLBodyElement;
    this.store = props;
    this.init();
  }

  private init(): void {
    this.container.innerHTML = this.toHTML();
    this.addEvents();
    this.store.subscribe(this.render);
  }

  private addEvents(): void {
    const garageBtn = document.getElementById('garage-btn') as HTMLElement;
    const winnersBtn = document.getElementById('winners-btn') as HTMLElement;

    garageBtn.addEventListener('click', () => {
      garageBtn.classList.add('active');
      winnersBtn.classList.remove('active');
      this.store.dispatch({ type: ActionID.SetPage, page: Page.Garage });
    });
    winnersBtn.addEventListener('click', () => {
      garageBtn.classList.remove('active');
      winnersBtn.classList.add('active');
      const carInputData: CarInputData = this.getCarInputData();
      this.store.dispatch({ type: ActionID.SetPage, page: Page.Winners, carInputData });
    });
  }

  public destroy(): void {}

  private toHTML(): string {
    return `<div class="app" id="app">
    <div class="container">
      <div class="tab-buttons select_none">
        <button class="tab-button garage-btn active" id="garage-btn">Garage</button>
        <button class="tab-button winners-btn" id="winners-btn">Winners</button>
      </div>
      <div class="app-page" id="app-page">
      </div>
    </div>
  </div>`;
  }

  private setCarInputData = (carInputData: CarInputData): void => {
    this.inputCarCreateData = { ...carInputData.inputCarCreateData };
    this.inputCarEditData = { ...carInputData.inputCarEditData };
  };

  private getCarInputData = (): CarInputData => {
    return { inputCarCreateData: this.inputCarCreateData, inputCarEditData: this.inputCarEditData };
  };

  public render = (): HTMLElement => {
    const { viewPage } = this.store.getState();

    if (this.garage) {
      this.garage.destroy();
    }
    if (this.winners) {
      this.winners.destroy();
    }

    const appPage = this.container.querySelector('#app-page') as HTMLElement;
    appPage.innerHTML = '';

    if (viewPage === Page.Garage) {
      this.garage = new GaragePage(
        { store: this.store, setCarInputData: this.setCarInputData, getCarInputData: this.getCarInputData },
        'section',
        'garage'
      );
      appPage.append(this.garage.render());
    } else if (viewPage === Page.Winners) {
      this.winners = new WinnersPage(this.store, 'section', 'winners');
      appPage.append(this.winners.render());
    }

    return this.container;
  };
}
