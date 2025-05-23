export interface IForm {
  formTitle: string,
  saveBtnLabel: string,
  resetBtnLabel: string,
  formControls: IFormControl[];
}

export interface IFormControl {
  name: string;
  label: string;
  value?: string;
  options?: IOptions[];
  radioOptions?: string[];
  placeholder: string;
  class: string;
  type: string;
  validators?: IValidator[];
  conditional?: {
    dependsOn: string,
    valueEquals: string;
  };
}

export interface IValidator {
  validatorName: string;
  message: string;
  required: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  email?: string;
}

interface IOptions {
  id?: number;
  value?: string;
  selected?: boolean;
}
