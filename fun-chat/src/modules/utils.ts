import { MessageHistoryItem } from '../types/types';

type debounceCallback<T> = (args: T) => void;
export function debounce<T>(fn: debounceCallback<T>, wait: number): (args: T) => void {
  let timeout: NodeJS.Timeout;

  return function (arg: T): void {
    const later = (): void => {
      clearTimeout(timeout);
      fn(arg);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function UnreadCount(loginUser: string, chatUser: string, messages: MessageHistoryItem[]): number {
  return messages.reduce((summ, item) => {
    if (item.from === chatUser && item.to === loginUser && !item.status.isReaded) {
      return summ + 1;
    }
    return summ;
  }, 0);
}
