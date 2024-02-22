import { ArticlesData, SourcesData } from '../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start<T extends keyof HTMLElementTagNameMap>(): void {
    (<HTMLElementTagNameMap[T]>document.querySelector('.sources')).addEventListener('click', (e: Event) =>
      this.controller.getNews(e, (data: ArticlesData): void => this.view.drawNews(data))
    );
    this.controller.getSources((data: SourcesData): void => this.view.drawSources(data));
  }
}

export default App;
