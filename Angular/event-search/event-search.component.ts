import { Component, OnInit } from '@angular/core';
import { SiteCoreConfig } from "../shared/config/sitecore.config";

@Component({
    selector: 'event-search',
    templateUrl: './event-search.component.html'
})

export class EventSearchComponent implements OnInit {
    redirectTo: string;
    title: string = "";

    constructor(private siteCoreConfig: SiteCoreConfig) {
        this.title = this.siteCoreConfig.title;
    }

    ngOnInit(): void {
        this.redirectTo = this.siteCoreConfig.candidateProfileUrl;
    }
}