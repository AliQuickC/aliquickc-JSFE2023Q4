import { AuthenticationErrorMessage, messageId, messageType } from './enum';

export type UserLoginData = {
  login: string;
  password: string;
};

type GeneralRequestMsg<I, T, P> = {
  id: I; //string | null;
  type: T; //string;
  payload: P;
};

// Response
export type AuthenticationLogin = {
  id: typeof messageId.Authentication;
  type: typeof messageType.UserLogin;
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
};

export type AuthenticationError = {
  id: typeof messageId.Authentication;
  type: typeof messageType.Error;
  payload: {
    error: AuthenticationErrorMessage;
  };
};

export type ResponseAuthentication = AuthenticationLogin | AuthenticationError;
// Response

export type AuthenticationMsg = GeneralRequestMsg<
  'Authentication',
  'USER_LOGIN',
  {
    user: UserLoginData;
  }
>;

export type LogoutMsg = GeneralRequestMsg<
  'logOut',
  'USER_LOGOUT',
  {
    user: UserLoginData;
  }
>;
