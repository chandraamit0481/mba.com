import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormat'
})

export class DateFormatPipe implements PipeTransform {
    transform(value: string, pattern: string = ""): string {
        if (!value) {
            return '';
        }

        const dateValue = new Date(value);

        const dateWithNoTimezone = new Date(
            dateValue.getUTCFullYear(),
            dateValue.getUTCMonth(),
            dateValue.getUTCDate(),
            dateValue.getUTCHours(),
            dateValue.getUTCMinutes(),
            dateValue.getUTCSeconds()
        );
        let datePipe = new DatePipe("en-US");
        if (!pattern || pattern === "") {
            pattern = "MMMM d, y";
        }
        value = datePipe.transform(dateWithNoTimezone, pattern);
        return value;
    }
}