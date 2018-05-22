import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../shared/services/http.service";
import { ProgramDescriptionDataModel } from "./program-description/program-description.model";
import { Events, Schools } from "./related-entities.model";
import { ProgramOverviewDataModel } from "./program-overview/overview.model";
import { ProgramVideosDataModel } from "./program-videos/program-videos.model";
import { ProgramImportantDatesDataModel } from "./important-dates/important-dates.model";
import { HeaderDataModel } from "./header/header.model";
import { IProgramLink } from "../shared/components/video-list/video-list.models";
import { BaseService } from "../shared/services/base.service";
import { EventListModel } from "../shared/components/event-list/event-list.model";
import { ProgramProfileConfig } from './program-profile.config';

@Injectable()
export class ProgramProfileService extends BaseService {

    programheaderData: HeaderDataModel;
    programDescriptioData: ProgramDescriptionDataModel;
    programDetailData: ProgramDescriptionDataModel;
    programOverviewData: ProgramOverviewDataModel;
    programVideosData: ProgramVideosDataModel;
    programEventsData: Events[];
    programImportantDates: ProgramImportantDatesDataModel[];
    programLinkData: IProgramLink[];
    configKey: string = 'programInstitutionName';

    constructor(private http: HttpService, private programProfileConfig: ProgramProfileConfig) {
        super();
    }

