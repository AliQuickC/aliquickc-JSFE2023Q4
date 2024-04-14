import { Page } from '../types/enum';
import { State, Action, ActionID } from '../types/redux-type';
import { UserInfo } from '../types/types';

export default function reducer(stateData: State, action: Action): State {
  const state = stateData;

  switch (action.type) {
    case ActionID.SetPage: {
      state.appData = { ...state.appData, currentPage: action.page };
      return state;
    }
    case ActionID.Authentication: {
      state.userData = { ...state.userData, login: action.login, password: action.password, isLogin: true };
      state.appData = { ...state.appData, currentPage: Page.Chat };
      return state;
    }
    case ActionID.Logout: {
      state.userData = { ...state.userData, login: null, password: null, isLogin: false };
      state.appData = { ...state.appData, currentPage: Page.Login };
      return state;
    }
    case ActionID.RenewUserList: {
      const userList: UserInfo[] = action.userList.filter((item) => item.login !== state.userData.login);
      state.appData = { ...state.appData, userList };
      return state;
    }
    case ActionID.AddUser: {
      const userList: UserInfo[] = state.appData.userList.slice(0);
      const userIndex = userList.findIndex((item) => item.login === action.user.login);
      if (userIndex === -1) {
        userList.push(action.user);
      } else {
        userList[userIndex].isLogined = true;
      }

      state.appData = { ...state.appData, userList };
      return state;
    }
    case ActionID.RemoveUser: {
      const userList: UserInfo[] = state.appData.userList.slice(0);
      const userIndex = userList.findIndex((item) => item.login === action.user.login);
      userList[userIndex].isLogined = false;

      state.appData = { ...state.appData, userList };
      return state;
    }
    default:
      return state;
  }
}
