import { Store } from '../../types/redux-type';
import Footer from '../footer/footer';
import Header from '../header/header';
import Main from '../main/main';

export default class App {
  private container: HTMLBodyElement;
  private store: Store;
  private header!: Header;
  private main!: Main;
  private footer!: Footer;

  constructor(props: Store) {
    this.container = document.body as HTMLBodyElement;
    this.store = props;
    this.init();
  }

  private init(): void {}

  public destroy(): void {}

  public render = (): HTMLElement => {
    this.header?.destroy();
    this.main?.destroy();
    this.footer?.destroy();
    this.container.innerHTML = '';

    this.header = new Header(this.store, 'header', 'header');
    this.main = new Main(this.store, 'main', 'main');
    this.footer = new Footer(this.store, 'footer', 'footer');

    this.container.append(this.header.render());
    this.container.append(this.main.render());
    this.container.append(this.footer.render());

    this.container.onkeydown = (event: KeyboardEvent): void => {
      if (event.code === 'Enter') {
        this.main.enterKeyDown();
      }
    };

    return this.container;
  };
}
