import { CallbackMap, Endpoints, UrlOptions, Errors } from '../types';

class Loader {
  private baseLink: string;
  private options: { apiKey: string };

  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint, options = {} }: { endpoint: Endpoints; options?: UrlOptions },
    callback: CallbackMap[Endpoints]
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === Errors.Unauthorized || res.status === Errors.NotFound)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: UrlOptions, endpoint: Endpoints): string {
    const urlOptions: UrlOptions = { ...this.options, ...options };
    let url: string = `${this.baseLink}${endpoint}?`;

    (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: string, endpoint: Endpoints, callback: CallbackMap[Endpoints], options: UrlOptions = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then(callback)
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
