import { Page } from '../types/enum';
import { State, UserData } from '../types/redux-type';

export const defaultUserData: UserData = {
  name: 'Axcvbnm',
  password: null,
  isLogin: false,
};

export const defaultState: State = {
  appData: {
    currentPage: Page.Login,
  },
  userData: defaultUserData,
};
