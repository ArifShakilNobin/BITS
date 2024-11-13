import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputTrim]',
})
export class InputTrimDirective {
  constructor(private ngControl: NgControl) {
    trimValueAccessor(ngControl.valueAccessor?.registerOnChange);
  }
}
function trimValueAccessor(valueAccessor: any) {
  const original = valueAccessor;

  valueAccessor.registerOnChange = (fn: (_: unknown) => void) => {
    return original.call(valueAccessor, (value: unknown) => {
      return fn(typeof value === 'string' ? value.trim() : value);
    });
  };
}
