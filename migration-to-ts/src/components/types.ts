export enum Endpoints {
  Sources = 'sources',
  Everything = 'everything',
}

export enum Errors {
  Unauthorized = 401,
  NotFound = 404,
}

export interface SourcesData {
  status: string;
  sources: NewsItemData[];
}

export interface ArticlesData {
  status: string;
  articles: ArticlItemData[];
  totalResults: number;
}

interface Data {
  description: string;
  url: string;
  name: string;
  id: string;
}

export interface NewsItemData extends Data {
  category: string;
  country: string;
  language: string;
}

export interface ArticlItemData extends Data {
  author: string | null;
  content: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  urlToImage: string;
}

export interface UrlOptions {
  [key: string]: string;
}

export type GetRespNews = (data: SourcesData) => void;
export type GetRespArticles = (data: ArticlesData) => void;

export interface CallbackMap {
  [Endpoints.Sources]: GetRespNews;
  [Endpoints.Everything]: GetRespArticles;
}
