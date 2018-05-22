import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PracticeQuestionComponent } from "./practice-question.component";
import { CookieModule } from 'ngx-cookie';
import { MainModule } from "../shared/modules/main.module";
import { PracticeQuestiontService } from "./practice-question.service";
import { HttpModule } from '@angular/http';
import { HttpService } from "../shared/services/http.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { BaseService } from "../shared/services/base.service";
import { PracticeQuestionConfig } from "./practice-question.config";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { SafeHtmlPipe } from '../shared/pipes/safe-html';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, MainModule, HttpModule, CookieModule.forRoot(), FormsModule, ReactiveFormsModule],
    declarations: [PracticeQuestionComponent, SafeHtmlPipe],
    providers: [PracticeQuestiontService, HttpService, UrlBuilderService, BaseService, PracticeQuestionConfig, SiteCoreConfig],
    bootstrap: [PracticeQuestionComponent]
})

export class PracticeQuestionModule { }