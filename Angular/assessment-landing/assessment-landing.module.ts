import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { HttpService } from "../shared/services/http.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { BaseService } from "../shared/services/base.service";
import { CookieModule } from 'ngx-cookie';
import { AssessmentLandingComponent } from "./assessment-landing.component";
import { AssessmentsComponent } from "./assessments/assessments.component";
import { RelatedContentModule } from '../shared/components/related-content/related-content.module';

@NgModule({
    imports: [BrowserModule, HttpModule, CookieModule.forRoot(), RelatedContentModule],
    declarations: [AssessmentsComponent, AssessmentLandingComponent],
    providers: [BaseService, HttpService, UrlBuilderService],
    bootstrap: [AssessmentLandingComponent]

})

export class AssessmentLandingModule { }