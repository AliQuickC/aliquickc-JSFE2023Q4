import { AuthenticationErrorMessage, messageId, messageType } from './enum';

export type UserLoginParams = {
  login: string;
  password: string;
};

export type UserParams = {
  login: string | null;
  password: string | null;
};

export type UserInfo = {
  login: string;
  isLogined: boolean;
};

type Message = {
  message: {
    to: string;
    text: string;
  };
};

type userLogin = {
  user: {
    login: string;
  };
};

export type MessageStatus = {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
};

// MessageInfo - start
export type MessageInfo<I extends string | null> = {
  id: I;
  from: string;
  to: string;
  datetime: number;
  text: string;
  status: MessageStatus;
};

export type MessageReceive = MessageInfo<null>;
export type MessageHistoryItem = MessageInfo<string>;
export type MessageHistoryInfo = { loginUser: string; chatUser: string; messages: MessageHistoryItem[] };
// MessageInfo - end

// Request - start
type GeneralRequestMsg<I extends null | messageId | string, T extends messageType, P> = {
  id: I;
  type: T;
  payload: P;
};

export type AuthenticationMsg = GeneralRequestMsg<
  typeof messageId.Authentication,
  typeof messageType.UserLogin,
  {
    user: UserLoginParams;
  }
>;

export type sendingMessageToUserMsg = GeneralRequestMsg<
  typeof messageId.SendMessage,
  typeof messageType.MsgSend,
  Message
>;

export type messageHistoryWithTheUser = GeneralRequestMsg<string, typeof messageType.MsgHistory, userLogin>;

export type LogoutMsg = GeneralRequestMsg<
  typeof messageId.LogOut,
  typeof messageType.Userlogout,
  {
    user: UserLoginParams;
  }
>;
// Request - end

// Response - start
type GeneralResponseMsg<I extends messageId | null | string, T extends messageType, P> = {
  id: I;
  type: T;
  payload: P;
};

export type AuthenticationLogin = {
  id: typeof messageId.Authentication;
  type: typeof messageType.UserLogin;
  payload: {
    user: UserInfo;
  };
};

export type LogoutUser = {
  id: typeof messageId.LogOut;
  type: typeof messageType.Userlogout;
  payload: {
    user: UserInfo;
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

export type UserExternalLogin = {
  id: null;
  type: typeof messageType.UserExternalLogin;
  payload: {
    user: UserInfo;
  };
};

export type UserExternalLogout = {
  id: null;
  type: typeof messageType.UserExternalLogout;
  payload: {
    user: UserInfo;
  };
};

export type MessageHistoryResponse = {
  id: string;
  type: typeof messageType.MsgHistory;
  payload: {
    messages: MessageHistoryItem[];
  };
};

export type MessageReceiveFromUser = {
  id: null;
  type: typeof messageType.MsgSend;
  payload: {
    message: MessageReceive;
  };
};

export type MessageSendToUser = {
  id: typeof messageId.SendMessage;
  type: typeof messageType.MsgSend;
  payload: {
    message: MessageHistoryItem;
  };
};

export type ResponseAuthentication = AuthenticationLogin | AuthenticationError;
export type UsersList = AuthenticatedUsers | UnauthorizedUsers;

export type ServerResponse =
  | ResponseAuthentication
  | LogoutUser
  | UsersList
  | UserExternalLogin
  | UserExternalLogout
  | MessageHistoryResponse
  | MessageReceiveFromUser
  | MessageSendToUser;
// Response - end
