// --- Validator types begin---
import { ValidatorRule } from '../types/enum';

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

export default class AValidate {
  private formElement!: HTMLFormElement;
  private successCallback: (() => void)[] = [];
  private fields: fieldCheckData[] = [];

  constructor(selector: string) {
    this.formElement = document.querySelector(selector) as HTMLFormElement;

    const submitButton = this.formElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    submitButton.onclick = (event: Event): void => {
      event.preventDefault();
      if (
        this.fields.reduce((isValid, field) => {
          const isCheckFaeld = this.checkField(field);
          return isCheckFaeld && isValid;
        }, true)
      ) {
        this.triggerSuccess();
      }
    };
  }

  private checkField = (field: fieldCheckData): boolean => {
    this.hideError(field.fieldElement, field.errorElement);
    for (let i = 0; i < field.rule.length; i += 1) {
      const option = field.rule[i];
      if (Object.prototype.hasOwnProperty.call(option, 'rule')) {
        if (!this.checkRule(field.fieldElement.value, option as ruleOptions)) {
          this.showError(field.fieldElement, field.errorElement, option.errorMessage);
          return false;
        }
      } else if (Object.prototype.hasOwnProperty.call(option, 'validator')) {
        if (!this.checkValidator(field.fieldElement.value, option as validateOptions)) {
          this.showError(field.fieldElement, field.errorElement, option.errorMessage);
          return false;
        }
      }
    }
    return true;
  };

  private triggerSuccess = (): void => {
    this.successCallback.forEach((fn) => fn());
  };

  private hideError = (fieldElement: HTMLInputElement, errorElement: HTMLLabelElement): void => {
    fieldElement.classList.remove('just-validate-error-field');
    errorElement.classList.remove('error');
  };

  private showError = (fieldElement: HTMLInputElement, errorElement: HTMLLabelElement, errorMessage: string): void => {
    errorElement.textContent = errorMessage;
    fieldElement.classList.add('just-validate-error-field');
    errorElement.classList.add('error');
  };

  private checkRule = (value: string, options: ruleOptions): boolean => {
    if (options.rule === ValidatorRule.Required && value === '') return false;
    if (options.rule === ValidatorRule.MinLength && value.length < (options.value as number)) return false;
    return true;
  };

  private checkValidator = (value: string, options: validateOptions): boolean => {
    if (!options.validator(value)) return false;
    return true;
  };

  public addField = (selector: string, rule: Options[]): AValidate => {
    const fieldElement = this.formElement.querySelector(selector) as HTMLInputElement;

    const errorElement: HTMLLabelElement = document.createElement('label');
    errorElement.classList.add('just-validate-error-label');
    fieldElement.after(errorElement);

    this.fields.push({ fieldElement, errorElement, rule });
    return this;
  };

  public onSuccess = (callback: () => void): void => {
    this.successCallback.push(callback);
  };
}
