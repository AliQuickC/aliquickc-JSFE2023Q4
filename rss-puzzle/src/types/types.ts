// --- Validator types begin---
import { ValidatorRule } from './enum';

export type ruleOptions = {
  rule: ValidatorRule;
  errorMessage: string;
  value?: number;
};

export type validateOptions = {
  validator: (value: string) => boolean;
  errorMessage: string;
};

export type Options = ruleOptions | validateOptions;

export type fieldCheckData = { fieldElement: HTMLInputElement; errorElement: HTMLLabelElement; rule: Options[] };
// --- Validator types end---

export type SentenceData = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

export type levelData = {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
};

export type levelInfo = {
  levelData: levelData;
  words: SentenceData[];
};

export type WordCollection = { rounds: levelInfo[]; roundsCount: number };
