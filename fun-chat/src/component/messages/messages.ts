import WebSocketController from '../../modules/ws-api';
import { Store } from '../../types/redux-type';
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

  public init(): void {}

  // eslint-disable-next-line max-lines-per-function
  private toHTML(): string {
    return `
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
    `;
  }

  private textAreaPrepare = (containerElem: HTMLElement): void => {
    const textArea: NodeListOf<HTMLTextAreaElement> = containerElem.querySelectorAll('textarea');

    textArea.forEach((item) => {
      item.style.height = '';
      item.style.height = `${item.scrollHeight + 2}px`;
    });

    const elemHeight = this.container.getBoundingClientRect().height;
    this.container.scrollBy(0, elemHeight);
  };

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    setTimeout(() => {
      this.textAreaPrepare(this.container);
    }, 1);

    return this.container;
  };
}
