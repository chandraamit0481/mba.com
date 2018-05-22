import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
const _NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;

@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
   
    constructor(private _currencyPipe: CurrencyPipe) { }

    transform(value: any, currencyCode: string, symbolDisplay: boolean = true, digits: string): string {      
        if (typeof value === 'number' || _NUMBER_FORMAT_REGEXP.test(value)) {
            return this._currencyPipe.transform(value, currencyCode, symbolDisplay, digits);
        } else {
            return value;
        }
    }
}
