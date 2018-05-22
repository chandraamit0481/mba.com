import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { CandidateProfileComponent } from "./candidate-profile.compnent";
import { ProfileDashboardModule } from "./profile-dashboard/profile-dashboard.module";
import { RouterModule } from "@angular/router";
import { candidateRoutes } from "./candidate-profile.routes";
import { AssessmentsComponent } from "./profile-assessments/assessments.compnent";
import { IndicatorDirective } from "./indicator.directive";
import { CookieModule } from 'ngx-cookie';
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { MainModule } from '../shared/modules/main.module';
import { CandidateProfileService } from './candidate-profile.service';
import { CandidateProfileConfig } from './candidate-profile.config';

@NgModule({
    imports: [BrowserModule, HttpModule, ProfileDashboardModule, MainModule, RouterModule.forRoot(candidateRoutes), CookieModule.forRoot()],
    declarations: [CandidateProfileComponent, IndicatorDirective],
    providers: [SiteCoreConfig, CandidateProfileService, CandidateProfileConfig],
    bootstrap: [CandidateProfileComponent]
})

export class CandidateProfileModule { }