/* eslint-disable @typescript-eslint/no-unused-vars */
import BaseComponent from '../../component/base-component/base-component';
import AValidate from '../../modules/validate';
import { ValidatorRule } from '../../types/enum';
import { Store } from '../../types/redux-type';

const REQUIRED_REQUARED = 'The field is required';
const FIRST_LETTER_ERROR = 'first letter must be capitalized, from "A" to "Z"';
const ACCEPTABLE_LETTERS = 'Acceptable letters are from "a" to "z"';
const ACCEPTABLE_LETTERS_PASSWORD = 'Acceptable letters are from "a" to "z" and contain a capital character';
const checkCapitalize = (value: string): boolean => {
  return !!value.match(/^[A-Z]{1}/);
};
const minCharacterErrorMessage = (numb: number): string => `The field must contain a minimum of ${numb} characters`;

const nameRule = [
  { rule: ValidatorRule.Required, errorMessage: REQUIRED_REQUARED },
  {
    validator: checkCapitalize,
    errorMessage: FIRST_LETTER_ERROR,
  },
  { rule: ValidatorRule.MinLength, value: 3, errorMessage: minCharacterErrorMessage(3) },
  {
    validator: (value: string): boolean => {
      return !!value.match(/^[A-Za-z]{3,}$/);
    },
    errorMessage: ACCEPTABLE_LETTERS,
  },
];

const passwordRule = [
  { rule: ValidatorRule.Required, errorMessage: REQUIRED_REQUARED },
  { rule: ValidatorRule.MinLength, value: 4, errorMessage: minCharacterErrorMessage(4) },
  {
    validator: (value: string | boolean): boolean => {
      return !!(value as string).match(/(?=.*[A-Z])[-A-Za-z]{6,}$/);
    },
    errorMessage: ACCEPTABLE_LETTERS_PASSWORD,
  },
];

export default class LoginPage extends BaseComponent {
  public store: Store;

  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  private submit(): void {
    if (!this.store.getState().userData.name) {
      const name = this.container.querySelector('#name') as HTMLInputElement;
      const passwor = this.container.querySelector('#password') as HTMLInputElement;
    }
  }

  public destroy(): void {}

  private toHTML(): string {
    return `
    <div class="container login__container">
      <form class="form" action="#" id="form" autocomplete="off" novalidate="novalidate">
        <fieldset class="login__group">
          <legend class="login__capture">Enter the chat</legend>

          <div class="login__input-group">
            <label for="name">Name: </label>
            <input class="login__input" type="text" id="name" placeholder="Name" autocomplete="off" data-type="loginInput" name="firstName" required/>
          </div>

          <div class="login__input-group">
            <label for="lastname">Password: </label>
            <input class="login__input" type="password" id="password" placeholder="password" autocomplete="off" data-type="loginInput" name="password" required/>
          </div>

          <button type='submit' class="login__send-button" data-type="sendButton">Enter</button>
          <button type='button' class="login__about-button" data-type="aboutButton">About</button>
        </fieldset>
      </form>
    </div>
    `;
  }

  public enterKeyDown = (): void => {
    const submitButton = this.container.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.click();
    }
  };

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    setTimeout(() => {
      const validate = new AValidate('#form');

      validate.addField('#name', nameRule).addField('#password', passwordRule);

      validate.onSuccess(() => {
        this.submit();
      });
    }, 0);

    return this.container;
  };
}
