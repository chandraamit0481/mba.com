import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from "../../../shared/services/http.service";
import { UrlBuilderService } from "../../../shared/services/url-builder.service";
import { MainModule } from "../../../shared/modules/main.module";
import { ScoreReportService } from './score-report.service';
import { ScoreReportComponent } from './score-report.compnent';
import { ScoreReportConfig } from './score-report.config';

@NgModule({
    imports: [BrowserModule, MainModule],
    declarations: [ScoreReportComponent],
    providers: [HttpService, UrlBuilderService, ScoreReportService, ScoreReportConfig ],
    exports: [ScoreReportComponent]
})

export class ScoreReportModule { }