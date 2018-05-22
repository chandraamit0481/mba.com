import { Component, OnInit, Input } from "@angular/core";
import { SiteCoreConfig } from "../../../shared/config/sitecore.config";
import { Base } from "../../../shared/models/common.models";
import { ScoreReportConfig } from "./score-report.config";
import { ScoreReportService } from "./score-report.service";
import { ScoreReportModel } from "./score-report.models";

@Component({
    selector: "score-report",
    templateUrl: './score-report.component.html'
})

export class ScoreReportComponent extends Base implements OnInit {
    @Input() appointmentId: string;
    model: ScoreReportModel[];
    
    constructor(private sitecoreConfig: SiteCoreConfig, private reportConfig: ScoreReportConfig, private service: ScoreReportService ) {
        super();
    }

    ngOnInit(): void {
        this.getScoreReport();
    }

    private getScoreReport(): void {
        let config = this.reportConfig.getConfiguration("reportConfig");
        config.appointmentID =  this.appointmentId;
        this.isLoading = true;
        this.service.getScoreReport(config).subscribe(response => {
            this.model = response;
            this.isLoading = false;
        }, err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }
}
