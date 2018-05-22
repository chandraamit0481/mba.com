import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainModule } from '../shared/modules/main.module';
import { HttpModule } from "@angular/http";
import { CookieModule } from 'ngx-cookie';
import { HttpService } from '../shared/services/http.service';
import { SegmentationComponent } from './segmentation.compnent';
import { UrlBuilderService } from '../shared/services/url-builder.service';
import { SegmentationConfig } from './segmentation.config';
import { SegmentationService } from './segmentation.service';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { SegmentationQuestionComponent } from './segmentation-question/segmentation-question.compnent';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../shared/pipes/safe-html';
 

@NgModule({
    imports: [BrowserModule, MainModule, HttpModule, CookieModule.forRoot(), ReactiveFormsModule],
    declarations: [SegmentationComponent, SegmentationQuestionComponent, SafeHtmlPipe],
    providers: [HttpService, UrlBuilderService, SegmentationConfig, SegmentationService, SiteCoreConfig],
    bootstrap: [SegmentationComponent]
})
export class SegmentationModule { }