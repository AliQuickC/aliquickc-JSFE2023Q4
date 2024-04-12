import BaseComponent from '../../component/base-component/base-component';
import { Store } from '../../types/redux-type';

export default class Chat extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  private toHTML(): string {
    return `
    <div class="container chat__container">
      <fieldset class="chat__users">
        <legend class="chat__users-capture">Пользователи</legend>

        <div class="chat__find-wrap">
          <input class="chat__find-user" type="text" data-type="findInput" placeholder="имя" autocomplete="off" name="findInput"/>
          <button class="chat__find-clear-btn">×</button>
        </div>

        <div class="chat__user-wrap">
          <ul class="chat__user-list user-list">
          <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_green">user2</li>
          </ul>
        </div>
      </fieldset>
      <fieldset class="chat__correspondence">
        <legend class="chat__correspondence-capture">Чат</legend>
      </fieldset>
    </div>`;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
