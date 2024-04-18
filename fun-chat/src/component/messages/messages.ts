import WebSocketController from '../../modules/ws-api';
import { Page } from '../../types/enum';
import { Store } from '../../types/redux-type';
import { MessageHistoryInfo, MessageHistoryItem, MessageStatus } from '../../types/types';
import BaseComponent from '../base-component/base-component';

export default class Messages extends BaseComponent {
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
    this.container.onkeydown = this.keydownHandler;
  }

  private keydownHandler = (event: KeyboardEvent): void => {
    const { isLogin } = this.store.getState().loginedUser;
    if (!event.target || !isLogin || !(event.target as HTMLElement).closest('[data-type]')) {
      return;
    }

    const sendInput = (event.target as HTMLElement).closest('[data-type]') as HTMLElement;
    const elementDataType = sendInput.getAttribute('data-type');
    if ((elementDataType === 'sendInput' && event.code === 'Enter') || event.code === 'NumpadEnter') {
      const selectedUser = this.store.getState().appData.selectedUser as string;
      this.sendMessage(selectedUser, sendInput as HTMLInputElement);
    }
  };

  private clickHandler = (event: Event): void => {
    const { isLogin } = this.store.getState().loginedUser;
    if (!event.target || !isLogin || !(event.target as HTMLElement).closest('[data-type]')) {
      return;
    }

    const element = (event.target as HTMLElement).closest('[data-type]') as HTMLElement;
    const elementDataType = element.getAttribute('data-type');
    if (elementDataType === 'sendButton') {
      const sendInput = this.container.querySelector('[data-type="sendInput"]') as HTMLInputElement;

      const selectedUser = this.store.getState().appData.selectedUser as string;
      this.sendMessage(selectedUser, sendInput);
    }
  };

  private sendMessage = (selectedUser: string, sendInput: HTMLInputElement): void => {
    if (sendInput.value !== '' && selectedUser) {
      this.wsController.sendMessageToUser(selectedUser, sendInput.value);
      sendInput.value = '';
    }
  };

  private getMessageStatus(messageStatus: MessageStatus): string {
    const delivered = messageStatus.isDelivered ? 'доставлено' : 'отправлено';
    const readed = messageStatus.isReaded ? 'прочитано' : 'не прочитано';
    const edited = messageStatus.isEdited ? 'отредактировано / ' : '';

    return `
      <div class="message__status">
        <div class="message__control">
          <button  class="message__control-edit" title="редактировать сообщение"></button>
          <button  class="message__control-delete" title="удалить сообщение"></button>
        </div>
        <span class="message__info">${edited}${readed} / ${delivered}</span>
      </div>`;
  }

  private getMessageItem(message: MessageHistoryItem, isPrevReaded: boolean): string {
    const loginUser = this.store.getState().loginedUser.login;
    const isOwnMessage = message.from === loginUser;
    const messageStatus = message.status;
    const noReadLine =
      isPrevReaded && !message.status.isReaded
        ? '<div class="messages__demarcation-line">непрочитанные сообщения</div>'
        : '';

    return `
            ${noReadLine}
            <div class="messages__item message ${isOwnMessage ? 'message_own' : ''}">
              <div class="message__header">
                <span class="message__user">${message.from}</span>
                <span class="message__time">${new Date(message.datetime).toLocaleString()}</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>${message.text}</textarea>

              ${isOwnMessage ? this.getMessageStatus(messageStatus) : ''}
            </div>
    `;
  }

  private getMessageHistory(): string {
    const { messages } = this.store.getState().currentMessageHistory as MessageHistoryInfo;
    return messages
      .sort((a, b) => a.datetime - b.datetime)
      .map((item, index, array) => {
        const isPrevReaded: boolean = index !== 0 ? array[index - 1].status.isReaded : true;
        return this.getMessageItem(item, isPrevReaded);
      })
      .join('');
  }

  private getMessages(): string {
    const { currentPage, selectedUser } = this.store.getState().appData;
    const { login } = this.store.getState().loginedUser;
    const { currentMessageHistory } = this.store.getState();

    if (currentPage === Page.Chat) {
      if (selectedUser === null) {
        return '<p>Что бы увидеть историю переписки, выберите пользователя</p>';
      } else if (currentMessageHistory && login === currentMessageHistory.loginUser) {
        if (currentMessageHistory.messages.length === 0) {
          return '<p>Сообщений еще нет, это начало вашего общения</p>';
        } else {
          return this.getMessageHistory();
        }
      }
    }
    return 'Error';
  }

  // eslint-disable-next-line max-lines-per-function
  private toHTML(): string {
    const { selectedUser, userList } = this.store.getState().appData;

    let selectUserLayout = '';
    if (selectedUser !== null) {
      const userIndex = userList.findIndex((item) => item.login === selectedUser);

      const isLogined = userList[userIndex].isLogined;

      selectUserLayout = `
      <span class="select-user__name">${selectedUser}</span>
      <span class="select-user__status select-user__status_${isLogined ? 'green' : 'red'}">- ${isLogined ? 'online' : 'offline'}</span>`;
    }

    return `
    <legend class="correspondence__capture">Чат</legend>
        <div class="correspondence__select-user select-user">
          ${selectUserLayout}
        </div>

        <div class="correspondence__messages messages">
          <div class="messages__wrap">
            ${this.getMessages()}
          </div>
        </div>

        <div class="correspondence__send send">
          <input class="send__input" type="text" data-type="sendInput" placeholder="сообщение" autocomplete="off" name="sendInput" ${selectedUser ? '' : 'disabled'}/>
          <button class="send__button" ${selectedUser ? '' : 'disabled'} data-type="sendButton">Отправить</button>
        </div>
    `;
  }

  private textAreaPrepare = (containerElem: HTMLElement): void => {
    const textArea: NodeListOf<HTMLTextAreaElement> = containerElem.querySelectorAll('textarea');

    textArea.forEach((item) => {
      item.style.height = '';
      item.style.height = `${item.scrollHeight + 2}px`;
    });

    const messagesFrame = containerElem.querySelector('.messages') as HTMLElement;
    const messagesContainer = containerElem.querySelector('.messages__wrap') as HTMLElement;

    const msgContainerHeight = messagesContainer.getBoundingClientRect().height;
    const msgFrameHeight = messagesFrame.getBoundingClientRect().height;
    const hideScroll = msgContainerHeight - msgFrameHeight;

    if (hideScroll > 0) {
      messagesFrame.scrollBy(0, hideScroll);
    }
  };

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    setTimeout(() => {
      this.textAreaPrepare(this.container);
    }, 1);

    return this.container;
  };
}
