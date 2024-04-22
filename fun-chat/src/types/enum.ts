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
  MessageHistory = 'MessageHistory',
  DeleteMessage = 'DeleteMessage',
  MsgReadStatus = 'MsgReadStatus',
  MessageEdit = 'MessageEdit',
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
  MsgHistory = 'MSG_FROM_USER',
  MsgDeliver = 'MSG_DELIVER',
  MsgDelete = 'MSG_DELETE',
  MsgRead = 'MSG_READ',
  MsgEdit = 'MSG_EDIT',
}

export enum AuthenticationErrorMessage {
  AlreadyAuthorized = 'a user with this login is already authorized',
  IncorrectPassword = 'incorrect password',
}

export enum publisherActionType {
  AuthenticationSuccess = 'Authentication-Success',
  LogoutSuccess = 'LogoutSuccess',
  UserListReady = 'UserListReady',
  AddUser = 'AddUser',
  RemoveUser = 'RemoveUser',
  UpdateMessageHistory = 'UpdateMessageHistory',
  Disconnect = 'Disconnect',
  DeliveryStatusChange = 'MessageDeliveryStatusChange',
  ReadStatusChange = 'MessageReadStatusChange',
  EditStatusChange = 'MessageEditStatusChange',
  AlreadyAuthorized = 'AlreadyAuthorized',
  IncorrectPassword = 'IncorrectPassword',
  ServerIsNotAvailable = 'ServerIsNotAvailable',
  MessageDeleted = 'MessageDeleted',
  AddNewMessage = 'AddNewMessage',
  UpdateUnreadMessageCount = 'UpdateUnreadMessageCount',
}

export enum messagesElement {
  SendButton = 'sendButton',
  messageEditButton = 'messageEditButton',
  messageDeleteButton = 'messageDeleteButton',
  messages = 'messages',
  messagesWrap = 'messagesWrap',
}

export enum historyRequestParametr {
  userSelect = 'userSelect',
  statusReadChange = 'statusReadChange',
  statusDeliverChange = 'statusDeliverChange',
  userUnselect = 'userUnselect',
}
