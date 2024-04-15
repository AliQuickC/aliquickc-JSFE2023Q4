import { Page } from '../types/enum';
import { State, UserData } from '../types/redux-type';

export const defaultUserData: UserData = {
  login: null,
  password: null,
  isLogin: false,
};

export const defaultState: State = {
  appData: {
    currentPage: Page.Login,
    userList: [],
    selectedUser: null,
  },
  loginedUser: defaultUserData,
};
