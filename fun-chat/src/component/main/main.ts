import { Store } from '../../types/redux-type';
import BaseComponent from '../base-component/base-component';

export default class Main extends BaseComponent {
  constructor(props: Store, tagName: keyof HTMLElementTagNameMap, className: string) {
    super(props, tagName, className);
    this.store = props;
    this.init();
  }

  public init(): void {}

  public render = (): HTMLElement => {
    this.container.innerHTML = '';
    return this.container;
  };
}
