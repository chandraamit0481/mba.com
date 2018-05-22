import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ArticleLandingComponent } from "./article-landing.component";
import { PrimaryFeaturedArticlesComponent } from "./primary-featured-articles/primary-featured-articles.component";
import { SecondaryFeaturedArticlesComponent } from "./secondary-featured-articles/secondary-featured-articles.component";
import { ArticleBottomComponent } from "./article-bottom/article-bottom.component";
import { ViewSavedComponent } from "../shared/components/ViewSaved/viewsaved.component";
import { FeaturedArticleService } from "./primary-featured-articles/primary-featured-articles.service";
import { ArticleBottomService } from "./article-bottom/article-bottom.service";
import { TruncatePipe } from "../shared/pipes/truncate";
import { ArticleItemsService } from "../shared/components/article-items-list/article-items.service";
import { HttpService } from "../shared/services/http.service";
import { ArticleItemsComponent } from "../shared/components/article-items-list/article-items.component";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { DataService } from "../shared/services/share-data.service";
import { ArticleLandingConfig } from "./article-landing.config";
import { PagerComponent } from "../shared/components/pager/pager.component";
import { PagerService } from "../shared/components/pager/pager.service";
import { CookieModule } from 'ngx-cookie';
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { MainModule } from "../shared/modules/main.module";
import { SafeHtmlPipe } from '../shared/pipes/safe-html';
import { ArticleListConfig } from '../shared/components/article-items-list/article-items.config';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, MainModule, CookieModule.forRoot()],
    declarations: [ArticleLandingComponent, PrimaryFeaturedArticlesComponent, SecondaryFeaturedArticlesComponent, ArticleItemsComponent, ArticleBottomComponent, SafeHtmlPipe, TruncatePipe, PagerComponent, ViewSavedComponent],
    providers: [FeaturedArticleService, ArticleItemsService, ArticleBottomService, HttpService, PagerService, DataService, UrlBuilderService, ArticleLandingConfig, ArticleListConfig, SiteCoreConfig],
    bootstrap: [ArticleLandingComponent]
})

export class ArticleLandingModule { }