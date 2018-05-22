import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AnnouncementComponent } from "./announcement-component";
import { HttpService } from "../shared/services/http.service";
import { ArticleItemsService } from "../shared/components/article-items-list/article-items.service";
import { ArticleItemsComponent } from "../shared/components/article-items-list/article-items.component";
import { PagerService } from "../shared/services/pager.service";
import { DataService } from "../shared/services/share-data.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { CookieModule } from 'ngx-cookie';
import { MainModule } from "../shared/modules/main.module";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { PagerComponent } from '../shared/components/pager/pager.component';
import { FormsModule } from '@angular/forms';
import { ViewSavedComponent } from '../shared/components/ViewSaved/viewsaved.component';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, MainModule, CookieModule.forRoot()],
    declarations: [AnnouncementComponent, ArticleItemsComponent, PagerComponent, ViewSavedComponent],
    providers: [ArticleItemsService, HttpService, PagerService, DataService, UrlBuilderService, SiteCoreConfig],
    bootstrap: [AnnouncementComponent]
})

export class AnnouncementModule { }
