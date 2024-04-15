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

  public init(): void {}

  private toHTML(): string {
    const users = this.store.getState().appData.userList;

    const usersLayout = users
      .map(
        (item) => `<li class="user-list__item user-list__item_${item.isLogined ? 'green' : 'red'}">
                  <span class="user-list__item-name" data-user-name="${item.login}">${item.login}</span>
                </li>`
      )
      .join('');
    return `
        <legend class="users__capture">Пользователи</legend>

        <div class="users__find user-find">
          <input class="user-find__input" type="text" data-type="findInput" placeholder="имя" autocomplete="off" name="findInput"/>
          <button class="user-find__clear-btn">×</button>
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
