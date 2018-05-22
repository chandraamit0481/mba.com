import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../shared/services/http.service';
import { BaseService } from '../shared/services/base.service';
import { CandidateProfileModel } from '../shared/models/candidate-profile.models';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { CandidateProfileSitecoreModel } from '../shared/models/candidate-profile-sitecore.models';

@Injectable()
export class CandidateProfileService extends BaseService {
    model: CandidateProfileModel;
    constructor(private http: HttpService, private sitecoreConfig: SiteCoreConfig) {
        super();
    }

    getData(config: any): Observable<CandidateProfileModel> {
        return this.http.getData<CandidateProfileModel[]>(config).map(response => {            
            return this.mapResponse(response);
        });
    }

    private mapResponse(data: any): CandidateProfileModel {        
        this.model = new CandidateProfileModel();

        if (!this.hasResults(data, "Identity")) {
            return this.model;
        }

        let response = data.data[0].Identity[0].fields;
        
        this.model.gmatid = this.getValue(response["gmat-id"]);
        this.model.firstName = this.getValue(response.firstname);
        this.model.lastName = this.getValue(response.lastname);
        this.model.email = this.getValue(response.email);
        if (this.model.gmatid) {
            this.model.fullName = this.getValue(response["pvue-first-name"]) + " " + this.getValue(response["pvue-last-name"]);
        } else {
            this.model.fullName = this.model.firstName + " " + this.model.lastName;
            this.model.pvueEmail = this.getValue(response.email);
        }

        this.model.cityStateProvince = this.getValue(response["pvue-city"], "", ",") + this.getValue(response["pvue-state-province-description"], "", ",");
        this.model.fullAddress = this.getValue(response["pvue-address1"], "", ",") + this.getValue(response["pvue-address2"], "", ",") + this.getValue(response["pvue-address3"], "", ",");

        if (this.model.cityStateProvince) {
            this.model.cityStateProvince = this.model.cityStateProvince.slice(0, -1);
        }

        if (this.model.fullAddress) {
            this.model.fullAddress = this.model.fullAddress.slice(0, -1);
        }

        this.model.pvueCountryName = this.getValue(response["pvue-country-description"]);
        this.model.dayPhoneNumber = this.getValue(response["day-phone-number"]);
        this.model.pvueCountryCitizenship = this.getValue(response["pvue-country-of-citizenship-description"]);
        this.model.nativeLanguage = this.getValue(response["pvue-native-language-description"]);
        this.model.email = this.getValue(response.email);
        this.model.formattedMBAStartDate = this.getValue(response["pvue-mba-start-date"], "Undecided");
        this.model.mbaWorldStudyRegions = this.getValue(response["pvue-world-study-region-description"], "-");
        this.model.mbaDegreePursued = this.getValue(response["pvue-mba-degree-pursued-description"], "-");
        this.model.mbaAreaOfConcentration = this.getValue(response["pvue-mba-area-of-concentration-description"], "-");
        this.model.howMBAPursued = this.getValue(response["pvue-how-mba-pursued-description"], "-");
        this.model.fullOrPartTimeStudent = this.getValue(response["pvue-full-or-part-time-student-description"], "-");
        this.model.workFullTimeWhilePursue = this.getValue(response["pvue-work-while-pursue-description"], "-");
        this.model.functExpAfterDegree = this.getValue(response["pvue-funct-exp-after-degree-description"], "-");
        this.model.indExpAfterDegree = this.getValue(response["pvue-ind-exp-after-degree-description"], "-");
        this.model.yearsOfWorkExperienceName = this.getValue(response["pvue-years-of-work-experience-description"], "-");
        this.model.functExpBeforeDegree = this.getValue(response["pvue-funct-exp-before-degree-description"], "-");
        this.model.indExpBeforeDegree = this.getValue(response["pvue-ind-exp-before-degree-description"], "-");

        if (response["pvue-military-service"]) {
            this.model.militaryService = this.getBoolValue(response["pvue-military-service"]) ? "Yes" : "No";
        } else {
            this.model.militaryService = "-";
        }

        this.model.highestEducationLevel = this.getValue(response["pvue-highest-education-level-description"], "-");
        this.model.undergraduateInstitution = this.getValue(response["pvue-undergraduate-institution-description"], "-");
        this.model.undergradGraduationDate = this.getValue(response["pvue-undergraduate-graduation-date"], "-");
        this.model.undergraduateMajor = this.getValue(response["pvue-undergraduate-major-description"], "-");
        this.model.undergradGPA = this.getValue(response["pvue-undergrad-gpa"], "-");
        this.model.gmassOptin = this.getBoolValue(response["optin-gmass"]) ? "Yes" : "No";
        this.model.careerOptin = this.getBoolValue(response["optin-career"]) ? "Yes" : "No";
        this.model.gmatOptin = this.getBoolValue(response["optin-gmat"]) ? "Yes" : "No";
        this.model.countryID = this.getIntValue(response["pvue-country-of-citizenship-id"], 0);
        this.model.nativeLanguageID = this.getIntValue(response["pvue-native-language-id"], 0);
        this.model.mbaDegreePursuedID = this.getIntValue(response["pvue-mba-degree-pursued-id"], 0);
        this.model.workFullTimeWhilePursueID = this.getIntValue(response["pvue-work-while-pursue-id"], 0);
        this.model.pvuePostalCode = this.getValue(response["pvue-postal-code"], "");
        this.calculatePrecentage(this.model);

        return this.model;
    }

