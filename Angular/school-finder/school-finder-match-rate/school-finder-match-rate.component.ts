import { Component, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SchoolFinderMatchRateService } from "./school-finder-match-rate.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { DataService } from "../../shared/services/share-data.service";
import { ConfigModel, SaveModel } from "../../shared/models/common.models";
import { SchoolFinderMatchRateConfig } from "./school-finder-match-rate.config";
import { SchoolFinderMatchRateModel } from "./school-finder-match-rate.model";
import { Base } from "../../shared/models/common.models";
import { OperatorsEnum } from '../../shared/enums/operators.enum';
import { PostSearchMongoDBData } from '../school-finder.model';
import { SchoolPreferencesModel } from '../school-preferences/school-preferences.model';

@Component({
    selector: 'school-finder-match-rate',
    templateUrl: './school-finder-match-rate.component.html'
})

export class SchoolFinderMatchRateComponent extends Base {
    @Input() configKey: string;
    saveKey: string = "programMatch";
    configObject: any;
    matchData: SchoolFinderMatchRateModel[];
    metaData: any;
    totalItems: number;
    page: number;
    pageNumber: number = 1;
    sessionCurrentPage: string = "";
    savedProgramList: SaveModel[];
    rows: number;
    postSearchData: PostSearchMongoDBData;
    resultSet: SchoolFinderMatchRateModel[];
    mongoDBPostDataCount: number = 20;
    private preferences: SchoolPreferencesModel;
    private key: string = "SchoolFinder";

    constructor(private schoolFinderMatchRateService: SchoolFinderMatchRateService, private siteCoreConfig: SiteCoreConfig,
        private dataService: DataService, private schoolFinderMatchRateConfig: SchoolFinderMatchRateConfig) {
        super();
        this.resultSet = <SchoolFinderMatchRateModel[]>[];

    }

    ngOnInit(): void {
        this.isLoading = true;
        this.sessionCurrentPage = sessionStorage.getItem("pageNumber");
        this.dataService.itemAdded$.subscribe(item => {
            this.getData(item);
        });

        if (this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.isAuthenticated) {
            // to get saved programs.
            let config = this.schoolFinderMatchRateConfig.getConfiguration("savedPrograms");
            config["identityId"] = this.siteCoreConfig.currentAccount.identityID;
            this.schoolFinderMatchRateService.getSavedPrograms(config).subscribe(response => {
                this.savedProgramList = response;
            });
        }
        let preferencesString = sessionStorage.getItem(this.key);
        if (preferencesString) {
            this.preferences = <SchoolPreferencesModel>JSON.parse(preferencesString);
        }

        let items: {} = this.dataService.getData();
        items[this.key] = this.preferences;
        this.getData(items);
    }

    getConfigObjectKey(config: any, key: string = ""): string {
        if (config) {
            let strConfig: string;
            if (key === "geolocation") {
                return OperatorsEnum.Equal + " " + config;
            } else if (key === "programCountryName" || key === "programStateName" || key === "programCityName") {
                return OperatorsEnum.Equal + ' "' + config + '"';
            } else {
                if (typeof (config) === "object") {
                    strConfig = config.map(i => ((Number(i.value)) ? i.value : '"' + i.value + '"')).join(",");
                } else {
                    strConfig = (Number(config)) === 0 ? "" : config;
                }
                if (strConfig) {
                    return (strConfig.indexOf(",") > -1 ? OperatorsEnum.In : OperatorsEnum.Equal) + " " + strConfig;
                }
            }
        } else
            return "";
    }

    getFilters(): void {
        this.configObject = <ConfigModel>this.schoolFinderMatchRateConfig.getConfiguration("schoolFinder");
        this.rows = this.configObject.pageSize;
        let currentPage = parseInt(this.sessionCurrentPage);
        this.pageNumber = isNaN(currentPage) ? 1 : currentPage;
        this.configObject.page = this.pageNumber;
        sessionStorage.setItem("pageNumber", this.pageNumber.toString());
        this.sessionCurrentPage = "";
    }

