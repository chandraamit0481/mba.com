import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpService } from "../shared/services/http.service";
import { EventDetailComponent } from "./event-detail.component";
import { EventDetailService } from "./event-detail.service";
import { EventHeaderComponent } from "./event-detail-header/event-detail-header.component";
import { EventContentComponent } from "./event-detail-content/event-detail-content.component";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { SocialMediaIcon } from "../shared/components/social-media-icon/social-media-icon.component";
import { SaveComponent } from "../shared/components/save/save.component";
import { SaveService } from "../shared/components/save/save.service";
import { SaveConfig } from "../shared/components/save/save.config";
import { MapModule } from "../shared/modules/map/map.module";
import { BaseService } from "../shared/services/base.service";
import { EventDetailConfig } from "./event-detail.config";
import { CookieModule } from 'ngx-cookie';
import { MainModule } from "../shared/modules/main.module";
import { RelatedContentModule } from '../shared/components/related-content/related-content.module';
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { SafeHtmlPipe } from '../shared/pipes/safe-html';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, MapModule, CookieModule.forRoot(), MainModule, RelatedContentModule],
    declarations: [EventDetailComponent, EventHeaderComponent, SaveComponent, SafeHtmlPipe, EventContentComponent, SocialMediaIcon],
    providers: [HttpService, EventDetailConfig, EventDetailService, UrlBuilderService, SaveService, SaveConfig, BaseService, SiteCoreConfig],
    bootstrap: [EventDetailComponent]
})

export class EventDetailModule { }