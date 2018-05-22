import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AssessmentsComponent } from "./assessments.compnent";
import { AssessmentsService } from "./assessments.service";
import { HttpService } from "../../shared/services/http.service";
import { ExamsComponent } from "./exams/exams.component";
import { UrlBuilderService } from "../../shared/services/url-builder.service";
import { AssessmentsConfig } from "./assessments.config";
import { RouterModule } from "@angular/router";
import { MainModule } from "../../shared/modules/main.module";
import { ExamsService } from './exams/exams.service';
import { ExamsConfig } from './exams/exams.config';
import { ScoreReportModule } from './score-report/score-report.module';
import { ApplyESRComponent } from './exams/apply-esr/apply-esr.compnent';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../shared/services/share-data.service';
@NgModule({
    imports: [BrowserModule, RouterModule, MainModule, ScoreReportModule, FormsModule],
    declarations: [AssessmentsComponent, ExamsComponent, ApplyESRComponent],
    providers: [AssessmentsService, HttpService, ExamsService, UrlBuilderService, AssessmentsConfig, ExamsConfig, DataService],
    exports: [AssessmentsComponent]
})

export class AssessmentsModule { }