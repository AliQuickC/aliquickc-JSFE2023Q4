import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';

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
    if (!event.target || !(event.target as HTMLElement).hasAttribute('data-type')) {
      return;
    }

    const element = event.target as HTMLInputElement;
    const elementName = element.dataset.type;
    if (elementName === 'modalOkButton') {
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
    this.message = message;
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
