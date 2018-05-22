import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";

@Component({
    selector: 'important-dates',
    templateUrl: './important-dates.component.html'
})

export class ImportantDates {
    @Input() programImportantDates: any[];
    @Input() programRollingAdmissions: boolean;
    notificationMessage: string;
    constructor(private siteCoreConfig: SiteCoreConfig) {
        this.notificationMessage = this.siteCoreConfig.programRollingAdmissionsText;        
    }
}