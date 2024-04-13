import BaseComponent from '../../component/base-component/base-component';
import { Store } from '../../types/redux-type';

export default class Chat extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  // eslint-disable-next-line max-lines-per-function
  private toHTML(): string {
    return `
    <div class="container chat__container">
      <fieldset class="chat__users users">
        <legend class="users__capture">Пользователи</legend>

        <div class="users__find user-find">
          <input class="user-find__input" type="text" data-type="findInput" placeholder="имя" autocomplete="off" name="findInput"/>
          <button class="user-find__clear-btn">×</button>
        </div>

        <div class="users__user-list user-list">
          <ul class="user-list__wrap">
            <li class="user-list__item user-list__item_green">user1</li>
            <li class="user-list__item user-list__item_red">
              <span class="user-list__item-name">user2</span>
              <span class="user-list__item-messages">
                <span class="user-list__item-icon"></span>
                <span class="user-list__item-count">9</span>
              </span>
            </li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_green user-list__item_select">user2</li>
            <li class="user-list__item user-list__item_red">user1</li>
            <li class="user-list__item user-list__item_red">user2</li>
            <li class="user-list__item user-list__item_green">
              <span class="user-list__item-name">user2</span>
              <span class="user-list__item-messages">
                <span class="user-list__item-icon"></span>
                <span class="user-list__item-count">0</span>
              </span>
            </li>
            <li class="user-list__item user-list__item_green">
              <span class="user-list__item-name">user2</span>
            </li>
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

      <fieldset class="chat__correspondence correspondence">
      <legend class="correspondence__capture">Чат</legend>
        <div class="correspondence__select-user select-user">
          <span class="select-user__name">Вася</span>
          <span class="select-user__status select-user__status_green">- online</span>
        </div>

        <div class="correspondence__messages messages">
          <div class="messages__wrap">

            <span>Сообщений еще нет, это начало вашего общения</span>

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
          </div>
        </div>

        <div class="correspondence__send send">
          <input class="send__input" type="text" data-type="sendInput" placeholder="сообщение" autocomplete="off" name="sendInput"/>
          <button class="send__button">Отправить</button>
        </div>
      </fieldset>
    </div>`;
  }

  private textAreaPrepare = (containerElem: HTMLElement): void => {
    const textArea: NodeListOf<HTMLTextAreaElement> = containerElem.querySelectorAll('textarea');
    console.log('textArea: ', textArea);

    textArea.forEach((item) => {
      item.style.height = '';
      item.style.height = `${item.scrollHeight + 2}px`;
    });

    const messagesContainer = document.querySelector('.messages') as HTMLElement;
    const elemHeight = messagesContainer.getBoundingClientRect().height;
    messagesContainer.scrollBy(0, elemHeight);
  };

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    setTimeout(() => {
      this.textAreaPrepare(this.container);
    }, 1);

    return this.container;
  };
}
