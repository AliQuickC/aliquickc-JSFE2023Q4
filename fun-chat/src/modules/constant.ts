import { Page } from '../types/enum';
import { AppData, State, UserData } from '../types/redux-type';

export const defaultUserData: UserData = {
  login: null,
  password: null,
  isLogin: false,
};

export const defaultappData: AppData = {
  currentPage: Page.Login,
  userList: [],
  selectedUser: null,
};

export const initialState: State = {
  loginedUser: defaultUserData,
  appData: defaultappData,
  currentMessageHistory: null,
};
