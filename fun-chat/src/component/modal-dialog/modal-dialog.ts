import { publisherActionType } from '../../types/enum';
import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';

const AlreadyAuthorized = 'пользователь с таким именем, уже вошол в чат!';
const IncorrectPassword = 'Введен неверный пароль!';
const Disconnect = 'Потеряно соединение с сервером';
const ServerIsNotAvailable = 'Не удалось установить соединение с сервером!';

export default class ModalDialog extends BaseComponent {
  private message: string = 'test';
  protected container!: HTMLDialogElement;
  private isShow: boolean = false;

  constructor(store: Store, tagName: keyof HTMLElementTagNameMap = 'dialog', className: string = 'dialog ') {
    super(store, tagName, className);
    this.store = store;
    this.init();
  }

  public init(): void {
    this.container.onclick = this.clickHandler;
  }

  get isShowModal(): boolean {
    return this.isShow;
  }

  private clickHandler = (event: Event): void => {
    if (!event.target || !(event.target as HTMLElement).closest('[data-type]')) {
      return;
    }

    const element = (event.target as HTMLElement).closest('[data-type]') as HTMLElement;
    const elementDataType = element.getAttribute('data-type');
    if (elementDataType === 'modalOkButton') {
      this.closeModal();
    }
  };

  private toHTML(): string {
    return `
    <div class="dialog__window">
			<p  class="dialog__message">${this.message}</p>
      <button class="dialog__ok-button" data-type="modalOkButton">Понятно</button>
		</div>
    `;
  }

  public closeModal = (): void => {
    this.container.classList.remove('open');
    this.container.close();
    this.isShow = false;
  };

  public showModal = (message: string): void => {
    switch (message) {
      case publisherActionType.AlreadyAuthorized: {
        this.message = AlreadyAuthorized;
        break;
      }
      case publisherActionType.IncorrectPassword: {
        this.message = IncorrectPassword;
        break;
      }
      case publisherActionType.Disconnect: {
        this.message = Disconnect;
        break;
      }
      case publisherActionType.ServerIsNotAvailable: {
        this.message = ServerIsNotAvailable;
        break;
      }
      default:
        this.message = message;
        break;
    }
    this.render();

    setTimeout(() => {
      this.container.classList.add('open');
      this.container.showModal();
      this.isShow = true;
    }, 0);
  };

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();

    return this.container;
  };
}
