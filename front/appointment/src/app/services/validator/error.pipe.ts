import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidatorErrorService } from './validator-error.service';

@Pipe({
  name: 'error',
  standalone: true,
  pure: false // fontos: form state változásra újrafut
})
export class ErrorPipe implements PipeTransform {

  constructor(private validator: ValidatorErrorService) {}

  transform(control: AbstractControl | null, field?: string): string | null {
    return this.validator.getError(control, field);
  }
}