    private calculatePrecentage(model: CandidateProfileModel): void {
        let progressSettings = this.sitecoreConfig.candidateProfileLabels && this.sitecoreConfig.candidateProfileLabels.profileProgressSettings;
        model.total = 0;
        if (progressSettings) {
            if (model.firstName) {
                model.total += progressSettings.firstName;
            }

            if (model.lastName) {
                model.total += progressSettings.lastName;
            }

            if (model.homeAddress1) {
                model.total += progressSettings.streetAddress;
            }

            if (model.homeCity) {
                model.total += progressSettings.city;
            }

            if (model.homePostalCode) {
                model.total += progressSettings.zipOrPostalCode;
            }

            if (model.pvueCountryName) {
                model.total += progressSettings.country;
            }

            if (model.email) {
                model.total += progressSettings.email;
            }

            if (model.dayPhoneNumber) {
                model.total += progressSettings.phoneNumber;
            }

            if (model.countryID !== 0) {
                model.total += progressSettings.citizenship;
            }

            if (model.nativeLanguageID !== 0) {
                model.total += progressSettings.firstOrNativeLanguage;
            }

            if (model.formattedMBAStartDate !== "Undecided") {
                model.total += progressSettings.expectedStartDate;
            }

            if (model.mbaWorldStudyRegions !== "-") {
                model.total += progressSettings.preferredRegionOfStudy;
            }

            if (model.mbaDegreePursuedID !== 0) {
                model.total += progressSettings.degreeSought;
            }

            if (model.mbaAreaOfConcentration !== "-") {
                model.total += progressSettings.areaOfConcentration;
            }

            if (model.howMBAPursued !== "-") {
                model.total += progressSettings.howPursueDegree;
            }

            if (model.fullOrPartTimeStudent !== "-") {
                model.total += progressSettings.typeOfStudent;
            }

            if (model.workFullTimeWhilePursueID !== 0) {
                model.total += progressSettings.workPlan;
            }

            if (model.careerOptin === "Yes") {
                model.total += progressSettings.desiredPostDegreeFunction;
            }

            if (model.functExpAfterDegree !== "-") {
                model.total += progressSettings.desiredPostDegreeIndustry;
            }

            if (model.yearsOfWorkExperienceName !== "-") {
                model.total += progressSettings.yearsOfExperience;
            }

            if (model.functExpBeforeDegree !== "-") {
                model.total += progressSettings.functionalArea;
            }

            if (model.indExpBeforeDegree !== "-") {
                model.total += progressSettings.industry;
            }

            if (model.militaryService === "Yes") {
                model.total += progressSettings.previousMilitaryExperience;
            }

            if (model.highestEducationLevel !== "-") {
                model.total += progressSettings.highestLevelOfEductionAttained;
            }

            if (model.undergraduateInstitution !== "-") {
                model.total += progressSettings.schoolOfUndergraduateOrFirstDegree;
            }

            if (model.undergradGraduationDate !== "-") {
                model.total += progressSettings.dateOrExpectedDateOfGraduation;
            }

            if (model.undergraduateMajor !== "-") {
                model.total += progressSettings.majorOrPrimaryFieldOfStudy;
            }

            if (model.undergradGPA !== "-") {
                model.total += progressSettings.gpa;
            }


        }
       
    }
}