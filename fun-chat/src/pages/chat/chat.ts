import BaseComponent from '../../component/base-component/base-component';
import Messages from '../../component/messages/messages';
import UserList from '../../component/user-list/user-list';
import WebSocketController from '../../modules/ws-api';
import { Store } from '../../types/redux-type';

export default class Chat extends BaseComponent {
  wsController: WebSocketController;
  private userList!: UserList;
  private messages!: Messages;

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
    return '<div class="container chat__container" id="chat-container"></div>';
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    const chatContainer = this.container.querySelector('#chat-container') as HTMLElement;

    if (this.userList) {
      this.userList.destroy();
    }
    if (this.userList) {
      this.userList.destroy();
    }

    this.userList = new UserList(
      { store: this.store, wsController: this.wsController },
      'fieldset',
      'chat__users users'
    );

    this.messages = new Messages(
      { store: this.store, wsController: this.wsController },
      'fieldset',
      'chat__correspondence correspondence'
    );

    chatContainer.append(this.userList.render());
    chatContainer.append(this.messages.render());

    return this.container;
  };
}
