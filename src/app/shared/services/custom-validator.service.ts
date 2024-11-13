import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class CustomValidatorService {

  constructor() { }

  noWhitespaceValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.whitespaceValidator(control.value).pipe(
        map((res) => {
          return res ? null : { whitespace: true };
          // NB: Return null if there is no error
        })
      );
    };
  }

  whitespaceValidator(name: string): Observable<boolean> {
    const isWhitespace = (name || '').trim().length === 0;
    const isValid = !isWhitespace;
    return of(isValid ? true : false);
  }

  cannotContainSpace(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    if ((control.value as string).indexOf(' ') >= 0) {
      return of({ cannotContainSpace: true });
    }

    return of(null);
  }
}
