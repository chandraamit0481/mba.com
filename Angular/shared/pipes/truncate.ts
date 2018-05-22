import { Pipe } from "@angular/core";
import { htmlDecode } from 'js-htmlencode';

@Pipe({
    name: 'truncate'
})

export class TruncatePipe {
    transform(value: string, limit: number = 200, trail: string, redirectToUrl: string, completeWords = false) {
        if (value) {
            value = htmlDecode(value.replace(/(<([^>]+)>)/ig, ""));
            let lastindex = limit;
            if (completeWords) {
                lastindex = value.length > lastindex ? value.substring(0, lastindex).lastIndexOf(' ') : value.length;
            }
            if (redirectToUrl) {
                return value.length > lastindex ? value.substring(0, lastindex) + ' <a href="' + redirectToUrl + '">' + trail + '</a>' : value;
            } else {
                return value.length > lastindex ? value.substring(0, lastindex) + trail : value;
            }
        }
    }
}

