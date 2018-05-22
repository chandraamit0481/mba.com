import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../../shared/services/base.service';
import { HttpService } from '../../../shared/services/http.service';
import { ScoreReportModel } from './score-report.models';
import { AddressModel } from '../../../shared/models/common.models';

@Injectable()
export class ScoreReportService extends BaseService {

    constructor(private http: HttpService) {
        super();
    }

    getScoreReport(config: any): Observable<ScoreReportModel[]> {
        return this.http.getData(config).map(response => {
            return this.processData(response);
        });
    }

    private processData(response): ScoreReportModel[] {
        let model = <ScoreReportModel[]>[];
        let key = "scorereportrequest";
        if (this.hasResults(response, key)) {
            response.data[0][key].map(item => {
                let field = item.fields;
                if (field) {
                    let report = <ScoreReportModel>{};
                    report.universityName = this.getValue(field.universityName);
                    report.schoolName = this.getValue(field.schoolName);
                    report.programName = this.getValue(field.programName);
                    let address = new AddressModel();
                    address.city = this.getValue(field.programCity);
                    address.state = this.getValue(field.programState);
                    address.country = this.getValue(field.programCountry);
                    report.programAddress = address.getAddress();
                    report.dateTimeRequested = new Date(this.getValue(field.dateTimeRequested));
                    report.dateTimeFulfilled = new Date(this.getValue(field.dateTimeFulfilled));                    
                    model.push(report);
                }
            });            
        }
        return model;
    }
}
