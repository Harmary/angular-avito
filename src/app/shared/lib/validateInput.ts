import { AbstractControl } from '@angular/forms';

const validateInput = (field: AbstractControl) => {
  return field.invalid && field.touched ? 'ng-invalid ng-dirty' : 'flex-auto';
};

export default validateInput;
