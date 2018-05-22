import { Component, OnInit } from "@angular/core";
import { FromYourProfileModel } from "./from-your-profile.model";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { DataService } from "../../shared/services/share-data.service";
import { CandidateProfileModel } from "../../shared/models/candidate-profile.models";
import { Base } from "../../shared/models/common.models";

@Component({
    selector: "from-your-profile",
    templateUrl: './from-your-profile.component.html'
})

export class FromYourProfileComponent extends Base implements OnInit {
    model: CandidateProfileModel;
    fromProfile: FromYourProfileModel;
    isLoggedIn: boolean = false;
    redirectTo: string;
    registrationUrl: string;

    constructor(private siteCoreConfig: SiteCoreConfig, private dataService: DataService) {
        super();
        this.isLoggedIn = this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.identityID ? true : false;
        this.redirectTo = this.siteCoreConfig.candidateProfileUrl;
        this.registrationUrl = this.siteCoreConfig.registrationUrl;
    }

    ngOnInit(): void {
        this.fromProfile = <FromYourProfileModel>{};
        this.model = this.siteCoreConfig.currentAccount;

        if (this.siteCoreConfig.preferredCountry) {
            this.fromProfile.programCountryName = this.siteCoreConfig.preferredCountry.countryName;
            this.fromProfile.programStateName = this.siteCoreConfig.preferredCountry.stateProvinceName;
            this.fromProfile.programCityName = this.siteCoreConfig.preferredCountry.cityName;
            this.fromProfile.geolocation = this.siteCoreConfig.preferredCountry.latitude && this.siteCoreConfig.preferredCountry.longitude ? this.siteCoreConfig.preferredCountry.latitude + "," + this.siteCoreConfig.preferredCountry.longitude : "";
            this.fromProfile.programLocation = (this.fromProfile.programCityName ? this.fromProfile.programCityName + ", " : "") + (this.fromProfile.programStateName ? this.fromProfile.programStateName + ", " : "") + (this.fromProfile.programCountryName ? this.fromProfile.programCountryName + ", " : "");
            this.fromProfile.programLocation = this.fromProfile.programLocation.slice(0, -2);
        }

        let yearsString = this.model.yearsOfWorkExperienceName ? this.model.yearsOfWorkExperienceName : "0";
        if (yearsString) {
            let yrs = yearsString.split(" ");
            if (yrs && yrs.length > 0) {
                this.fromProfile.programYearsWorkExperience = yrs[0];
            }
        }

        this.fromProfile.programGmatScore = "";
        this.refreshData();
    }

    refreshData(): void {
        this.dataService.setOption("FromProfile", this.fromProfile);
    }

    onEnterKeyClick(event: any): void {
        event.target.blur();
    }
}
