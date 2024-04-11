/* eslint-disable @typescript-eslint/no-unused-vars */
import BaseComponent from '../../component/base-component/base-component';
import AValidate from '../../modules/validate';
import WebSocketController from '../../modules/ws-api';
import { Page, ValidatorRule } from '../../types/enum';
import { ActionID, Store } from '../../types/redux-type';

const REQUIRED_REQUARED = 'The field is required';
const FIRST_LETTER_ERROR = 'first letter must be capitalized, from "A" to "Z"';
const ACCEPTABLE_LETTERS = 'Acceptable letters are from "a" to "z"';
const ACCEPTABLE_LETTERS_PASSWORD =
  'Acceptable letters are from "a" to "z", digits "0-9" and contain one capital letter';
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
  { rule: ValidatorRule.MinLength, value: 4, errorMessage: minCharacterErrorMessage(6) },
  {
    validator: (value: string | boolean): boolean => {
      return !!(value as string).match(/(?=.*[A-Z])[A-Za-z0-9]{6,}$/);
    },
    errorMessage: ACCEPTABLE_LETTERS_PASSWORD,
  },
];

export default class LoginPage extends BaseComponent {
  private wsController: WebSocketController;
  private validate: AValidate | null = null;

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

  public destroy(): void {
    super.destroy();
    if (this.validate) {
      this.validate.destroy();
      this.validate = null;
    }
  }

  private clickHandler = (event: Event): void => {
    if (!event.target || !(event.target as HTMLElement).hasAttribute('data-type')) {
      return;
    }

    const element = event.target as HTMLInputElement;
    const elementName = element.dataset.type;
    if (elementName === 'aboutButton') {
      this.store.dispatch({
        type: ActionID.SetPage,
        page: Page.About,
      });
    }
  };

  private submit = (): void => {
    const name = (this.container.querySelector('[data-type="nameInput"]') as HTMLInputElement).value;
    const password = (this.container.querySelector('[data-type="passwordInput"]') as HTMLInputElement).value;

    this.wsController.connectToServer(name, password);
  };

  private toHTML(): string {
    return `
    <div class="container login__container">
      <form class="login__form form" action="#" id="form" data-type="loginForm" autocomplete="off" novalidate="novalidate">
        <fieldset class="login__group">
          <legend class="login__capture">Вход в чат</legend>

          <div class="login__input-group">
            <label for="name">Имя: </label>
            <input class="login__input" type="text" id="name" data-type="nameInput" placeholder="имя" autocomplete="off" name="firstName" required/>
          </div>

          <div class="login__input-group">
            <label for="lastname">Пароль: </label>
            <input class="login__input" type="password" id="password" placeholder="пароль" autocomplete="off" data-type="passwordInput" name="password" required/>
          </div>

          <button type='submit' class="login__send-button" data-type="sendButton">Войти</button>

        </fieldset>
        <button type='button' class="login__about-button" data-type="aboutButton">Инфо</button>
      </form>
    </div>
    `;
  }

  public enterKeyDown = (): void => {
    this.validate?.submitHandler();
  };

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    setTimeout(() => {
      this.validate = new AValidate('[data-type="loginForm"]');

      this.validate.addField('[data-type="nameInput"]', nameRule).addField('[data-type="passwordInput"]', passwordRule);

      this.validate.onSuccess(this.submit);
    }, 0);

    return this.container;
  };
}
