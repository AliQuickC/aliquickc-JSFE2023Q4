import { AuthenticationErrorMessage, messageId, messageType } from './enum';

export type UserLoginData = {
  login: string;
  password: string;
};

export type UserInfo = {
  login: string;
  isLogined: boolean;
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

export type LogoutUser = {
  id: typeof messageId.LogOut;
  type: typeof messageType.Userlogout;
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

export type AuthenticatedUsers = {
  id: typeof messageId.UsersList;
  type: typeof messageType.UserActive;
  payload: {
    users: UserInfo[];
  };
};

export type UnauthorizedUsers = {
  id: typeof messageId.UsersList;
  type: typeof messageType.UserInactive;
  payload: {
    users: UserInfo[];
  };
};

export type ResponseAuthentication = AuthenticationLogin | AuthenticationError;
export type UsersList = AuthenticatedUsers | UnauthorizedUsers;

export type ServerResponse = ResponseAuthentication | LogoutUser | UsersList;
// Response

export type AuthenticationMsg = GeneralRequestMsg<
  typeof messageId.Authentication,
  typeof messageType.UserLogin,
  {
    user: UserLoginData;
  }
>;

export type LogoutMsg = GeneralRequestMsg<
  typeof messageId.LogOut,
  typeof messageType.Userlogout,
  {
    user: UserLoginData;
  }
>;
