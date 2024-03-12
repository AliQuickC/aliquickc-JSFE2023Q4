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
