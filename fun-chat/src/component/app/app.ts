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

  private init(): void {
    this.header = new Header(this.store, 'header', 'header');
    this.main = new Main(this.store, 'main', 'main');
    this.footer = new Footer(this.store, 'footer', 'footer');
  }

  public destroy(): void {}

  public render = (): HTMLElement => {
    this.container.innerHTML = '';
    this.container.append(this.header.render());
    this.container.append(this.main.render());
    this.container.append(this.footer.render());
    return this.container;
  };
}
