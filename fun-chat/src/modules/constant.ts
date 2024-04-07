import { Page } from '../types/enum';
import { State, UserData } from '../types/redux-type';

export const defaultUserData: UserData = {
  name: null,
  password: null,
};

export const defaultState: State = {
  appData: {
    currentPage: Page.Login,
  },
  userData: defaultUserData,
};
