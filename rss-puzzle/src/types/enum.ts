export enum Page {
  Start = 'start',
  Login = 'login',
  Game = 'game',
}

export enum ValidatorRule {
  Required = 'required',
  MinLength = 'minLength',
}

export enum ActionID {
  AppInit = 'APP_INIT',
  SetUser = 'SET_USER',
  LogOff = 'LOG-OFF',
  SetPage = 'SET-PAGE',
  StartGame = 'START-GAME',
  MoveSorceCard = 'MOVE-SORCE-CARD',
  MoveRezultCard = 'MOVE-REZULT-CARD',
  CheckCorrectlySentence = 'CHECK-CORRECTLY-SENTENCE',
  CheckCorrectlyWords = 'CHECK-CORRECTLY-WORDS',
  NextSentence = 'NEXT-SENTENCE',
  NextRound = 'NEXT-ROUND',
}
