import {
  CarParams,
  Car,
  EngineStatus,
  DriveStatus,
  WinnerParams,
  Winner,
  Sort,
  Order,
  WinnerFull,
  emptyObject,
} from '../types/types';

import { DEFAULT_WINNERS_ON_PAGE, MAX_CARS_ON_PAGE } from '../modules/constant';

const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (
  page: number,
  limit: number = MAX_CARS_ON_PAGE
): Promise<{ items: Car[]; count: number }> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: +(response.headers.get('X-Total-Count') as string),
  };
};

export const getCar = async (id: number): Promise<Car | emptyObject> => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: CarParams): Promise<CarParams> =>
  (
    await fetch(garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();

export const deleteCar = async (id: number): Promise<emptyObject> =>
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, body: CarParams): Promise<Car> =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();

export const startEngine = async (id: number): Promise<EngineStatus> =>
  (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopEngine = async (id: number): Promise<EngineStatus> =>
  (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

export const drive = async (id: number): Promise<DriveStatus> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const GetSortOrder = (sort: Sort | undefined, order: Order | undefined): string => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners = async (
  page: number,
  limit: number = DEFAULT_WINNERS_ON_PAGE,
  sort: Sort | undefined = undefined,
  order: Order | undefined = undefined
): Promise<{ items: WinnerFull[]; count: number }> => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${GetSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(items.map(async (winner: Winner) => ({ ...winner, car: await getCar(winner.id) }))),
    count: +(response.headers.get('X-Total-Count') as string),
  };
};

export const getWinner = async (id: number): Promise<Winner> => (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${winners}/${id}`)).status;

export const deleteWinner = async (id: number): Promise<emptyObject> =>
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: Winner): Promise<Winner> =>
  (
    await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();

export const updateWinner = async (id: number, body: Winner): Promise<Winner | emptyObject> =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();

export const saveWinner = async ({ id, time }: WinnerParams): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
