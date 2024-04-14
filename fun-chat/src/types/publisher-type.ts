import { UserInfo, UserLoginData } from './types';

export type AuthenticationEvent = UserLoginData;
export type UserLisReadyEvent = { userList: UserInfo[] };
export type UserEvent = { user: UserInfo };

export type publisherEvent = object | AuthenticationEvent | UserLisReadyEvent | UserEvent;
