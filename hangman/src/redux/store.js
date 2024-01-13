export default function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  return {
    subscribe(fn) {
      // подписка на событие, изменение state
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },
    dispatch: (action) => {
      state = reducer(state, action); // редюсер, меняет state
      listeners.forEach((listener) => listener(state)); // сработка события на изменение state
    },
    // getState: () => state,
    getState() {
      return JSON.parse(JSON.stringify(state)); // клонируем объект, для избежания мутации
    },
  };
}
