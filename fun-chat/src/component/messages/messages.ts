import WebSocketController from '../../modules/ws-api';
import { Page } from '../../types/enum';
import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';

const messageItens = `
<div class="messages__item message">
              <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
              <div class="message__status">не доставлено</div>
            </div>

            <div class="messages__item message">
              <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktrykrtyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
              <div class="message__status">не доставлено</div>
            </div>

            <div class="messages__item message message_own">
                          <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktrykrtyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
              <div class="message__status">не доставлено</div>
            </div>

            <div class="messages__item message">
                          <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktrykrtyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
              <div class="message__status">не доставлено</div>
            </div>

            <div class="messages__item message">
                          <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktrykrtyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
              <div class="message__status">не доставлено</div>
            </div>

            <div class="messages__item message message_own">
                          <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktrykrtyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
              <div class="message__status">
                <div class="message__control">
                  <button  class="message__control-edit" title="редактировать сообщение"></button>
                  <button  class="message__control-delete" title="удалить сообщение"></button>
                </div>
                <span class="message__info">отправлено / доставлено / прочитано</span>
              </div>
            </div>

            <div class="messages__item message message_own">
                          <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktrykrtyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
              <div class="message__status">
                <div class="message__control">
                  <button  class="message__control-edit" title="редактировать сообщение"></button>
                  <button  class="message__control-delete" title="удалить сообщение"></button>
                </div>
                <span class="message__info">отправлено / доставлено / прочитано</span>
              </div>
            </div>

            <div class="messages__item message message_own">
              <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertdsfhrtjertyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
              <div class="message__status">
                <div class="message__control">
                  <button  class="message__control-edit" title="редактировать сообщение"></button>
                  <button  class="message__control-delete" title="удалить сообщение"></button>
                </div>
                <span class="message__info">отправлено / доставлено / прочитано</span>
              </div>
            </div>

            <div class="messages__demarcation-line">непрочитанные сообщения</div>

            <div class="messages__item message">
                          <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktrykrtyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
            </div>

            <div class="messages__item message">
                          <div class="message__header">
                <span class="message__user">Вася</span>
                <span class="message__time">01.04.2024 10:10</span>
              </div>
                <textarea class="message__text" contenteditable="true" readonly disabled>dsfhrtjertyjktrykrtyjktryketukrutkltuylddsfhrtjertyjktryketukru</textarea>
            </div>
`;

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
    if (!event.target || !(event.target as HTMLElement).closest('[data-type]')) {
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
    if (!event.target || !(event.target as HTMLElement).closest('[data-type]')) {
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

  private getMessagesHistory(): string {
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
          return messageItens;
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

    const messagesHistory = this.getMessagesHistory();

    return `
    <legend class="correspondence__capture">Чат</legend>
        <div class="correspondence__select-user select-user">
          ${selectUserLayout}
        </div>

        <div class="correspondence__messages messages">
          <div class="messages__wrap">
            ${messagesHistory}
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
