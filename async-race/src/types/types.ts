export type emptyObject = Record<string, never>;

export enum Page {
  Garage = 'garage',
  Winners = 'winners',
}

export enum Sort {
  id = 'id',
  wins = 'wins',
  time = 'time',
  none = 'none',
}

export enum Order {
  asc = 'ASC',
  desc = 'DESC',
}

export interface CarParams {
  name: string;
  color: string;
}

export interface Car extends CarParams {
  id: number;
}

export type CarInputData = { inputCarCreateData: CarParams; inputCarEditData: CarParams };

export interface WinnerParams {
  id: number;
  time: number;
}
export interface Winner extends WinnerParams {
  wins: number;
}

export interface WinnerFull extends Winner {
  car: Car;
}

export type EngineStatus = { velocity: number; distance: number };
export type DriveStatus = { success: boolean };

export enum GarageButtons {
  Create = 'create-btn',
  Update = 'update-btn',
  GenerateCars = 'generate-cars',
  RaceBtn = 'race-btn',
  ResetBtn = 'reset-btn',
  Select = 'select-btn',
  Remove = 'remove-btn',
  Start = 'start-btn',
  Stop = 'stop-btn',
  Prev = 'prev-page-btn',
  Next = 'next-page-btn',
}

export enum GarageInput {
  CreateName = 'create-name',
  CreateColor = 'create-color',
  EditName = 'edit-name',
  EditColor = 'edit-color',
}

export enum WinnersButtons {
  Prev = 'prev-page-btn',
  Next = 'next-page-btn',
}
