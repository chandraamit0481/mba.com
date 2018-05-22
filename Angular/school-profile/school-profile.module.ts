import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpService } from "../shared/services/http.service";
import { SchoolProfileComponent } from "./school-profile.component";
import { SchoolProfileService } from "./school-profile.service";
import { ArticleItemsService } from "../shared/components/article-items-list/article-items.service";
import { ArticleItemsComponent } from "../shared/components/article-items-list/article-items.component";
import { DataService } from "../shared/services/share-data.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { SchoolHeaderComponent } from "./school-profile-header/school-profile-header.component";
import { NotificationMessageComponent } from "./notification/notification.component";
import { SchoolProfileConfig } from "./school-profile.config";
import { ProgramsListComponent } from "./programs-list/programs-list.component";
import { ProgramsListService } from "./programs-list/programs-list.service";
import { BaseService } from "../shared/services/base.service";
import { ProgramsListConfig } from "./programs-list/programs-list.config";
import { EventListComponent } from "../shared/components/event-list/event-list.component";
import { EventListService } from "../shared/components/event-list/event-list.service";
import { TruncatePipe } from "../shared/pipes/truncate";
import { EventListConfig } from "../shared/components/event-list/event-list.config";
import { VideoListComponent } from "../shared/components/video-list/video-list.component";
import { LinksFilterPipe } from "../shared/components/video-list/video-list.filter";
import { SocialMediaIcon } from "../shared/components/social-media-icon/social-media-icon.component";
import { SaveComponent } from "../shared/components/save/save.component";
import { SaveService } from "../shared/components/save/save.service";
import { SaveConfig } from "../shared/components/save/save.config";
import { PagerComponent } from "../shared/components/pager/pager.component";
import { PagerService } from "../shared/components/pager/pager.service";
import { CookieModule } from 'ngx-cookie';
import { MainModule } from "../shared/modules/main.module";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { AddressDirective } from '../shared/directives/address.directive';
import { ProfileService } from '../shared/services/profile.service';
@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, CookieModule.forRoot(), MainModule],
    declarations: [SchoolProfileComponent, ArticleItemsComponent, SchoolHeaderComponent, AddressDirective, PagerComponent, NotificationMessageComponent, ProgramsListComponent, EventListComponent, SaveComponent, TruncatePipe, VideoListComponent, LinksFilterPipe, SocialMediaIcon],
    providers: [SchoolProfileService, HttpService, BaseService, ArticleItemsService, PagerService, DataService, UrlBuilderService, ProgramsListService, SchoolProfileConfig, ProgramsListConfig, EventListService, EventListConfig, SaveService, SaveConfig, SiteCoreConfig, ProfileService],
    bootstrap: [SchoolProfileComponent]
})

export class SchoolProfileModule { }