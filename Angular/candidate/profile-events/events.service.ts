import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../shared/services/http.service";
import { EventsModel, EventsDataModel } from "./events.models";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { BaseService } from "../../shared/services/base.service";
import { OperatorsEnum } from '../../shared/enums/operators.enum';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergemap';

@Injectable()
export class EventsService extends BaseService {
    constructor(private http: HttpService, private sitecoreConfig: SiteCoreConfig) {
        super();
    }

    getEvents(configObject, eventConfigObject): Observable<EventsDataModel> {
        let model = <EventsModel[]>[];
        const dataKey: string = "saved-events";
        if (this.sitecoreConfig.currentAccount && this.sitecoreConfig.currentAccount.identityID) {
            configObject.identityId = this.sitecoreConfig.currentAccount.identityID;
            return this.http.getData(configObject).mergeMap(response => {
                if (this.hasResults(response, dataKey)) {
                    let eventIds = <string[]>[];
                    eventConfigObject.eventId = OperatorsEnum.In + " " + response.data[0][dataKey].map(event => {
                        if (event.fields) {
                            return this.getValue(event.fields.EventRecruitingCalendarID);
                        }
                    }).join(",");
                    return this.http.getData(eventConfigObject).map(eventData => {

                        model = this.processResponse(eventData);
                        return this.filterRecords(model);
                    });
                }
                return Observable.of(null);
            });
        } else {
            return Observable.of(null);
        }
    }

    processResponse(eventData): EventsModel[] {
        if (this.hasResults(eventData)) {
            let eventModel = <EventsModel[]>[];

            for (let searchResult of eventData.data[0].searchResults) {
                let item = new EventsModel();
                let event = searchResult.fields;
                item.eventName = this.getValue(event.eventName);
                item.startDate = this.getValue(event.eventStartDate);
                item.endDate = this.getValue(event.eventEndDate);
                item.eventStartHour = this.getValue(event.eventStartHour);
                item.eventEndHour = this.getValue(event.eventEndHour);
                item.registrationRequired = this.getValue(event.eventRegistrationRequired);
                item.eventUrl = this.getValue(event.itemUrl);
                item.hostUrl = this.getValue(event.eventWebsiteAddress);
                item.isExpired = item.endDate && new Date(item.endDate) && this.extractDate(item.endDate) < this.extractDate("");
                item.eventLocation.address1 = this.getValue(event.address1);
                item.eventLocation.address2 = this.getValue(event.address2);
                item.eventLocation.address3 = this.getValue(event.address3);
                item.eventLocation.city = this.getValue(event.eventCityName);
                item.eventLocation.state = this.getValue(event.eventStateName);
                item.eventLocation.postalCode = this.getValue(event.eventPostalCode);
                item.eventLocation.country = this.getValue(event.eventCountryName);
                eventModel.push(item);
            }
            return eventModel;
        }
        return null;
    }

    private extractDate(dateInput: string): Date {
        let dateOutput: Date;
        dateOutput = dateInput ? new Date(dateInput) : new Date();
        return new Date(dateOutput.toLocaleDateString('en-US'));
    }

    filterRecords(eventModel: EventsModel[]): EventsDataModel {
        let eventDataModel = <EventsDataModel>{};
        if (eventModel && eventModel.length > 0) {
            let recentEventIndx = 0;

            for (let indx = 0; indx < eventModel.length; indx++) {
              if (this.extractDate(eventModel[indx].startDate) >= this.extractDate("")) {
                    recentEventIndx = indx;
                } else {
                    break;
                }
            }
            eventDataModel.recentEvent = eventModel.splice(recentEventIndx, 1);
            eventDataModel.restEvent = <EventsModel[]>[];

            for (recentEventIndx--; recentEventIndx > 0; recentEventIndx--) {
                eventDataModel.restEvent.push(eventModel.splice(recentEventIndx, 1)[0]);
            }
            eventDataModel.restEvent = eventDataModel.restEvent.concat(eventModel);
        }
        return eventDataModel;
    }

}