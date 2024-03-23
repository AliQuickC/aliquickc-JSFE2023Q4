export type emptyObject = Record<string, never>;

export enum Page {
  garage = 'garage',
  winners = 'winners',
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
