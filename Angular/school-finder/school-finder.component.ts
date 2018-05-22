import { Component } from "@angular/core";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { Base } from "../shared/models/common.models";

@Component({
    selector: "school-finder",
    templateUrl: './school-finder.component.html'
})

export class SchoolFinderComponent extends Base {
    configKey: string = "schoolFinder";
    redirectTo: string;
    schoolFinderText: string;
    SFNotificationText: string;
    title: string = "";
    constructor(private siteCoreConfig: SiteCoreConfig) {
        super();
        this.redirectTo = this.siteCoreConfig.candidateProfileUrl;
        this.SFNotificationText = this.siteCoreConfig.SFNotificationText;
        this.title = this.siteCoreConfig.title;
    }
}