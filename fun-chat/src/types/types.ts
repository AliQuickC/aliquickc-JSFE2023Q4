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

type MessageId = {
  message: {
    id: string; // message id
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

export type MessageDeliveryStatus = {
  id: string; // message id
  status: {
    isDelivered: boolean;
  };
};

export type MessageReadStatus = {
  id: string; // message id
  status: {
    isReaded: boolean;
  };
};

export type MessageDeletedStatus = {
  id: string; // message id
  status: {
    isDeleted: boolean;
  };
};

// MessageInfo - start
export type MessageHistoryItem = {
  id: string; // message id
  from: string;
  to: string;
  datetime: number;
  text: string;
  status: MessageStatus;
};

export type MessageHistoryInfo = {
  loginUser: string;
  chatUser: string;
  messages: MessageHistoryItem[];
};
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

export type MessageDeletMsg = GeneralRequestMsg<
  typeof messageId.DeleteMessage,
  typeof messageType.MsgDelete,
  MessageId
>;

export type MessageReadStatusChange = {
  id: typeof messageId.MsgReadStatus;
  type: typeof messageType.MsgRead;
  payload: MessageId;
};

// Request - end

// Response - start
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

type MessageSendResponse<I extends null | typeof messageId.SendMessage> = {
  id: I;
  type: typeof messageType.MsgSend;
  payload: {
    message: MessageHistoryItem;
  };
};
export type MessageReceiveFromUserResp = MessageSendResponse<null>;
export type MessageSendToUserResp = MessageSendResponse<typeof messageId.SendMessage>;

export type DeliveryStatusInfo = {
  id: null;
  type: typeof messageType.MsgDeliver;
  payload: {
    message: MessageDeliveryStatus;
  };
};

export type MessageDeletOwnerResp = {
  id: typeof messageId.DeleteMessage;
  type: typeof messageType.MsgDelete;
  payload: { message: MessageDeletedStatus };
};
export type NotificationOfMessageDelet = {
  id: null;
  type: typeof messageType.MsgDelete;
  payload: { message: MessageDeletedStatus };
};

export type MessageReadStatusChangeResp = {
  id: typeof messageId.MsgReadStatus;
  type: typeof messageType.MsgRead;
  payload: {
    message: MessageReadStatus;
  };
};
export type NotificationOfMessageReadStatusChangeResp = {
  id: typeof messageId.MsgReadStatus;
  type: typeof messageType.MsgRead;
  payload: {
    message: MessageReadStatus;
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
  | MessageReceiveFromUserResp
  | MessageSendToUserResp
  | DeliveryStatusInfo
  | MessageDeletOwnerResp
  | NotificationOfMessageDelet
  | MessageReadStatusChangeResp
  | NotificationOfMessageReadStatusChangeResp;
// Response - end
