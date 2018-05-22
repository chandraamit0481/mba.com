import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RelatedTopicComponent } from "./related-topic.component";
import { RelatedTopicService } from "./related-topic.service";
import { RelatedTopicConfig } from "./related-topic.config";
import { CookieModule } from 'ngx-cookie';
import { HttpService } from "../../services/http.service";
import { UrlBuilderService } from "../../services/url-builder.service";
import { BaseService } from "../../services/base.service";
import { MainModule } from '../../modules/main.module';
import { SiteCoreConfig } from '../../config/sitecore.config';

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        HttpModule,
        CookieModule.forRoot(), MainModule],
    declarations: [RelatedTopicComponent],
    providers: [RelatedTopicService, HttpService, UrlBuilderService, RelatedTopicConfig, BaseService, SiteCoreConfig],
    exports: [RelatedTopicComponent],
    bootstrap: [RelatedTopicComponent]
})

export class RelatedTopicModule { }