import { messageId } from './enum';

type GeneralRequestMsg<T> = {
  id: string | null;
  type: string;
  payload: T;
};

// Response
export type AuthenticationLogin = {
  id: typeof messageId.Authentication;
  type: 'USER_LOGIN';
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
};

type AuthenticationAlready = {
  id: typeof messageId.Authentication;
  type: 'ERROR';
  payload: {
    error: 'a user with this login is already authorized';
  };
};

export type AuthenticationSuccess = AuthenticationLogin | AuthenticationAlready;
// Response

export type AuthenticationMsg = GeneralRequestMsg<{
  user: {
    login: string;
    password: string;
  };
}>;

export type FunChatEventData = { id: string };
