import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../../shared/services/base.service';
import { HttpService } from '../../../shared/services/http.service';
import { ExamsConfig } from './exams.config';
import { OperatorsEnum } from '../../../shared/enums/operators.enum';
import { SiteCoreConfig } from '../../../shared/config/sitecore.config';
import { ProductIDEnum, LicenseStatusEnum } from '../../../shared/enums/lookups.enums';
import 'rxjs/add/operator/mergemap';
import { ResponseModel } from '../../../shared/models/response.model';
@Injectable()
export class ExamsService extends BaseService {

    constructor(private http: HttpService, private sitecoreConfig: SiteCoreConfig, private examsConfig: ExamsConfig) {
        super();
    }

    getScoreReportKey(config: any): Observable<string> {
        return this.http.getData(config).map(response => {
            let retVal = "";
            const key: string = 'official-score-report-key';
            if (this.hasResults(response, key) && response.data[0][key][0].fields) {
                retVal = this.getValue(response.data[0][key][0].fields.hashKey);
            }
            return retVal;
        });
    }

    getESRKey(config: any): Observable<string> {
        return this.http.getData(config).mergeMap(response => {
            if (this.hasData(response) && response.data[0].productpurchases.length > 0) {
                let esrKey = this.getKey(response.data[0].productpurchases);
                let getLicenseConfig = this.examsConfig.getConfiguration('license');
                getLicenseConfig.licenseKey = OperatorsEnum.In + " " + esrKey.join(',');
                return this.http.getData(getLicenseConfig).map(result => {
                    if (this.hasData(result) && result.data[0].License.length > 0) {
                        let licenseArray = this.getSortedlicenseKey(result.data[0].License).sort();
                        return licenseArray[0];
                    } else {
                        return null;
                    }
                });
            } else {
                return Observable.of(null);
            }
        });
    }

    getKey(data) {
        let esrKey = [];
        for (let item of data) {
            if (item.fields.key.value !== '') {
                esrKey.push(item.fields.key.value);
            }
        }
        return esrKey;

    }

    getSortedlicenseKey(license) {
        let licenseKey = [];
        for (let data of license) {
            if (data.fields.licenseKey.value !== '' && data.fields.licenseStatusID.value === LicenseStatusEnum.Purchased && new Date(data.fields.expirationDate.value) >= new Date() && data.fields.productID.value === ProductIDEnum.ESRCode) {
                licenseKey.push(data.fields.licenseKey.value);
            }
        }

        return licenseKey;
    }

    applyCode(config): Observable<string> {
        return this.http.post(config).map(response => {
            response = response ? JSON.parse(response["_body"]) : "";
            if (this.hasResults(response, "esractivation") && (<ResponseModel<any>>response).data[0].esractivation[0].fields) {
                return this.getValue((<ResponseModel<any>>response).data[0].esractivation[0].fields.status);
            }
            return "";
        });
    }

    getReportActivationGUID(config): Observable<string> {
        return this.http.post(config).map(response => {
            response = response ? JSON.parse(response["_body"]) : "";
            if (this.hasResults(response, "esrgetlink") && (<ResponseModel<any>>response).data[0].esrgetlink[0].fields) {
                return this.getValue((<ResponseModel<any>>response).data[0].esrgetlink[0].fields.accessCode);
            }
            return "";
        });
    }
}