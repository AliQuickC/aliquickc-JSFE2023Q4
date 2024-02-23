import { CallbackMap, Endpoints, UrlOptions, Errors } from '../types';

class Loader {
  private baseLink: string;
  private options: { apiKey: string };

  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: Endpoints; options?: UrlOptions },
    callback: CallbackMap[typeof endpoint]
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === Errors.Unauthorized || res.status === Errors.NotFound)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: UrlOptions, endpoint: Endpoints): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: Endpoints, callback: CallbackMap[typeof endpoint], options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
