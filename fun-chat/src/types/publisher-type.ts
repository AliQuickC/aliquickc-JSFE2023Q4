import { UserInfo, UserLoginData } from './types';

export type AuthenticationEvent = UserLoginData;
export type UserLisReadyEvent = { userList: UserInfo[] };

export type publisherEvent = AuthenticationEvent | UserLisReadyEvent | object;
