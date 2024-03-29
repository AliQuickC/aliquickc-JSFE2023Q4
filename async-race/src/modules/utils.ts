import { brandsCars } from '../data/brands-cars';
import { modelsCars } from '../data/models-cars';

function randomInteger(min: number, max: number): number {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function getRandomColor(): string {
  function decToHexNumber(numb: number): string {
    const xehStr = Number(numb).toString(16).toUpperCase();
    const pad = '00';
    return (pad + xehStr).slice(-pad.length);
  }
  return `#${decToHexNumber(randomInteger(0, 255))}${decToHexNumber(randomInteger(0, 255))}${decToHexNumber(randomInteger(0, 255))}`;
}

export function getRandomCarName(): string {
  const brand = randomInteger(0, brandsCars.length - 1);
  const model = randomInteger(0, modelsCars.length - 1);
  return `${brandsCars[brand]} ${modelsCars[model]}`;
}
