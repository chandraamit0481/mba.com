import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from "../../shared/services/http.service";
import { SaveModel, AddressModel } from "../../shared/models/common.models";
import { Observable } from "rxjs/Observable";
import { SchoolFinderModel, SchoolFinderMatchRateModel } from "./school-finder-match-rate.model";
import { BaseService } from "../../shared/services/base.service";

@Injectable()
export class SchoolFinderMatchRateService extends BaseService {


    constructor(private http: HttpService) {
        super();
    }

    getData(config: any): Observable<SchoolFinderModel> {

        return this.http.getData(config)
            .map(response => {

                let schoolFinderData = new SchoolFinderModel();
                if (response.envelope) {
                    schoolFinderData.metaData = response.envelope.metadata;
                    schoolFinderData.totalRows = response.envelope.totalRows ? parseInt(response.envelope.totalRows) : 0;
                    schoolFinderData.page = response.envelope.page ? parseInt(response.envelope.page) : 0;
                }

                schoolFinderData.matchData = this.processResponse(response);
                return schoolFinderData;
            });
    }

    processResponse(schoolFinderData): SchoolFinderMatchRateModel[] {

        let schoolFinderModel = <SchoolFinderMatchRateModel[]>[];
        if (this.hasResults(schoolFinderData)) {
            for (let searchResult of schoolFinderData.data[0].searchResults) {
                let item = new SchoolFinderMatchRateModel();
                let schoolFinderFields = searchResult.fields;
                item.itemId = this.getValue(schoolFinderFields.itemId);
                item.itemUrl = this.getValue(schoolFinderFields.itemUrl);
                item.matchRate = this.getIntValue(schoolFinderFields.matchRate);
                item.matchRateText = schoolFinderFields.matchRate ? schoolFinderFields.matchRate.title : "";
                let programAddress = new AddressModel();
                programAddress.address1 = this.getValue(schoolFinderFields.programAddressLine1);
                programAddress.city = this.getValue(schoolFinderFields.programCityName);
                programAddress.country = this.getValue(schoolFinderFields.programCountryName);
                programAddress.state = this.getValue(schoolFinderFields.programStateName);
                item.programCompleteAddress = programAddress.getAddress();
                item.programDisplayName = this.getValue(schoolFinderFields.programDisplayName);
                item.programGmatScore = this.getValue(schoolFinderFields.programGmatScore);
                item.programId = this.getValue(schoolFinderFields.programId);
                item.programInstitutionName = this.getValue(schoolFinderFields.programInstitutionName);
                item.programLength = this.getValue(schoolFinderFields.programLength);
                item.programSchoolName = this.getValue(schoolFinderFields.programSchoolName);
                item.programYearsWorkExperience = this.getValue(schoolFinderFields.programYearsWorkExperience);
                if (schoolFinderFields.school && schoolFinderFields.school.length > 0)
                    item.schoolUrl = this.getValue(schoolFinderFields.school[0].schoolUrl);
                item.schoolLogo = this.getValue(schoolFinderFields.programLogo) || this.getValue(schoolFinderFields.programSchoolLogo);

                schoolFinderModel.push(item);
            }
        }
        return schoolFinderModel;
    }

    getSavedPrograms(config: any): Observable<SaveModel[]> {
        let key: string = "saved-programs";
        return this.http.getData(config)
            .map(response => {
                let saveItemList: SaveModel[] = new Array<SaveModel>();
                if (this.hasResults(response, key)) {
                    for (let item of response.data[0][key]) {
                        let saveModel = <SaveModel>{};
                        let attributes = item.fields;
                        saveModel.savedId = this.getIntValue(item.id);
                        saveModel.id = this.getIntValue(attributes.ProgramOrgID);
                        saveItemList.push(saveModel);
                    }
                }
                return saveItemList;
            });
    }

    postSFAnalyticsData(url, data): Observable<any> {
        return this.http.postExternalUrl(url, data);

    }

    postActivity(config: any): Observable<any> {
        return this.http.post(config);
    }
}