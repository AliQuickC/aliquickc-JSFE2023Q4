export default class Publisher {
  /* eslint-disable-next-line no-underscore-dangle */
  _triggerEvent(eventName, event = {}) {
    // универсальная ф-ция вызова различных событий
    if (!this.listeners) {
      // если объект listeners не существует
      this.listeners = {}; // создаем его
    }
    if (this.listeners[eventName]) {
      // если массив eventName, внутри объекта listeners, существует
      this.listeners[eventName].forEach((callback) => {
        // вызов ф-ций, из массива
        callback(event);
      });
    }
  }

  addEventListener(eventName, listener) {
    // ф-ция добавляет новые события, в массив ф-ций eventName, внутри объекта listeners
    if (!this.listeners) {
      // если объект listeners не существует
      this.listeners = {}; // создаем его
    }
    if (!this.listeners[eventName]) {
      // если массива listeners[key][] внутри объекта listeners не существует
      this.listeners[eventName] = []; // создаем его
    }
    this.listeners[eventName].push(listener);
    return () => {
      // ф-ция удаляет обработчик события remove EventListener
      this.removeEventListener(eventName, listener);
    };
  }

  removeEventListener(eventName, listener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter((fn) => fn !== listener);
    }
  }
}
