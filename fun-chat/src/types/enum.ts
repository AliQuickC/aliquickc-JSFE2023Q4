export enum ValidatorRule {
  Required = 'required',
  MinLength = 'minLength',
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

export enum ResponseType {
  UserLogin = 'USER_LOGIN',
  Error = 'ERROR',
}

export enum AuthenticationError {
  AlreadyAuthorized = 'a user with this login is already authorized',
  IncorrectPassword = 'incorrect password',
}

export enum messageId {
  Authentication = 'Authentication',
}
