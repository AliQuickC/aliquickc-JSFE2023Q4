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
  create = 'create-btn',
  update = 'update-btn',
  generateCars = 'generate-cars',
  raceBtn = 'race-btn',
  resetBtn = 'reset-btn',
  select = 'select-btn',
  remove = 'remove-btn',
  start = 'start-btn',
  stop = 'stop-btn',
  prev = 'prev-page-btn',
  next = 'next-page-btn',
}

export enum GarageInput {
  CreateName = 'create-name',
  CreateColor = 'create-color',
  EditName = 'edit-name',
  EditColor = 'edit-color',
}
