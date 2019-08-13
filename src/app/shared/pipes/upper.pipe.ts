import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper' 
})
export class UpperPipe implements PipeTransform {

  transform(val: string): string {
    if (!val) return val;
    return val.toUpperCase();
  }
}
