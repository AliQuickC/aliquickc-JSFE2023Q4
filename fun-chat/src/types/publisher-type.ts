import {
  MessageDeletedStatus,
  MessageDeliveryStatus,
  MessageHistoryInfo,
  MessageHistoryItem,
  UserInfo,
  UserLoginParams,
} from './types';

export type AuthenticationEvent = UserLoginParams;
export type UserLisReadyEvent = { userList: UserInfo[]; LoginParams: UserLoginParams };
export type UserLoginLogoutEvent = { user: UserInfo };
export type MessageReceiveEvent = { message: MessageHistoryItem };
export type MessageSendToUserRespEvent = { message: MessageHistoryItem };
export type DeliveryStatusEvent = { userStatusList: MessageDeliveryStatus[] };
export type MessageDeletedEvent = { deleteStatus: MessageDeletedStatus };

export type publisherEvent =
  | object
  | AuthenticationEvent
  | UserLisReadyEvent
  | UserLoginLogoutEvent
  | MessageHistoryInfo
  | MessageReceiveEvent
  | MessageSendToUserRespEvent
  | DeliveryStatusEvent;
