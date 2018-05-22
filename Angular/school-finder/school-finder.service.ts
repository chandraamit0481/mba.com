import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ILookupModel } from "./school-finder.model";
import { HttpService } from "../shared/services/http.service";
import { BaseService } from '../shared/services/base.service';
import "rxjs/add/observable/of";

@Injectable()
export class SchoolFinderService extends BaseService {

    constructor(private http: HttpService) { super(); }

    getData(config: any) {
        let sourceList: ILookupModel[] = [];
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response, config.configKey)) {
                    for (let source of response.data[0][config.configKey]) {
                        let sourceObj = {
                            value: source.fields[config.field].value,
                            id: source.id.value,
                            checked: false
                        };
                        sourceList.push(sourceObj);
                    }
                }
                return sourceList;
            }).catch(() => { return Observable.of(null) });
    }
}
