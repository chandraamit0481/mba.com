import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpService } from "../shared/services/http.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { HomeComponent } from "./home.component";
import { PrimaryFeaturedArticlesComponent } from "../article-landing/primary-featured-articles/primary-featured-articles.component";
import { DataService } from "../shared/services/share-data.service";
import { FeaturedArticleService } from "../article-landing/primary-featured-articles/primary-featured-articles.service";
import { ArticleLandingConfig } from "../article-landing/article-landing.config";
import { SecondaryFeaturedArticlesComponent } from "../article-landing/secondary-featured-articles/secondary-featured-articles.component";
import { TruncatePipe } from "../shared/pipes/truncate";
import { BottomColumnComponent } from "./bottom-column/bottom-column.component";
import { BottomColumnService } from "./bottom-column/bottom-column.service";
import { BottomColumnConfig } from "./bottom-column/bottom-column.config";
import { BaseService } from "../shared/services/base.service";
import { AddressDirective } from "../shared/directives/address.directive";
import { CookieModule } from "ngx-cookie";
import { MainModule } from "../shared/modules/main.module";
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { SafeHtmlPipe } from '../shared/pipes/safe-html';
import { CapitalizePipe } from '../shared/pipes/capitalize';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, CookieModule.forRoot(), MainModule],
    declarations: [HomeComponent, BottomColumnComponent, PrimaryFeaturedArticlesComponent, CapitalizePipe, SecondaryFeaturedArticlesComponent, SafeHtmlPipe, TruncatePipe, AddressDirective],
    providers: [HttpService, UrlBuilderService, FeaturedArticleService, DataService, ArticleLandingConfig, BottomColumnService, BottomColumnConfig, BaseService, SiteCoreConfig],
    bootstrap: [HomeComponent]
})

export class HomeModule { }