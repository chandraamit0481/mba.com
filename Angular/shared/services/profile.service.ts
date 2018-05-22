import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from "../../shared/services/http.service";
import { SaveModel } from "../../shared/models/common.models";
import { Observable } from "rxjs/Observable";
import { BaseService } from "../../shared/services/base.service";

@Injectable()
export class ProfileService extends BaseService {

    constructor(private http: HttpService) {
        super();
    }

    getSavedItems(config: any): Observable<SaveModel[]> {
        return this.http.getData(config)
            .map(response => {
                let saveItemList: SaveModel[] = new Array<SaveModel>();
                if (this.hasResults(response, config.method)) {
                    for (let item of response.data[0][config.method]) {
                        let saveModel = <SaveModel>{};
                        let attributes = item.fields;
                        saveModel.savedId = this.getIntValue(item.id);
                        saveModel.id = this.getIntValue(attributes[config.key]);
                        saveItemList.push(saveModel);
                    }
                }
                return saveItemList;
            });
    }
}