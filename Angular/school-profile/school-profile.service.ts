import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../shared/services/http.service";
import { SchoolHeaderDataModel } from "./school-profile-header/school-header.model";
import { ProgramDataModel, ProgramTestModel } from "./program-list-data.model";
import { IProgramLink } from "../shared/components/video-list/video-list.models";
import { BaseService } from "../shared/services/base.service";
import { LookupsEnum } from "../shared/enums/lookups.enums";
import { SchoolProfileConfig } from "./school-profile.config";
import { EventListModel } from "../shared/components/event-list/event-list.model";
import { OperatorsEnum } from '../shared/enums/operators.enum';
import { SchoolProfileDataModel } from "./school-profile.model";
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class SchoolProfileService extends BaseService {
    schoolheaderData: SchoolHeaderDataModel;

    constructor(private http: HttpService, private schoolProfileConfig: SchoolProfileConfig) { super(); }

    getSchoolProfile(schoolProfileConfig: any, schoolProgramConfig: any, schoolProgramMatchConfig: any, schoolEventConfig: any): Observable<SchoolProfileDataModel> {
        return this.http.getData(schoolProfileConfig)
            .mergeMap(response => {
                if (this.hasResults(response, "schools")) {
                    let schoolProfileDataModel: SchoolProfileDataModel = <SchoolProfileDataModel>{};
                    let requestApiContainer = [];
                    let schoolProfileModel = response.data[0].schools[0];
                    schoolProfileDataModel.schoolDetail = this.getschoolheader(schoolProfileModel.fields, schoolProfileModel);
                    let schoolProfileEventDataModel = this.getEventsData(response.data[0].schools[0]);
                    let isEventDataAvailable: boolean = false;
                    if (schoolProfileEventDataModel && schoolProfileEventDataModel.length > 0) {
                        let futureEvents = schoolProfileEventDataModel.filter(f => this.compareEndDate(this.getValue(f.fields.endDate))).map(i => this.getValue(i.id)).join(",");
                        if (futureEvents) {
                            schoolEventConfig.eventId = OperatorsEnum.In + " " + futureEvents;
                            isEventDataAvailable = true;
                            requestApiContainer.push(this.http.getData(schoolEventConfig));
                        }
                    }
                    let schoolProfileProgramModel = this.getProgramsData(response.data[0].schools[0]);
                    if (schoolProfileProgramModel && schoolProfileProgramModel.length > 0) {
                        let programModelIds = schoolProfileProgramModel.map(programModel => programModel.id ? programModel.id.value : "").join(",");
                        if (programModelIds) {
                            schoolProgramConfig.programOrgId = OperatorsEnum.In + " (" + programModelIds + ')';
                            schoolProgramMatchConfig.programId = OperatorsEnum.In + " " + programModelIds;
                            requestApiContainer.push(this.http.getData(schoolProgramConfig));
                            requestApiContainer.push(this.http.getData(schoolProgramMatchConfig));
                        }
                        return Observable.forkJoin(requestApiContainer).map(data => {
                            let itemIndex: number = 0;
                            let eventData: any;
                            if (isEventDataAvailable) {
                                eventData = data[itemIndex];
                                itemIndex = itemIndex + 1;
                                if (this.hasResults(eventData)) {
                                    schoolProfileDataModel.eventDetails = <EventListModel[]>eventData.data;
                                }
                            }
                            let programData: any = data[itemIndex];
                            let programMatchData: any = data[itemIndex + 1];

                            let programDataModelList = <ProgramDataModel[]>[];
                            if (this.hasResults(programData, "programs")) {
                                for (let programItem of programData.data[0].programs) {
                                    let programDataModel = <ProgramDataModel>{};
                                    let programData = programItem.fields;
                                    programDataModel.programDisplayName = this.getValue(programData.programDisplayName);
                                    programDataModel.programLengthIdLookupName = this.getValue(programData.programLengthIdLookupName);
                                    programDataModel.programOrgId = programItem.id.value;
                                    programDataModel.programTest = new Array<ProgramTestModel>();
                                    if (programData.programTest) {
                                        for (let scoreData of programData.programTest) {
                                            let programTestModel: ProgramTestModel = new ProgramTestModel();
                                            programTestModel.programTestIdLookupName = this.getValue(scoreData.programTestIdLookupName);
                                            programTestModel.programTestScoreAverage = this.getValue(scoreData.programTestScoreAverage);
                                            programDataModel.programTest.push(programTestModel);
                                        }
                                    }
                                    programDataModel.programLink = <IProgramLink[]>[];
                                    if (programData.programLink) {

                                        for (let plink of programData.programLink) {
                                            let prograLink = <IProgramLink>{};
                                            programDataModel.programLink.push(plink);
                                        }
                                    }
                                    if (this.hasResults(programMatchData)) {
                                        let programMatchItem = programMatchData.data[0].searchResults.find(x => x.fields.programId.value === programItem.id.value);
                                        if (programMatchItem && programMatchItem.fields) {

                                            programDataModel.programUrl = this.getValue(programMatchItem.fields.itemUrl);
                                        }
                                    }
                                    programDataModelList.push(programDataModel);
                                }
                            }
                            schoolProfileDataModel.programDetail = programDataModelList;
                            schoolProfileDataModel.programlink = this.removeDuplicate(programDataModelList);
                            schoolProfileDataModel.videoLink = this.getVideoLinks(schoolProfileDataModel.programlink);
                            schoolProfileDataModel.socialMediaLink = this.getSocialMediaLinks(schoolProfileDataModel.programlink);
                            return schoolProfileDataModel;
                        });
                    }
                } else {
                    return null;
                }
            });
    }

    private getschoolheader(schoolProfile: any, schoolData): SchoolHeaderDataModel {
        this.schoolheaderData = new SchoolHeaderDataModel();
        this.schoolheaderData.schoolLogo = this.getValue(schoolProfile.schoolLogo);
        if (schoolData && schoolData.relatedEntities && schoolData.relatedEntities.institutions.length > 0 && schoolData.relatedEntities.institutions[0].fields)
            this.schoolheaderData.institutionName = this.getValue(schoolData.relatedEntities.institutions[0].fields.institutionName);
        this.schoolheaderData.schoolAddressLine1 = this.getValue(schoolProfile.schoolAddressLine1);
        this.schoolheaderData.schoolAddressLine2 = this.getValue(schoolProfile.schoolAddressLine2);
        this.schoolheaderData.schoolAddressLine3 = this.getValue(schoolProfile.schoolAddressLine3);
        this.schoolheaderData.schoolCity = this.getValue(schoolProfile.schoolCity);
        this.schoolheaderData.schoolCountryIdLookupName = this.getValue(schoolProfile.schoolCountryIdLookupName);
        this.schoolheaderData.schoolDisplayName = this.getValue(schoolProfile.schoolDisplayName);
        this.schoolheaderData.schoolWebsiteUrl = this.getValue(schoolProfile.schoolWebsiteUrl);
        this.schoolheaderData.schoolPostalCode = this.getValue(schoolProfile.schoolPostalCode);
        this.schoolheaderData.schoolStateProvinceId = this.getIntValue(schoolProfile.schoolStateProvinceId);
        this.schoolheaderData.schoolStateProvinceIdLookupName = this.getValue(schoolProfile.schoolStateProvinceIdLookupName);
        this.schoolheaderData.schoolPhoneCountryCode = this.getValue(schoolProfile.schoolPhoneCountryCode);
        this.schoolheaderData.schoolPhoneNumber = this.getValue(schoolProfile.schoolPhoneNumber);
        this.schoolheaderData.schoolPhoneExtension = this.getValue(schoolProfile.schoolPhoneExtension);
        return this.schoolheaderData;

    }

    private getProgramsData(schoolProfile: any): any {
        if (schoolProfile && schoolProfile.relatedEntities)
            return schoolProfile.relatedEntities.programs;
        else
            return [];
    }

    private getEventsData(schoolProfile: any): any {
        if (schoolProfile && schoolProfile.relatedEntities)
            return schoolProfile.relatedEntities.events;
        else
            return [];
    }

    private removeDuplicate(programDetails: ProgramDataModel[]): IProgramLink[] {
        let plink = <IProgramLink[]>[];
        programDetails.map(o => o.programLink.map(checkProgramLink => {
            let x = plink.filter(p => this.getValue(p.programLinkUrl) === this.getValue(checkProgramLink.programLinkUrl));
            if (x.length === 0) {
                plink.push(checkProgramLink);
            } else {
                return null;
            }
        }));

        return plink;

    }

    private getSocialMediaLinks(programLink: IProgramLink[]): IProgramLink[] {

        return programLink.filter(x => x.programLinkTypeId.value !== LookupsEnum.OtherVideo && x.programLinkTypeId.value !== LookupsEnum.YouTubeVideo);

    }

    private getVideoLinks(programLink: IProgramLink[]): IProgramLink[] {

        return programLink.filter(x => x.programLinkTypeId.value === LookupsEnum.OtherVideo || x.programLinkTypeId.value === LookupsEnum.VideoChannel || x.programLinkTypeId.value === LookupsEnum.YouTubeVideo);

    }

}