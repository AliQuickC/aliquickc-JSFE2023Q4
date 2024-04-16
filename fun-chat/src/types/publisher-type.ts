import { UserInfo, UserLoginParams } from './types';

export type AuthenticationEvent = UserLoginParams;
export type UserLisReadyEvent = { userList: UserInfo[]; LoginParams: UserLoginParams };
export type UserEvent = { user: UserInfo };

export type publisherEvent = object | AuthenticationEvent | UserLisReadyEvent | UserEvent;
