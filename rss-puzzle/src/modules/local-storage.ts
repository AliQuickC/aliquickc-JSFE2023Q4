import { UserData } from '../types/redux-type';
import { defaultUserData } from './constants';

const storeKEY = 'puzzle';

export function getLocalStorage(): UserData {
  if (!localStorage.getItem(storeKEY) || localStorage.getItem(storeKEY) === '{}') {
    // if there is no data in the store, create it from a template object
    const stringUserData = JSON.stringify(defaultUserData); // object to string
    localStorage.setItem(storeKEY, stringUserData); // string to Local Storage
  }
  // read date from the store
  return JSON.parse(localStorage.getItem(storeKEY) as string);
}

export function setItemToLocalStorage(data: UserData): void {
  localStorage.setItem(storeKEY, JSON.stringify(data));
}
