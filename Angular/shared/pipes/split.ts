import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'split'
})
export class SplitPipe implements PipeTransform {

    transform(input: string, sep: string, inx: number): string {
        return input.split(sep)[inx];
    }

}