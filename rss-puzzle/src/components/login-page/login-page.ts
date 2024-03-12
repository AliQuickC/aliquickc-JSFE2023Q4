import BaseComponent from '../../core/base-component';
import { Store } from '../../types/redux-type';
import JustValidate, { Rules } from 'just-validate';

const FIRST_LETTER_ERROR = 'first letter must be capitalized, from "A" to "Z"';
const ACCEPTABLE_LETTERS = 'Acceptable letters are from "a" to "z" and the symbol "-"';
const checkCapitalize = (value: string | boolean): boolean => {
  return !!(value as string).match(/^[A-Z]{1}/);
};

const firstNameRule = [
  { rule: 'required' as Rules },
  {
    validator: checkCapitalize,
    errorMessage: FIRST_LETTER_ERROR,
  },
  { rule: 'minLength' as Rules, value: 3 },
  {
    validator: (value: string | boolean): boolean => {
      return !!(value as string).match(/^[-A-Za-z]{3,}$/);
    },
    errorMessage: ACCEPTABLE_LETTERS,
  },
];

const lastNameRule = [
  { rule: 'required' as Rules },
  {
    validator: checkCapitalize,
    errorMessage: FIRST_LETTER_ERROR,
  },
  { rule: 'minLength' as Rules, value: 4 },
  {
    validator: (value: string | boolean): boolean => {
      return !!(value as string).match(/^[-A-Za-z]{4,}$/);
    },
    errorMessage: ACCEPTABLE_LETTERS,
  },
];

export default class LoginPage extends BaseComponent {
  public store: Store;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  private submit(): void {
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

  public destroy(): void {}

  private toHTML(): string {
    return `
    <div class="container login__container">
      <form class="form" action="#" id="form" autocomplete="off" novalidate="novalidate">
        <fieldset class="login__group">
          <legend class="login__capture">Enter your Name</legend>

          <div class="login__input-group">
            <label for="firstname">First name: </label>
            <input class="login__input" type="text" id="firstname" placeholder="Name" autocomplete="off" data-type="loginInput" name="firstName" required/>
          </div>

          <div class="login__input-group">
            <label for="lastname">Last name: </label>
            <input class="login__input" type="text" id="lastname" placeholder="Family" autocomplete="off" data-type="loginInput" name="lastname" required/>
          </div>

          <button type='submit' class="login__send-button" data-type="sendButton">Enter</button>
        </fieldset>
      </form>
    </div>
    `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    setTimeout(() => {
      const validate = new JustValidate('#form');

      validate.addField('#firstname', firstNameRule).addField('#lastname', lastNameRule);

      validate.onSuccess(() => {
        this.submit();
      });
    }, 0);

    return this.container;
  };
}
