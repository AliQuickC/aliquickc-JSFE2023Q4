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
