import { Pipe, PipeTransform } from '@angular/core';
import { IProgramLink } from "./video-list.models";

@Pipe({
    name: 'linksfilter',
    pure: false
})

export class LinksFilterPipe implements PipeTransform {
    transform(items: IProgramLink[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.programLinkTypeId.value.toString().indexOf(filter) !== -1);
    }
}  