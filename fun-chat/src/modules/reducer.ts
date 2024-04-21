import { Page } from '../types/enum';
import { State, Action, ActionID } from '../types/redux-type';
import { MessageHistoryInfo, MessageHistoryItem, UserInfo } from '../types/types';
import { defaultUserData, defaultappData } from './constant';

export default function reducer(stateData: State, action: Action): State {
  const state = stateData;

  switch (action.type) {
    case ActionID.SetPage: {
      state.appData = { ...state.appData, currentPage: action.page };
      return state;
    }
    case ActionID.DisconnectSetPage: {
      state.appData = { ...state.appData, currentPage: action.page };
      state.loginedUser = { ...state.loginedUser, isLogin: false };
      return state;
    }
    case ActionID.Authentication: {
      state.loginedUser = { ...state.loginedUser, login: action.login, password: action.password, isLogin: true };
      state.appData = { ...state.appData, currentPage: Page.Chat, selectedUser: null };
      return state;
    }
    case ActionID.Logout: {
      state.loginedUser = JSON.parse(JSON.stringify(defaultUserData));
      state.appData = JSON.parse(JSON.stringify(defaultappData));
      state.currentMessageHistory = null;
      return state;
    }
    case ActionID.RenewUserList: {
      const { login, password } = action.loginParams;

      const userList: UserInfo[] = action.userList.filter((item) => item.login !== login);
      state.appData = { ...state.appData, userList, selectedUser: null };
      state.currentMessageHistory = null;

      return reducer(state, { type: ActionID.Authentication, login, password });
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
    case ActionID.SelectUser: {
      state.appData = { ...state.appData, selectedUser: action.login };
      return state;
    }
    case ActionID.UpdateMessageHistory: {
      const { messageHistoryInfo } = action;
      const { loginUser } = action.messageHistoryInfo;

      if (
        state.appData.currentPage === Page.Chat &&
        state.appData.selectedUser !== null &&
        state.loginedUser.login === loginUser
      ) {
        state.currentMessageHistory = JSON.parse(JSON.stringify(messageHistoryInfo));
      } else {
        state.currentMessageHistory = null;
      }
      return state;
    }

    case ActionID.AddNewMessage: {
      const loginUser = state.loginedUser.login as string;
      const selectedUser = state.appData.selectedUser as string;
      const message: MessageHistoryItem = { ...action.message };

      if (state.currentMessageHistory === null) {
        const newMessageHistory: MessageHistoryInfo = { loginUser, chatUser: selectedUser, messages: [message] };
        state.currentMessageHistory = newMessageHistory;
      } else {
        const messages: MessageHistoryItem[] = state.currentMessageHistory.messages.slice(0);
        messages.push(message);
        state.currentMessageHistory = { ...state.currentMessageHistory, messages };
      }
      return state;
    }
    case ActionID.DeleteMessage: {
      if (state.currentMessageHistory === null) {
        return state;
      }
      const messages: MessageHistoryItem[] = state.currentMessageHistory.messages;
      const findIndex = messages.findIndex((item) => item.id === action.messageId);
      if (findIndex !== -1) {
        const newMessages = messages.slice(0);
        newMessages.splice(findIndex, 1);
        state.currentMessageHistory = { ...state.currentMessageHistory, messages: newMessages };
      }

      return state;
    }
    default:
      return state;
  }
}
