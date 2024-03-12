import { State, UserData } from '../types/redux-type';
import { Page } from '../types/enum';

export const defaultUserData: UserData = {
  firstName: null,
  lastName: null,
};

export const initialState: State = {
  userData: defaultUserData,
  appData: {
    currentPage: Page.Login,
  },
};
