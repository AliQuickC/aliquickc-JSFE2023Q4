import WebSocketController from '../../modules/ws-api';
import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';

export default class UserList extends BaseComponent {
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
    this.container.onclick = (event: Event): void => {
      if (!event.target || !(event.target as HTMLElement).hasAttribute('data-type')) {
        return;
      }

      if (
        (event.target as HTMLElement).hasAttribute('data-type') &&
        (event.target as HTMLElement).getAttribute('data-type') === 'clearButton'
      ) {
        this.clearFindInput();
      }
    };

    this.container.oninput = this.inputHandler;
  }

  private inputHandler = (event: Event): void => {
    if (!event.target || !(event.target as HTMLElement).hasAttribute('data-type')) {
      return;
    }

    if (
      (event.target as HTMLElement).hasAttribute('data-type') &&
      (event.target as HTMLElement).getAttribute('data-type') === 'findInput'
    ) {
      const inputValue: string = (event.target as HTMLInputElement).value.toLowerCase();

      this.hideShowUsers(inputValue);
    }
  };

  private hideShowUsers = (inputName: string): void => {
    const userName = this.container.querySelectorAll('[data-user-name]');
    if (inputName === '') {
      userName.forEach((item) => {
        item.classList.remove('hide');
      });
    } else {
      userName.forEach((item) => {
        const name = item.getAttribute('data-user-name') as string;
        if (name.toLowerCase().includes(inputName)) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    }
  };

  private clearFindInput(): void {
    (this.container.querySelector('[data-type="findInput"]') as HTMLInputElement).value = '';
    this.hideShowUsers('');
  }

  private toHTML(): string {
    const users = this.store.getState().appData.userList;

    const usersLayout = users
      .map(
        (
          item
        ) => `<li class="user-list__item user-list__item_${item.isLogined ? 'green' : 'red'}" data-user-name="${item.login}">
                  <span class="user-list__item-name" >${item.login}</span>
                </li>`
      )
      .join('');
    return `
        <legend class="users__capture">Пользователи</legend>

        <div class="users__find user-find">
          <input class="user-find__input" type="text" data-type="findInput" placeholder="имя" autocomplete="off" name="findInput"/>
          <button class="user-find__clear-btn" data-type="clearButton">×</button>
        </div>

        <div class="users__user-list user-list">
          <ul class="user-list__wrap">
            ${usersLayout}
          </ul>
        </div>
      `;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    return this.container;
  };
}
