import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";
import { ProfileDashboardComponent } from "./profile-dashboard.component";
import { UrlBuilderService } from "../../shared/services/url-builder.service";
import { AssessmentsModule } from "../profile-assessments/assessments.module";
import { ProgramsModule } from "../profile-programs/programs.module";
import { ProfileProductModule } from "../profile-products/profile-products.module";
import { AccommodationComponent } from "./accommodation/accommodation-component";
import { AccommodationService } from "./accommodation/accommodation.service";
import { AccommodationConfig } from "./accommodation/accommodation.config";
import { EventsModule } from "../profile-events/events.module";
import { SavedArticleComponent } from "../saved-article/saved-article.component";
import { SavedArticleService } from "../saved-article/saved-article.service";
import { SavedArticleModule } from "../saved-article/saved-article.module";
import { SavedArticleConfig } from "../saved-article/saved-article.config";

import { RouterModule } from '@angular/router';
import { MainModule } from "../../shared/modules/main.module";

@NgModule({
    imports: [BrowserModule, AssessmentsModule, ProgramsModule, EventsModule, SavedArticleModule, ProfileProductModule, RouterModule, MainModule],
    declarations: [ProfileDashboardComponent, AccommodationComponent],
    providers: [HttpService, UrlBuilderService, SavedArticleService, SavedArticleConfig, AccommodationService, AccommodationConfig ],
    exports: [ProfileDashboardComponent]
})

export class ProfileDashboardModule { }
