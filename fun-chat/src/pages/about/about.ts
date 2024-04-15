import BaseComponent from '../../component/base-component/base-component';
import { Page } from '../../types/enum';
import { ActionID, Store } from '../../types/redux-type';

export default class About extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {
    this.container.onclick = this.clickHandler;
  }

  private clickHandler = (event: Event): void => {
    if (!event.target || !(event.target as HTMLElement).closest('[data-type]')) {
      return;
    }

    const element = (event.target as HTMLElement).closest('[data-type]') as HTMLElement;
    const elementDataType = element.getAttribute('data-type');
    if (elementDataType === 'returnButton') {
      const { isLogin } = this.store.getState().loginedUser;
      const page = isLogin ? Page.Chat : Page.Login;

      this.store.dispatch({
        type: ActionID.SetPage,
        page: page,
      });
    }
  };

  private toHTML(): string {
    return `
    <div class="container about__container">
      <fieldset class="about__group">
        <legend class="about__capture">Инфо</legend>
        <h2 class="about__title">Весёлый чат</h2>
        <p class="about__description">
          Приложение для обмена сообщниями, через сервер, с использование технологии websocket.
          <br>
          <span>
          Автор: <a href="https://github.com/AliQuickC" target="_blank" rel="noopener noreferrer">Алехин Александр</a>
          </span>
        </p>
        <button type='button' class="about__return-button" data-type="returnButton">Назад</button>
      </fieldset>
    </div>`;
  }

  public render = (): HTMLElement => {
    this.container.innerHTML = this.toHTML();
    return this.container;
  };
}
