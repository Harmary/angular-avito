import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nonEmptyArrayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string[];
    return value && value.length > 0 ? null : { nonEmptyArray: true };
  };
}
