import { messageId } from './enum';

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
  type: 'USER_LOGIN';
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
};

// type AuthenticationAlready = {
//   id: typeof messageId.Authentication;
//   type: 'ERROR';
//   payload: {
//     error: 'a user with this login is already authorized';
//   };
// };

// export type ResponseAuthenticationSuccess = AuthenticationLogin | AuthenticationAlready;
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

export type FunChatEventData = { id: string };
