import { Page } from '../types/enum';
import { State, UserData } from '../types/redux-type';

export const defaultUserData: UserData = {
  login: 'Axcvbnm',
  password: null,
  isLogin: false,
};

export const defaultState: State = {
  appData: {
    currentPage: Page.Chat,
  },
  userData: defaultUserData,
};
