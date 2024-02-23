import { Endpoints, GetRespArticles, GetRespNews } from '../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  public getSources(callback: GetRespNews): void {
    super.getResp(
      {
        endpoint: Endpoints.Sources,
      },
      callback
    );
  }

  public getNews(e: Event, callback: GetRespArticles): void {
    let target: HTMLElement = e.target as HTMLElement;
    const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: Endpoints.Everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
