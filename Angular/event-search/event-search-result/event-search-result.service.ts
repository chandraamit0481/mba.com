import { Injectable } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";
import { Observable } from "rxjs/Observable";
import { SaveModel } from "../../shared/models/common.models";
import { BaseService } from "../../shared/services/base.service";
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/observable/of';
import { OperatorsEnum } from '../../shared/enums/operators.enum';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class EventSearchResultService extends BaseService {

    method: string = "saved-events";

    constructor(private http: HttpService) { super(); }

    getAll(config: any): Observable<any> {
        if (config.eventIsOnline === "" && (config.geoLocation || config.eventCountryName)) {
            let inPersonEvents = this.getAllEvents(config);
            let onlineConfig = Object.assign({}, config);
            onlineConfig.eventIsOnline = true;
            onlineConfig.geoLocation = "";
            onlineConfig.eventCountryName = "";
            let onlineEvents = this.getAllEvents(onlineConfig);
            let requestArr = [];
            requestArr.push(inPersonEvents);
            requestArr.push(onlineEvents);
            return forkJoin(requestArr).map(response => {
                return this.processResponse(response);
            });
        } else {
            return this.http.getData(config);
        }

    }
    private processResponse(response): any {
        if (response && response.length === 2) {
            let emptyEvents = {
                "data": [{ "searchResults": [] }], "envelope": { "totalRows": 0 }
            };
            let inPersonEvents = this.hasResults(response[0]) ? response[0] : emptyEvents;
            let onlineEvents = this.hasResults(response[1]) ? response[1] : emptyEvents;
            let onlineRows = onlineEvents && onlineEvents.envelope && onlineEvents.envelope.totalRows ? onlineEvents.envelope.totalRows : 0;
            let inPersonRows = inPersonEvents && inPersonEvents.envelope && inPersonEvents.envelope.totalRows || 0;
            emptyEvents.data[0].searchResults = inPersonEvents.data[0].searchResults.concat(onlineEvents.data[0].searchResults);
            emptyEvents.envelope.totalRows = inPersonRows + onlineRows;
            emptyEvents.data[0].searchResults.sort(this.comparePublishDate);
            return emptyEvents;
        }
    }

    private comparePublishDate(a, b) {
        if (a.fields && b.fields) {
            let eventStartDateA = a.fields.eventStartDate.value;
            let eventStartDateB = b.fields.eventStartDate.value;
            let comparison = 0;
            if (eventStartDateA > eventStartDateB) {
                comparison = 1;
            } else if (eventStartDateA < eventStartDateB) {
                comparison = -1;
            }
            return comparison;
        }

    }

    private getAllEvents(config: any): Observable<any> {
        return this.http.getData(config)
            .mergeMap(response => {
                let eventObj = Object.assign({}, config);
                if (this.hasResults(response)) {
                    if (response.envelope && response.envelope.totalRows) {
                        eventObj.pageSize = response.envelope.totalRows - response.data[0]['searchResults'].length;
                    }
                    let itemIdList = response.data[0]['searchResults'].map(res => { return res.fields ? this.getValue(res.fields.itemId) : ""; }).join(",");
                    eventObj.itemId = itemIdList ? OperatorsEnum.NotIn + " (" + itemIdList + ")" : "";
                    if (eventObj && eventObj.pageSize > 0) {
                        return this.http.getData(eventObj)
                            .map(result => {
                                let remainingEvents = result;
                                if (this.hasResults(remainingEvents)) {
                                    let allEvents = {
                                        "data": [{ "searchResults": [] }], "envelope": { "totalRows": 0 }
                                    };
                                    allEvents.data[0].searchResults = response.data[0].searchResults.concat(remainingEvents.data[0].searchResults);
                                    allEvents.envelope.totalRows = response && response.envelope && response.envelope.totalRows || 0;
                                    return allEvents;
                                } else {
                                    return response;
                                }
                            });
                    } else {
                        return Observable.of(response);
                    }
                } else {
                    return Observable.of(null);
                }

            });
    }

    getSavedEvents(config: any): Observable<SaveModel[]> {
        return this.http.getData(config)
            .map(response => {
                let saveItemList: SaveModel[] = new Array<SaveModel>();
                if (this.hasResults(response, this.method)) {
                    for (let item of response.data[0][this.method]) {
                        let saveModel = <SaveModel>{};
                        let fields = item.fields;
                        saveModel.savedId = this.getIntValue(item.id);
                        saveModel.id = this.getIntValue(fields.EventRecruitingCalendarID);
                        saveItemList.push(saveModel);

                    }
                }
                return saveItemList;
            });
    }

}