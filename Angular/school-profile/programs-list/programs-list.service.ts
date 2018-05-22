import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../shared/services/http.service";
import { SaveModel } from "../../shared/models/common.models";
import { BaseService } from "../../shared/services/base.service";


@Injectable()
export class ProgramsListService extends BaseService {
    config: any;

    constructor(private http: HttpService) {
        super();
    }

    getSavedPrograms(): Observable<SaveModel[]> {
        return this.http.getData(this.config)
            .map(response => {
                let key = "saved-programs";
                let saveItemList: SaveModel[] = new Array<SaveModel>();
                if (this.hasResults(response, key)) {
                    for (let item of response.data[0][key]) {
                        let saveModel: SaveModel = new SaveModel();
                        let attributes = item.attributes;
                        saveModel.savedId = this.getIntValue(item.id);
                        saveModel.id = this.getIntValue(attributes.ProgramOrgID);
                        saveItemList.push(saveModel);
                    }
                }
                return saveItemList;
            });
    }

}