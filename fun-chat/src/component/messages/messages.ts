import WebSocketController from '../../modules/ws-api';
import { Page, messagesElement, publisherActionType } from '../../types/enum';
import { AddNewMessageEvent, publisherEvent } from '../../types/publisher-type';
import { ActionID, Store } from '../../types/redux-type';
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

    this.wsController.addEventListener(publisherActionType.AddNewMessage, this.AddNewMessageHandler);
    // this.wsController.addEventListener(publisherActionType.MessageDeleted, this.deleteMessageHandler);
  }

  public destroy(): void {
    this.wsController.removeEventListener(publisherActionType.AddNewMessage, this.AddNewMessageHandler);
    super.destroy();
  }

  // private deleteMessageHandler = (event: publisherEvent): void => {
  //   const messageId = (event as MessageDeletedEvent).deleteStatus.id;

  //   const messagesElement = this.container.querySelector('[data-type="messages"]');
  //   const message = messagesElement?.querySelector(`[data-message-id="${messageId}"]`);
  //   message?.remove();
  // };

  private AddNewMessageHandler = (event: publisherEvent): void => {
    const { selectedUser } = this.store.getState().appData;
    const message = (event as AddNewMessageEvent).message;
    if (selectedUser && (selectedUser === message.from || selectedUser === message.to)) {
      this.store.dispatch({ type: ActionID.AddNewMessage, message });
    }
    if (selectedUser === message.to) {
      this.readAllMesagesStatusFromUser(selectedUser);
    }
  };

  private readAllMesagesStatusFromUser = (user: string | null): void => {
    const messageHistory = this.store.getState().currentMessageHistory;
    if (!user || !messageHistory) {
      return;
    }
    const messages: MessageHistoryItem[] = messageHistory.messages;
    const messagesFromSelectedUser = messages.filter((item) => item.from === user && !item.status.isReaded);
    messagesFromSelectedUser.forEach((item) => {
      this.wsController.changeMessageStatusRead(item.id);
    });
  };

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

    switch (elementDataType) {
      case messagesElement.SendButton: {
        const sendInput = this.container.querySelector('[data-type="sendInput"]') as HTMLInputElement;

        const selectedUser = this.store.getState().appData.selectedUser as string;
        this.sendMessage(selectedUser, sendInput);
        break;
      }
      case messagesElement.messageEditButton: {
        const messageId = (element.closest('[data-message-id]') as HTMLElement).getAttribute('data-message-id');
        console.log('messageEditButton: ', messageId);
        break;
      }
      case messagesElement.messageDeleteButton: {
        const messageId = (element.closest('[data-message-id]') as HTMLElement).getAttribute(
          'data-message-id'
        ) as string;

        this.wsController.deleteMessage(messageId);
        break;
      }
      case messagesElement.messages: {
        const { selectedUser } = this.store.getState().appData;
        if (selectedUser) {
          this.readAllMesagesStatusFromUser(selectedUser);
        }
        break;
      }
      default: {
        break;
      }
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
          <button  class="message__control-edit" title="редактировать сообщение" data-type="messageEditButton"></button>
          <button  class="message__control-delete" title="удалить сообщение" data-type="messageDeleteButton"></button>
        </div>
        <span class="message__info">${edited}${readed} / ${delivered}</span>
      </div>`;
  }

  private getMessageItem(message: MessageHistoryItem, haveReadLine: boolean): string {
    const loginUser = this.store.getState().loginedUser.login;
    const isOwnMessage = message.from === loginUser;
    const messageStatus = message.status;
    const noReadLine = haveReadLine ? '<div class="messages__demarcation-line">непрочитанные сообщения</div>' : '';

    return `
            ${noReadLine}
            <div class="messages__item message ${isOwnMessage ? 'message_own' : ''}" data-message-id="${message.id}">
              <div class="message__header">
                <span class="message__user">${message.from}</span>
                <span class="message__time">${new Date(message.datetime).toLocaleString()}</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly >${message.text}</textarea>

              ${isOwnMessage ? this.getMessageStatus(messageStatus) : ''}
            </div>
    `;
  }

  private getMessageHistory(): string {
    const { chatUser, messages } = this.store.getState().currentMessageHistory as MessageHistoryInfo;

    const firstNoReadMessageIndex = messages.findIndex((item) => item.from === chatUser && !item.status.isReaded);
    return messages
      .sort((a, b) => a.datetime - b.datetime)
      .map((item, index) => {
        return this.getMessageItem(item, index === firstNoReadMessageIndex);
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

        <div class="correspondence__messages messages" data-type="messages">
          <div class="messages__wrap" data-type="messagesWwrap">
            ${this.getMessages()}
          </div>
        </div>

        <div class="correspondence__send send">
          <input class="send__input" type="text" data-type="sendInput" placeholder="сообщение" autocomplete="off" name="sendInput" ${selectedUser ? '' : 'disabled'}/>
          <button class="send__button" ${selectedUser ? '' : 'disabled'} data-type="sendButton">Отправить</button>
        </div>
    `;
  }

  private textAreaPrepare = (): void => {
    const containerElem = this.container;

    const textArea: NodeListOf<HTMLTextAreaElement> = containerElem.querySelectorAll('textarea');

    textArea.forEach((item) => {
      item.style.height = '';
      item.style.height = `${item.scrollHeight + 2}px`;
    });
  };

  private scrollMessagePrepare = (): void => {
    const containerElem = this.container;

    const messagesFrame = containerElem.querySelector('[data-type="messages"]') as HTMLElement;
    const messagesContainer = containerElem.querySelector('[data-type="messagesWwrap"]') as HTMLElement;
    const sendInput = containerElem.querySelector('[data-type="sendInput"]') as HTMLElement;
    sendInput.focus();

    const msgContainerHeight = messagesContainer.getBoundingClientRect().height;
    const msgFrameHeight = messagesFrame.getBoundingClientRect().height;
    const hideScroll = msgContainerHeight - msgFrameHeight;

    if (hideScroll > 0) {
      messagesFrame.scrollBy(0, hideScroll);
    }

    messagesFrame.addEventListener('wheel', (): void => {
      const { selectedUser } = this.store.getState().appData;
      if (selectedUser) {
        this.readAllMesagesStatusFromUser(selectedUser);
      }
    });
  };

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    setTimeout(() => {
      this.textAreaPrepare();
      this.scrollMessagePrepare();
    }, 0);

    return this.container;
  };
}
