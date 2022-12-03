import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const characterLimit: number = (args.length > 0) ? parseInt(args[0]) : 20;
    const trail: string = (args.length > 1) ? args[1] : '...';
    return (value.length > characterLimit) ? value.substring(0, characterLimit) + trail : value;
  }

}
