export enum ValidatorRule {
  Required = 'required',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
}

export enum Page {
  Login = 'login',
  About = 'about',
  Chat = 'chat',
  Error = 'error',
}

export enum ServerReadyState {
  CONNECTING = 0, // Socket has been created. The connection is not yet open.
  OPEN = 1, // The connection is open and ready to communicate.
  CLOSING = 2, // The connection is in the process of closing.
  CLOSED = 3, // The connection is closed or couldn't be opened.
}

export enum messageId {
  Authentication = 'Authentication',
  LogOut = 'logOut',
  UsersList = 'UsersList',
  SendMessage = 'sendMessage',
}

export enum messageType {
  UserLogin = 'USER_LOGIN',
  Userlogout = 'USER_LOGOUT',
  Error = 'ERROR',
  UserActive = 'USER_ACTIVE',
  UserInactive = 'USER_INACTIVE',
  UserExternalLogin = 'USER_EXTERNAL_LOGIN',
  UserExternalLogout = 'USER_EXTERNAL_LOGOUT',
  MsgSend = 'MSG_SEND',
}

export enum AuthenticationErrorMessage {
  AlreadyAuthorized = 'a user with this login is already authorized',
  IncorrectPassword = 'incorrect password',
}

export enum publisherActionType {
  AuthenticationSuccess = 'Authentication-Success',
  LogoutSuccess = 'LogoutSuccess',
  UserLisReady = 'UserLisReady',
  AddUser = 'AddUser',
  RemoveUser = 'RemoveUser',
}
