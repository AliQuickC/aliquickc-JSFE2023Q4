import {
  MessageDeletedStatus,
  MessageDeliveryStatus,
  MessageEditStatus,
  MessageHistoryInfo,
  MessageHistoryItem,
  UnreadUserCount,
  UserInfo,
  UserLoginParams,
} from './types';

export type AuthenticationEvent = UserLoginParams;
export type UserLisReadyEvent = { userList: UserInfo[]; LoginParams: UserLoginParams };
export type UserLoginLogoutEvent = { user: UserInfo };
export type AddNewMessageEvent = { message: MessageHistoryItem };
export type DeliveryStatusEvent = { userStatusList: MessageDeliveryStatus[] };
export type MessageDeletedEvent = { deleteStatus: MessageDeletedStatus };
export type MessageEditEvent = { editStatus: MessageEditStatus };
export type MessageHistoryInfoEvent = MessageHistoryInfo;
export type UnreadMessagesCountEvent = UnreadUserCount;

export type publisherEvent =
  | object
  | AuthenticationEvent
  | UserLisReadyEvent
  | UserLoginLogoutEvent
  | MessageHistoryInfoEvent
  | AddNewMessageEvent
  | DeliveryStatusEvent
  | MessageEditEvent
  | UnreadMessagesCountEvent;
