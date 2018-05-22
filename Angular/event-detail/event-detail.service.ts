import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../shared/services/http.service";
import { BaseService } from "../shared/services/base.service";
import { EventHeaderDataModel } from "./event-detail-header/event-header.model";
import { EventContentDataModel } from "./event-detail-content/event-content.model";
import { ConfigModel } from "../shared/models/common.models";
import { DomSanitizer } from '@angular/platform-browser';
import { EventDetailDataModel } from './event-detail.model';

@Injectable()
export class EventDetailService extends BaseService {
    eventHeaderData: EventHeaderDataModel;
    eventContentData: EventContentDataModel;
    private url: string;

    constructor(private http: HttpService, private sanitizer: DomSanitizer) { super(); }

    getAll(config: ConfigModel): Observable<EventDetailDataModel> {
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response, "events")) {
                    return this.getEventDetailData(response.data[0].events[0]);
                } else {
                    return null;
                }
            });
    }

    private getEventDetailData(eventDetail: any): EventDetailDataModel {
        let eventsFields = eventDetail.fields;
        if (eventsFields) {
            this.eventHeaderData = this.getEventheader(eventsFields);
            this.eventContentData = this.getContentData(eventsFields);
            this.eventContentData.hostNames = this.getHostsNames(eventDetail.relatedEntities);

            return {
                eventHeaderData: this.eventHeaderData,
                eventContentData: this.eventContentData,
            };
        } else {
            return null;
        }

    }

    private getEventheader(eventDetail: any): EventHeaderDataModel {
        this.eventHeaderData = new EventHeaderDataModel();
        this.eventHeaderData.eventName = this.getValue(eventDetail.eventName);
        this.eventHeaderData.hostNames = this.getValue(eventDetail.eventHostName);
        return this.eventHeaderData;
    }

    private getHostsNames(eventDetail: any): string[] {
        let hostNames: string[] = [];
        if (eventDetail) {
            let hostingSchools = this.getSchoolNames(eventDetail.hostingSchool);
            hostingSchools = this.eventHeaderData && this.eventHeaderData.hostNames && hostingSchools ? hostingSchools.filter(x => this.eventHeaderData.hostNames.indexOf(x) === -1) : hostingSchools;
            let otherSchools = this.getSchoolNames(eventDetail.otherSchools);
            hostNames = hostingSchools.concat(otherSchools);
        }
        return hostNames;
    }

    private getSchoolNames(schoolDetail: any): string[] {
        let schoolNames: string[] = [];
        if (schoolDetail) {
            for (let item of schoolDetail) {
                schoolNames.push(this.getValue(item.fields.schoolName));
            }
        }
        return schoolNames;
    }

    private getContentData(eventDetail: any): EventContentDataModel {
        this.eventContentData = new EventContentDataModel();
        this.eventContentData.description = this.getValue(eventDetail.description);
        this.eventContentData.phoneNumber = this.getValue(eventDetail.phoneNumber);
        this.eventContentData.startDate = this.getValue(eventDetail.startDate);
        this.eventContentData.activeFlag = this.getIntValue(eventDetail.activeFlag);
        this.eventContentData.endDate = this.getValue(eventDetail.endDate);
        this.eventContentData.websiteAddress = this.getValue(eventDetail.websiteAddress);
        this.eventContentData.codeIdStartHour = this.getValue(eventDetail.startHour);
        this.eventContentData.codeIdEndHour = this.getValue(eventDetail.endHour);
        this.eventContentData.address1 = this.getValue(eventDetail.address1);
        this.eventContentData.address2 = this.getValue(eventDetail.address2);
        this.eventContentData.address3 = this.getValue(eventDetail.address3);
        this.eventContentData.eventCityName = this.getValue(eventDetail.city);
        this.eventContentData.eventStateName = this.getValue(eventDetail.stateProvinceName);
        this.eventContentData.eventCountryName = this.getValue(eventDetail.countryName);
        this.eventContentData.eventPostalCode = this.getValue(eventDetail.postalCode);
        this.eventContentData.emailAddress = this.getValue(eventDetail.emailAddress);
        this.eventContentData.isOnLine = this.getBoolValue(eventDetail.isOnLine);
        this.eventContentData.registrationRequired = this.getBoolValue(eventDetail.registrationRequired) ? "Yes" : "No";

        return this.eventContentData;
    }
}