    getProgramMatchesData(): void {
        this.isLoading = true;
        this.schoolFinderMatchRateService.getData(this.configObject).subscribe(response => {
            this.matchData = response.matchData;
            if (this.postSearchData && this.matchData) {
                let getRecord = this.getMatchRateData(this.matchData);
                let postMongoDb = this.postMongoDbData(this.postSearchData, getRecord);
                this.schoolFinderMatchRateService.postSFAnalyticsData(this.siteCoreConfig.sfAnalyticsUrl, postMongoDb).subscribe(response => { });
            }
            this.metaData = response.metaData;
            this.totalItems = response.totalRows;
            this.pageNumber = response.page;
            window.scrollTo(0, 0);
            this.isLoading = false;
            if (this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.identityID)
                this.saveSfActivity();

        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }

    refreshPaging(currentPage: number): void {
        sessionStorage.setItem("pageNumber", currentPage.toString());
        //this.pageNumber = currentPage;
        this.configObject.page = currentPage;
        this.getProgramMatchesData();
    }


    postMongoDbData(postSearchData, matchData) {

        let matchRateData = new PostSearchMongoDBData();
        if (this.siteCoreConfig.currentAccount) {
            matchRateData.identityId = this.siteCoreConfig.currentAccount.identityID;
            matchRateData.userName = this.siteCoreConfig.currentAccount.firstName + ' ' + this.siteCoreConfig.currentAccount.lastName;
        }
        matchRateData.date = new Date();
        matchRateData.keyword = postSearchData.keyword;
        matchRateData.selectedItem = postSearchData.selectedItem;
        matchRateData.records = JSON.stringify(matchData);

        return matchRateData;

    }

    getMatchRateData(matchRateData): SchoolFinderMatchRateModel[] {
        this.resultSet = <SchoolFinderMatchRateModel[]>[];
        let i = 0;
        for (let item of matchRateData) {
            if (i < this.mongoDBPostDataCount) {
                let data = new SchoolFinderMatchRateModel();
                data.programDisplayName = item.programDisplayName;
                data.programSchoolName = item.programSchoolName;
                this.resultSet.push(data);
                i++;
            }
        }
        return this.resultSet;

    }

    private saveSfActivity(): void {
        let activityConfig = this.schoolFinderMatchRateConfig.getConfiguration("sfActivity");
        activityConfig.post["programID"] = this.matchData.map(i => i.programId).join(",");
        activityConfig.post["identityID"] = this.siteCoreConfig.currentAccount.identityID;
        this.schoolFinderMatchRateService.postActivity(activityConfig.post).subscribe();
    }

    private getData(item: any): void {
        this.getFilters();
        // clear config object
        for (let key of this.configObject.queries) {
            this.configObject[key] = "";
        }

        // build query for profile information
        let profile = item.FromProfile;
        for (let key in profile) {
            this.configObject[key] = this.getConfigObjectKey(profile[key], key);
        }
        let isDesiredCountryUS = false;
        // build query for school preferences
        let preferences = item.SchoolFinder;
        for (let key in preferences) {
            if (key === "desiredLocation") {
                if (preferences[key] && preferences[key].length > 0) {
                    this.configObject["geolocation"] = "";
                    this.configObject[key] = preferences[key][0].id ? OperatorsEnum.Equal + " " + preferences[key][0].id : "";
                    let locationSearch = preferences[key][0].value;
                    isDesiredCountryUS = locationSearch && locationSearch.toLowerCase().indexOf("united state") > -1;
                    if (!isDesiredCountryUS) {
                        let locationArray = locationSearch.split(',');
                        if (locationArray && locationArray.length === 3) {
                            this.configObject["programCountryName"] = '"' + locationArray[2].trim() + '"';
                            this.configObject["programStateName"] = '"' + locationArray[1].trim() + '"';
                            this.configObject["programCityName"] = '"' + locationArray[0].trim() + '"';
                        }
                    }
                }
            } else
                this.configObject[key] = this.getConfigObjectKey(preferences[key], key);
        }

        //build filter for jump to school   

        if (item.JumpToSchool && item.JumpToSchool[0] && item.JumpToSchool[0].length > 0) {
            this.configObject["programSchoolId"] = OperatorsEnum.In + " " + item.JumpToSchool[0].map(i => i.id).join(",");
            this.postSearchData = <PostSearchMongoDBData>{};
            this.postSearchData.selectedItem = item.JumpToSchool[0].map(i => i.value).join(",");
            this.postSearchData.keyword = item.JumpToSchool[1];
        } else {
            this.configObject["programSchoolId"] = "";
        }

        if ((this.configObject["desiredLocation"] && this.configObject["desiredLocation"].length > 0 && isDesiredCountryUS) || (this.configObject["geolocation"] && this.configObject["geolocation"].length > 0)) {
            this.configObject["programCountryName"] = "";
            this.configObject["programStateName"] = "";
            this.configObject["programCityName"] = "";
        }
        this.getProgramMatchesData();
    }
}
