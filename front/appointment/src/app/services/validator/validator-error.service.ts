import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ValidatorErrorService {

    private readonly defaultMessages: Record<string, string | ((e: any) => string)> = {
    required: 'Kötelező mező.',
    email: 'Érvénytelen e-mail cím.',
    minlength: (e: any) => `Minimum ${e.requiredLength} karakter.`,
    maxlength: (e: any) => `Maximum ${e.requiredLength} karakter.`,
    pattern: 'Hibás formátum.'
  };

   private readonly fieldOverrides: Record<string, Record<string, string>> = {
    password: {
      minlength: 'A jelszónak legalább 8 karakteresnek kell lennie.'
    }
  };

  getError(control: AbstractControl | null, field?: string): string | null {
    if (!control || !(control.touched || control.dirty) || !control.errors) {
      return null;
    }

    const key = Object.keys(control.errors)[0];
    const value = control.errors[key];

    if (field && this.fieldOverrides[field]?.[key]) {
      return this.fieldOverrides[field][key];
    }

    const message = this.defaultMessages[key];
    if (!message) return 'Érvénytelen érték.';
    return typeof message === 'function' ? message(value) : message;
  }
}
