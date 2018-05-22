import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../shared/services/base.service';
import { HttpService } from '../shared/services/http.service';
import { htmlDecode } from 'js-htmlencode';
import { IRPrepSigninModule } from './ir-prep-signin.module';
import { IRPrepModel } from './ir-prep-signin.model';
import { IRPrepKeyStatusEnum } from './ir-prep-signin.enum';
import { LicenseStatusEnum, ProductIDEnum } from '../shared/enums/lookups.enums';
@Injectable()
export class IRPrepSigninService extends BaseService {
    private model: IRPrepSigninModule;

    constructor(private http: HttpService) {
        super();
    }

    getLicense(config: any): Observable<IRPrepModel> {
        return this.http.getData(config).map(response => {
            return this.processData(response);
        });
    }

    getKeyStatus(config): Observable<IRPrepKeyStatusEnum> {       
       return this.getLicense(config).map(model => {
           if (model) {
               if ((model.productID === ProductIDEnum.IRPrepToolForEA || model.productID === ProductIDEnum.IRPrepTool) && model.licenseStatusID === LicenseStatusEnum.Purchased && model.expirationDate > new Date()) {
                   return IRPrepKeyStatusEnum.Purchased; //Success
               } else if ((model.productID === ProductIDEnum.IRPrepTool || model.productID === ProductIDEnum.IRPrepToolForEA) && model.licenseStatusID === LicenseStatusEnum.Activated) {
                   return IRPrepKeyStatusEnum.Activated; //Already Used
               } else if ((model.productID === ProductIDEnum.IRPrepTool || model.productID === ProductIDEnum.IRPrepToolForEA) && (model.licenseStatusID === LicenseStatusEnum.Expired || model.expirationDate <= new Date())) {
                   return IRPrepKeyStatusEnum.Expired;
               }
           }
           return IRPrepKeyStatusEnum.Invalid;
        });
    }

    private processData(response): IRPrepModel {
        let model = <IRPrepModel>{};
        if (this.hasResults(response, "License")) {
            let fields = response.data[0].License[0].fields;
            model.licenseID = this.getValue(fields.licenseID);
            model.expirationDate = new Date(this.getValue(fields.expirationDate));
            model.licenseKey = this.getValue(fields.licenseKey);
            model.licenseStatusID = this.getIntValue(fields.licenseStatusID);
            model.productID = this.getIntValue(fields.productID);
            model.statusName = this.getValue(fields.statusName);
        }
        return model;
    }
}