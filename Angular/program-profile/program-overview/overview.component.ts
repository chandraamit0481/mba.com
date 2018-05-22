import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ProgramOverviewDataModel } from "./overview.model";

@Component({
    selector: 'program-overview',
    templateUrl: './overview.component.html',
})

export class OverviewComponent implements OnInit {

    @Input() programOverview: any;
    programOverviewData: any;
    tutionData: any[] = [];

    constructor() { }

    ngOnInit(): void {
        if (this.programOverview) {
            this.programOverviewData = this.programOverview;
            this.tutionData.push(this.programOverviewData.programFinancialAidAvailable);
            this.tutionData.push(this.programOverviewData.programFullyFunded);
            this.tutionData = this.removeEmptyValues(this.tutionData);
        }

    }

    private removeEmptyValues(tutionData: any[]): string[] {

        function isEmpty(x) {
            return x.length !== 0;
        }

        return this.tutionData.filter(isEmpty);
    }

}