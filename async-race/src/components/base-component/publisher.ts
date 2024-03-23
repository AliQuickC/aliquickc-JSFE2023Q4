export default abstract class Publisher {
  private listeners: { [key: string]: ((event: object) => void)[] };

  constructor() {
    this.listeners = new Object() as { [key: string]: ((event: object) => void)[] };
  }

  protected _triggerEvent(eventName: string, event: object = {}): void {
    // если массив eventName, внутри объекта listeners, существует
    if (this.listeners) {
      this.listeners[eventName].forEach((callback) => {
        // вызов ф-ций, из массива
        callback(event);
      });
    }
  }

  public addEventListener(eventName: string, listener: (event: object) => void): () => void {
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

  public removeEventListener(eventName: string, listener: (event: object) => void): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter((fn) => fn !== listener);
    }
  }
}
