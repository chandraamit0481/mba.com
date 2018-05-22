import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ProgramProfileComponent } from "./program-profile.component";
import { ProgramProfileService } from "./program-profile.service";
import { ImportantDates } from "./important-dates/important-dates.component";
import { HttpService } from "../shared/services/http.service";
import { ArticleItemsComponent } from "../shared/components/article-items-list/article-items.component";
import { ArticleItemsService } from "../shared/components/article-items-list/article-items.service";
import { DataService } from "../shared/services/share-data.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { ProgramDescriptionComponent } from "./program-description/program-description.component";
import { OverviewComponent } from "./program-overview/overview.component";
import { SortPipe } from "../shared/pipes/sort";
import { VideoListComponent } from "../shared/components/video-list/video-list.component";
import { LinksFilterPipe } from "../shared/components/video-list/video-list.filter";
import { SocialMediaIcon } from "../shared/components/social-media-icon/social-media-icon.component";
import { MapModule } from "../shared/modules/map/map.module";
import { BaseService } from "../shared/services/base.service";
import { ProgramProfileConfig } from "./program-profile.config";
import { EventListComponent } from "../shared/components/event-list/event-list.component";
import { EventListService } from "../shared/components/event-list/event-list.service";
import { SaveComponent } from "../shared/components/save/save.component";
import { TruncatePipe } from "../shared/pipes/truncate";
import { EventListConfig } from "../shared/components/event-list/event-list.config";
import { SaveService } from "../shared/components/save/save.service";
import { SaveConfig } from "../shared/components/save/save.config";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { PagerService } from "../shared/components/pager/pager.service";
import { PagerComponent } from "../shared/components/pager/pager.component";
import { MainModule } from "../shared/modules/main.module";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { AddressDirective } from '../shared/directives/address.directive';
import { ProfileService } from '../shared/services/profile.service';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, MapModule, CookieModule.forRoot(), MainModule],
    declarations: [ProgramProfileComponent, ArticleItemsComponent, ImportantDates, HeaderComponent, OverviewComponent, ProgramDescriptionComponent, PagerComponent, SortPipe, VideoListComponent, LinksFilterPipe, SocialMediaIcon, EventListComponent, SaveComponent, TruncatePipe, AddressDirective],
    providers: [ProgramProfileService, SaveService, SaveConfig, ProfileService, HttpService, BaseService, ArticleItemsService, ProgramProfileConfig, PagerService, UrlBuilderService, DataService, EventListService, EventListConfig, SiteCoreConfig],
    bootstrap: [ProgramProfileComponent]
})

export class ProgramProfileModule { }