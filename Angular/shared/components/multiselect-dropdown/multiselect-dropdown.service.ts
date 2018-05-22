import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ILookupModel, ResultSetModel } from '../../../school-finder/school-finder.model';
import { HttpService } from '../../services/http.service';
import { BaseService } from '../../services/base.service';

@Injectable()
export class MultiSelectDropdownService extends BaseService {

    constructor(private http: HttpService) { super(); }

    getData(config: any): Observable<ResultSetModel> {
        let data = new ResultSetModel();
        data.sourceList = <ILookupModel[]>[];
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response, config.configKey)) {
                    let totalRows = response.envelope.totalRows;
                    for (let source of response.data[0][config.configKey]) {
                        let sourceObj = {
                            value: this.getDisplayValue(source.fields, config.field),
                            id: config.idKey ? source.fields[config.idKey].value : source.id.value,
                            checked: false
                        };
                        data.sourceList.push(sourceObj);
                    }

                    data.totalRows = totalRows;                   
                }
                return data;
            });
    }

    getDisplayValue(sourceFields: any, configField: string[]): string {
        let displayValue: string = configField.map(item => {
            return this.getValue(sourceFields[item]);
        }).filter(n => { return !!n; }).join(", ");

        return displayValue;
    }
}