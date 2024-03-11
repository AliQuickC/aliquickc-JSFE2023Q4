import BaseComponent from '../../core/base-component';
import { Store } from '../../types/redux-type';

export default class Header extends BaseComponent {
  public store: Store;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {
    this.container.onclick = (event: Event): void => {
      if (event.target && (event.target as HTMLElement).closest('[data-type="logOutButton"]')) {
        this.store.dispatch({
          type: 'LOG-OFF',
        });
      }
    };
  }

  public destroy(): void {}

  private toHTML(): string {
    const { firstName, lastName } = this.store.getState().userData;
    const loginData: string = `<span>user: <span>${firstName} ${lastName}</span></span>
      <button class="header__logout-button" data-type="logOutButton">LogOut</button>`;

    return `
    <div class="container header__container">
      ${firstName ? loginData : ''}
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
