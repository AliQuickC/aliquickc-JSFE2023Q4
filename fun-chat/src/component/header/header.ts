import BaseComponent from '../base-component/base-component';
import { ActionID, Store } from '../../types/redux-type';
import WebSocketController from '../../modules/ws-api';
import { Page, ServerReadyState } from '../../types/enum';

export default class Header extends BaseComponent {
  private wsController: WebSocketController;

  constructor(
    props: { store: Store; wsController: WebSocketController },
    tagName: keyof HTMLElementTagNameMap,
    className: string
  ) {
    super(props.store, tagName, className);
    this.store = props.store;
    this.wsController = props.wsController;
    this.init();
  }

  public init(): void {
    this.container.onclick = this.clickHandler;
  }

  private clickHandler = (event: Event): void => {
    if (!event.target || !(event.target as HTMLElement).closest('[data-type]')) {
      return;
    }

    const element = (event.target as HTMLElement).closest('[data-type]') as HTMLElement;
    const elementDataType = element.getAttribute('data-type');
    if (elementDataType === 'logoutButton') {
      const { login, password } = this.store.getState().userData;

      const wsState = this.wsController.wsState;
      if (login !== null && password !== null && wsState === ServerReadyState.OPEN) {
        this.wsController.userLogout(login, password);
      } else {
        this.store.dispatch({
          type: ActionID.SetPage,
          page: Page.Login,
        });
      }
    }
  };

  private toHTML(): string {
    const { userData } = this.store.getState();

    return `
    <div class="container header__container">
      <span>Веселый чатик</span>
      <div class="header__login-data">
        <div class="header__login-info">
          <label  class="header__login-label">Пользователь:</label>
          <output  class="header__login-name">${userData.isLogin ? userData.login : 'не авторизован'}</output>
        </div>
        <button class="header__logout-button" data-type="logoutButton" ${userData.isLogin ? '' : 'disabled'}>Выход</button>
      </div>
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
