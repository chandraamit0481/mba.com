import { Component, OnInit } from "@angular/core";
import { EventSearchResultService } from "./event-search-result.service";
import { EventSearchDataModel } from "./event-seacrh-result.model";
import { ConfigModel, SaveModel } from "../../shared/models/common.models";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { EventSearchResultConfig } from "./event-search-result.config";
import { TruncatePipe } from "../../shared/pipes/truncate";
import { SafeHtmlPipe } from "../../shared/pipes/safe-html";
import { DateFormatPipe } from "../../shared/pipes/date-format";
import { DataService } from "../../shared/services/share-data.service";
import { Base } from "../../shared/models/common.models";
import { BaseService } from "../../shared/services/base.service";

@Component({
    selector: 'event-search-result',
    templateUrl: './event-search-result.component.html',
})

export class EventSearchResultComponent extends Base implements OnInit {
    eventResult: EventSearchDataModel[];
    savedEventList: SaveModel[];
    saveKey = "eventDetail";
    totalItems: number;
    rows: number;
    showMessage: boolean;
    notificationMessage: string = "";
    pageNumber: number = 1;
    private defaultPageNumber: number = 1;
    private sessionCurrentPage: string = "";
    private configObject: any;
    private pageKey: string = "eventPageNumber";
    private allEvents = {
        "data": [{ "searchResults": [] }], "envelope": { "totalRows": 0 }
    };

    constructor(private eventSearchResultService: EventSearchResultService, private siteCoreConfig: SiteCoreConfig, private dataService: DataService, private baseService: BaseService, private eventSearchResultConfig: EventSearchResultConfig) {
        super();
        this.sessionCurrentPage = sessionStorage.getItem(this.pageKey);
        this.dataService.itemAdded$.subscribe(item => {
            if (!this.sessionCurrentPage)
                sessionStorage.setItem(this.pageKey, this.defaultPageNumber.toString());
            this.configObject = new EventSearchResultConfig();
            this.configObject = <ConfigModel>this.eventSearchResultConfig.getConfiguration("eventSearch");
            if (this.configObject) {
                this.setConfigToBlank(this.configObject.filters);
                this.setConfigToBlank(this.configObject.queries);
            }

            let profile = item.EventSearch;
            for (let key in profile) {
                this.configObject[key] = "";
                if (profile[key]) {
                    this.configObject[key] = (key === "eventSearchText" ? profile[key].replace(/[&\/\\#;=<>|^$~%'?{}]/g, '') : profile[key]);
                }
            }
            if (this.checkIsOnlineBlank())
                this.configObject.page = this.sessionCurrentPage ? parseInt(this.sessionCurrentPage) : this.defaultPageNumber;
            else
                this.configObject.page = this.defaultPageNumber;
            this.rows = this.configObject.pageSize;
            this.getEventMatchesData();
        });
    }

    ngOnInit(): void {
        let config = this.eventSearchResultConfig.getConfiguration("savedEvents");
        config["identityId"] = this.siteCoreConfig.currentAccount.identityID;
        if (this.siteCoreConfig.currentAccount.isAuthenticated) {
            this.eventSearchResultService.getSavedEvents(config).subscribe(response => {
                this.savedEventList = response;
            });
        }
    }

    private setConfigToBlank(config: any): void {
        if (config) {
            for (let key of config) {
                this.configObject[key] = "";
            }
        }
    }

    private checkIsOnlineBlank(): boolean {
        return this.configObject.eventIsOnline || this.configObject.eventIsOnline === false;
    }

    private getEventMatchesData(): void {
        this.isLoading = true;
        this.eventSearchResultService.getAll(this.configObject).subscribe(response => {
            this.notificationMessage = "";
            this.allEvents = response;

            if (this.baseService.hasResults(response)) {
                if (this.checkIsOnlineBlank()) {
                    this.eventResult = response.data[0].searchResults;
                    this.pageNumber = this.configObject.page || this.defaultPageNumber;
                } else {
                    this.pageNumber = this.sessionCurrentPage ? parseInt(this.sessionCurrentPage) : this.defaultPageNumber;
                    this.sliceEventsData(this.pageNumber, response);
                }
            } else {
                this.eventResult = [];
                this.notificationMessage = this.siteCoreConfig.notificationMessage ? this.siteCoreConfig.notificationMessage : this.configObject.errorMessage;
            }
            this.sessionCurrentPage = "";
            if (response && response.envelope) {
                this.totalItems = response.envelope.totalRows;
            } else {
                this.totalItems = 0;
            }
            this.isLoading = false;
            window.scroll(0, 0);
        },
            err => {
                this.isLoading = false;
                this.errored = true;

            }
        );
    }

    private refreshPaging(currentPage: number): void {
        this.pageNumber = currentPage;
        sessionStorage.setItem(this.pageKey, currentPage.toString());
        if (this.configObject && this.configObject.eventIsOnline === "" && this.baseService.hasResults(this.allEvents)) {
            this.sliceEventsData(currentPage, this.allEvents);
        } else {
            this.configObject.page = currentPage;
            this.getEventMatchesData();
        }
    }

    private sliceEventsData(currentPage: number, response: any): void {
        let pageCal = this.configObject.pageSize * currentPage;
        this.eventResult = response.data[0].searchResults.slice(pageCal - this.configObject.pageSize, pageCal);
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
}