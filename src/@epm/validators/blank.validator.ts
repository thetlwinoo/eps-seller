import { FormGroup } from "@angular/forms";

export function checkIfBlankValidator(control: FormGroup): { [s: string]: boolean } {
  if (control.value !== null && control.value.trim() != control.value && control.value.trim() === '') {
    return { 'blank': true };
  }
  return null;
}

export function notBlankValidator(control: FormGroup): { [s: string]: boolean } {
  if (control.value === null) {
    return { 'blank': true };
  }
  return null;
}
