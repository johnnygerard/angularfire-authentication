import { AbstractControl } from "@angular/forms";

export const showErrors = (
  control: AbstractControl,
  isFormSubmitted: boolean,
): boolean =>
  control.invalid && (control.touched || control.dirty || isFormSubmitted);
