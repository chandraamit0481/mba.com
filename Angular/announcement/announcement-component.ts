import { Component, OnInit } from "@angular/core";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { Base } from "../shared/models/common.models";
@Component({
    selector: "announcement",
    templateUrl: './announcement-component.html'
})

export class AnnouncementComponent extends Base implements OnInit {
    configKey: string = "announcement";
    redirectTo: string;

    constructor(private siteCoreConfig: SiteCoreConfig) {
        super();
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.redirectTo = this.siteCoreConfig.candidateProfileUrl;     
    }

}
