import { MessageHistoryInfo, MessageReceive, UserInfo, UserLoginParams } from './types';

export type AuthenticationEvent = UserLoginParams;
export type UserLisReadyEvent = { userList: UserInfo[]; LoginParams: UserLoginParams };
export type UserLoginLogoutEvent = { user: UserInfo };
export type MessageReceiveEvent = { message: MessageReceive };

export type publisherEvent =
  | object
  | AuthenticationEvent
  | UserLisReadyEvent
  | UserLoginLogoutEvent
  | MessageHistoryInfo
  | MessageReceiveEvent;
