import { UserLoginData } from './types';

export type AuthenticationEvent = UserLoginData;

export type publisherEvent = AuthenticationEvent | object;
