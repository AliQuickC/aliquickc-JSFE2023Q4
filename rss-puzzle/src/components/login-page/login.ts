import BaseComponent from '../../core/base-component';
import { Store } from '../../types/redux-type';

export default class LoginPage extends BaseComponent {
  public store: Store;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {
    this.container.onclick = (event: Event): void => {
      if (event.target && (event.target as HTMLElement).closest('[data-type="sendButton"]')) {
        event.preventDefault();
        if (!this.store.getState().userData.firstName) {
          const firstName = this.container.querySelector('#firstname') as HTMLInputElement;
          const lastName = this.container.querySelector('#lastname') as HTMLInputElement;
          this.store.dispatch({
            type: 'SET_USER',
            firstName: firstName.value,
            lastName: lastName.value,
          });
        }
      }
    };
  }

  public destroy(): void {}

  private toHTML(): string {
    return `
    <div class="container login__container">
      <form class="form" action="#">
        <fieldset class="login__group">
          <legend>Enter your Name and Password</legend>

          <label for="firstname">First name:
            <input type="text" id="firstname" required/>
          </label>

          <label for="lastname">Last name:
            <input type="text" id="lastname" required/>
          </label>

          <button class="login__send-button" data-type="sendButton">Enter</button>
        </fieldset>
      </form>
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
