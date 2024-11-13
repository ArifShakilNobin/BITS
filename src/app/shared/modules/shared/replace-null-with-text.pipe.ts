import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNullWithText',
})
export class ReplaceNullWithText implements PipeTransform {
  transform(value: string, repleceText: string = 'N/A'): any {
    if (value) {
      return value;
    }
    return repleceText;
  }
}
