import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SaveModel } from "../../models/common.models";
import { HttpService } from "../../services/http.service";
import { BaseService } from "../../services/base.service";

@Injectable()
export class EventListService extends BaseService {

    constructor(private http: HttpService) {
        super();
    }

    getSavedEvents(key: string, config: any): Observable<SaveModel[]> {

        return this.http.getData(config)
            .map(response => {

                let saveItemList: SaveModel[] = new Array<SaveModel>();
                if (this.hasResults(response, key)) {
                    for (let item of response.data[0][key]) {
                        let saveModel: SaveModel = new SaveModel();
                        let attributes = item.fields;
                        saveModel.savedId = this.getIntValue(item.id);
                        saveModel.id = this.getIntValue(attributes.EventRecruitingCalendarID);
                        saveItemList.push(saveModel);
                    }
                }
                return saveItemList;
            });
    }
}