import { State, Reducer, Listiner, Store, Unsubscribe } from '../types/redux-type';

export default function createStore(reducer: Reducer, initialState: State): Store {
  let state = initialState;
  let listeners: Listiner[] = [];

  return {
    subscribe(fn): Unsubscribe {
      // подписка на событие, изменение state
      listeners.push(fn);
      return {
        unsubscribe(): void {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },

    dispatch: (action): void => {
      state = reducer(state, action); // редюсер, меняет state
      listeners.forEach((listener) => listener(state)); // сработка события на изменение state
    },

    getState(): State {
      return JSON.parse(JSON.stringify(state)); // клонируем объект, для избежания мутации
    },
  };
}
