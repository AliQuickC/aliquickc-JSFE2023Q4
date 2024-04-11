import { publisherActionType } from '../../types/enum';
import { publisherEvent } from '../../types/publisher-type';

export default abstract class Publisher {
  private listeners: { [key: string]: ((event: publisherEvent) => void)[] };

  constructor() {
    this.listeners = new Object() as { [key: string]: ((event: publisherEvent) => void)[] };
  }

  protected _triggerEvent(eventName: publisherActionType, event: publisherEvent = {}): void {
    // если массив eventName, внутри объекта listeners, существует
    if (this.listeners) {
      this.listeners[eventName]?.forEach((callback) => {
        // вызов ф-ций, из массива
        callback(event);
      });
    }
  }

  public addEventListener(eventName: publisherActionType, listener: (event: publisherEvent) => void): () => void {
    // если массива listeners[eventName][] внутри объекта listeners не существует
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []; // создаем его
    }
    this.listeners[eventName].push(listener);
    return () => {
      // ф-ция удаляет обработчик события remove EventListener
      this.removeEventListener(eventName, listener);
    };
  }

  public removeEventListener(eventName: publisherActionType, listener: (event: publisherEvent) => void): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter((fn) => fn !== listener);
    }
  }
}
