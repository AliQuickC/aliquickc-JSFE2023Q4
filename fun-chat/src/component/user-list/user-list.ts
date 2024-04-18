import WebSocketController from '../../modules/ws-api';
import { ActionID, Store } from '../../types/redux-type';
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
    this.container.onclick = this.clickHandler;
    this.container.oninput = this.inputHandler;
  }

  private clickHandler = (event: Event): void => {
    const { isLogin } = this.store.getState().loginedUser;
    if (!event.target || !isLogin || !(event.target as HTMLElement).closest('[data-type]')) {
      return;
    }

    const element = (event.target as HTMLElement).closest('[data-type]') as HTMLElement;
    const elementDataType = element.getAttribute('data-type');
    if (elementDataType === 'clearButton') {
      this.clearFindInput();
    } else if (elementDataType === 'chatUser') {
      this.selectUser(element.getAttribute('data-user-name') as string);
    }
  };

  private selectUser = (selectUser: string): void => {
    const loginUser = this.store.getState().loginedUser.login as string;
    this.wsController.sendRequestMessageHistory(loginUser, selectUser);

    this.store.dispatch({
      type: ActionID.SelectUser,
      login: selectUser,
    });
  };

  private inputHandler = (event: Event): void => {
    const { isLogin } = this.store.getState().loginedUser;
    if (!event.target || !isLogin || !(event.target as HTMLElement).closest('[data-type]')) {
      return;
    }

    const element = (event.target as HTMLElement).closest('[data-type]') as HTMLElement;
    const elementDataType = element.getAttribute('data-type');
    if (elementDataType === 'findInput') {
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
        ) => `<li class="user-list__item user-list__item_${item.isLogined ? 'green' : 'red'}" data-type="chatUser" data-user-name="${item.login}">
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