    getAll(config: any): Observable<any> {
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response, "programs")) {
                    return this.getProgramProfileData(response.data[0].programs[0], config);
                } else {
                    return null;
                }

            });
    }

    getEventDetail(config: any): Observable<EventListModel[]> {
        return this.http.getData(config)
            .map(response => {
                if (response && response.data)
                    return <EventListModel[]>response.data;
                else
                    return new Array<EventListModel>();
            });
    }

    getSchoolItemId(config: any): Observable<string> {
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response) && response.data[0].searchResults[0].fields && response.data[0].searchResults[0].fields.school && response.data[0].searchResults[0].fields.school[0].schoolItemId)
                    return response.data[0].searchResults[0].fields.school.map(({ schoolItemId }) => schoolItemId.value).toString();
                else
                    return "";
            });
    }

    private getProgramProfileData(programProfile: any, config): any {
        this.programLinkData = [];
        this.programheaderData = this.getProgramheader(programProfile);
        this.programheaderData.programSchoolName = this.getProgramSchoolName(programProfile.relatedEntities);
        this.programDescriptioData = this.getProgramDescription(programProfile.fields);
        this.programDetailData = this.getProgramDetail(programProfile.fields);
        this.programOverviewData = this.getProgramOverview(programProfile.fields, config);
        this.programEventsData = programProfile.relatedEntities.events;
        this.programImportantDates = this.getProgramImportantDates(programProfile.fields.programStart);
        if (programProfile.fields.programLink)
            programProfile.fields.programLink.map(o => this.programLinkData.push(<IProgramLink>o));
        return {
            programheaderData: this.programheaderData,
            programDescriptioData: this.programDescriptioData,
            programDetailData: this.programDetailData,
            programOverviewData: this.programOverviewData,
            programVideosData: this.programVideosData,
            programEventsData: this.programEventsData,
            programImportantDatesData: this.programImportantDates,
            programLinkData: this.programLinkData
        };
    }

    private getProgramheader(programProfile: any): HeaderDataModel {
        this.programheaderData = new HeaderDataModel();
        let program = programProfile.fields;
        this.programheaderData.programLogo = this.getValue(program.programLogo);
        this.programheaderData.programAddressLine1 = this.getValue(program.programAddressLine1);
        this.programheaderData.programAddressLine2 = this.getValue(program.programAddressLine2);
        this.programheaderData.programAddressLine3 = this.getValue(program.programAddressLine3);
        this.programheaderData.programCity = this.getValue(program.programCity);
        this.programheaderData.programCountryIdLookupName = this.getValue(program.programCountryIdLookupName);
        this.programheaderData.programDisplayName = this.getValue(program.programDisplayName);
        this.programheaderData.programWebsiteUrl = this.getValue(program.programWebsiteUrl);
        this.programheaderData.programPostalCode = this.getValue(program.programPostalCode);
        this.programheaderData.programStateProvinceId = this.getIntValue(program.programStateProvinceId);
        this.programheaderData.programStateProvinceIdLookupName = this.getValue(program.programStateProvinceIdLookupName);
        this.programheaderData.programPhoneCountryCode = this.getValue(program.programPhoneCountryCode);
        this.programheaderData.programPhoneNumber = this.getValue(program.programPhoneNumber);
        this.programheaderData.programPhoneExtension = this.getValue(program.programPhoneExtension);
        this.getProgramInstitutionName(this.getIntValue(programProfile.id)).subscribe(response => {
            if (response) {
                this.programheaderData.programInstitutionName = response.programInstitutionName;
                this.programheaderData.programSchoolLogo = response.programSchoolLogo;
            }
        });
        return this.programheaderData;
    }

    private getProgramSchoolName(programProfile: any): string {
        if (programProfile && programProfile.schools && programProfile.schools.length > 0 && programProfile.schools[0].fields)
            return this.getValue(programProfile.schools[0].fields.schoolName);
    }
    private getProgramDescription(programProfile: any): ProgramDescriptionDataModel {
        this.programDescriptioData = new ProgramDescriptionDataModel();
        this.programDescriptioData.programOverview = this.getValue(programProfile.programOverview);
        return this.programDescriptioData;
    }

    private getProgramDetail(programProfile: any): ProgramDescriptionDataModel {
        this.programDetailData = new ProgramDescriptionDataModel();
        this.programDetailData.programDegreeIdLookupName = this.getValue(programProfile.programDegreeIdLookupName);
        this.programDetailData.programTypeIdLookupName = this.getValue(programProfile.programTypeIdLookupName);
        this.programDetailData.programDeliveryFormatIdLookupName = this.getValue(programProfile.programDeliveryFormatIdLookupName);
        this.programDetailData.programLengthIdLookupName = this.getValue(programProfile.programLengthIdLookupName);
        this.programDetailData.programAreaOfStudy = programProfile.programAreaOfStudy;
        this.programDetailData.programAreaOfStudyOther = this.getValue(programProfile.programAreaOfStudyOther);
        this.programDetailData.programMilitaryFriendlyUrl = this.getValue(programProfile.programMilitaryFriendlyUrl);
        this.programDetailData.programJointDegreeOffered = this.getBoolValue(programProfile.programJointDegreeOffered) === true ? "Joint Degree Offered" : "";
        return this.programDetailData;
    }

    private getProgramImportantDates(programImportantDates: any): ProgramImportantDatesDataModel[] {
        let programImportantDatesData = new Array<ProgramImportantDatesDataModel>();
        if (programImportantDates) {
            for (let data of programImportantDates) {
                let programDate = new ProgramImportantDatesDataModel;
                programDate.programStartDate = data.programStartMonthIdLookupName.value;
                if (data.programApplicationDeadline) {
                    for (let deadline of data.programApplicationDeadline)
                        programDate.programApplicationDeadline = (programDate.programApplicationDeadline ? programDate.programApplicationDeadline + " , " : "") + deadline.programApplicationDeadlineMonthIdLookupName.value;
                }
                programImportantDatesData.push(programDate);
            }
        }
        return programImportantDatesData;
    }

    private getProgramOverview(programProfile: any, config): ProgramOverviewDataModel {
        this.programOverviewData = new ProgramOverviewDataModel();
        this.programOverviewData.programFinancialAidAvailable = this.getBoolValue(programProfile.programFinancialAidAvailable) === true ? config.financialAidMessage : "";
        this.programOverviewData.programFullyFunded = this.getBoolValue(programProfile.programFullyFunded) === true ? config.fullyFundedMessage : "";
        this.programOverviewData.programCost = programProfile.programCost ? programProfile.programCost : "";
        this.programOverviewData.programTest = programProfile.programTest ? programProfile.programTest : "";
        this.programOverviewData.programCreditsRequired = this.getValue(programProfile.programCreditsRequired);
        this.programOverviewData.programWorkExperience = programProfile.programWorkExperience ? programProfile.programWorkExperience : "";
        this.programOverviewData.programEmployment = programProfile.programEmployment ? programProfile.programEmployment : "";
        this.programOverviewData.programSizeAverage = this.getIntValue(programProfile.programSizeAverage);
        this.programOverviewData.programRollingAdmissions = this.getBoolValue(programProfile.programRollingAdmissions);
        return this.programOverviewData;
    }

    private getProgramInstitutionName(programId: number): Observable<any> {
        let config = this.programProfileConfig.getConfiguration(this.configKey);
        config.programId = programId;
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response) && response.data[0].searchResults[0].fields) {
                    let programData = {};
                    programData['programInstitutionName'] = this.getValue(response.data[0].searchResults[0].fields.programInstitutionName);
                    programData['programSchoolLogo'] = this.getValue(response.data[0].searchResults[0].fields.programSchoolLogo);
                    return programData;
                } else {
                    return null;
                }

            });
    }


}