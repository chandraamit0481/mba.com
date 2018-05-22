import { Component, OnInit } from "@angular/core";
import { SiteCoreConfig } from "../shared/config/sitecore.config";

@Component({
    selector: "home-page",
    templateUrl: './home.html'
})

export class HomeComponent implements OnInit {
    bottomColumns: any;

    constructor(private siteCoreConfig: SiteCoreConfig) {
    }

    ngOnInit(): void {
        if (this.siteCoreConfig.columnData !== undefined && this.siteCoreConfig.columnData !== "") {
            this.bottomColumns = JSON.parse(this.siteCoreConfig.columnData);
        }
    }
}