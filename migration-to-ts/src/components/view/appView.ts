import { SourcesData, ArticlesData, NewsItemData, ArticlItemData } from '../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  private news: News;
  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: ArticlesData): void {
    const values: ArticlItemData[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: SourcesData): void {
    const values: NewsItemData[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
