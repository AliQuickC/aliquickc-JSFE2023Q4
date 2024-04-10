import BaseComponent from '../base-component/base-component';
import { Store } from '../../types/redux-type';

export default class Header extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  public destroy(): void {}

  private toHTML(): string {
    const { userData } = this.store.getState();

    return `
    <div class="container header__container">
      <span>Веселый чатик</span>
      <div class="header__login-data">
        <div class="header__login-info">
          <label  class="header__login-label">Пользователь:</label>
          <output  class="header__login-name">${userData.isLogin ? userData.name : 'не авторизован'}</output>
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
