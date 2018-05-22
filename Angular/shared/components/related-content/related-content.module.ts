import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RelatedContentComponent } from "./related-content.component";
import { RelatedContentService } from "./related-content.service";
import { RelatedContentConfig } from "./related-content.config";
import { CookieModule } from 'ngx-cookie';
import { HttpService } from "../../services/http.service";
import { UrlBuilderService } from "../../services/url-builder.service";
import { MainModule } from '../../modules/main.module';
import { SiteCoreConfig } from '../../config/sitecore.config';
import { BaseService } from '../../services/base.service';
import { CurrencyFormatPipe } from '../../pipes/currency';
import { NoProductAvailableComponent } from '../no-product-available/no-product-available.component';
import { CurrencyPipe } from '@angular/common';

@NgModule({
    imports: [BrowserModule, HttpModule, CookieModule.forRoot(), MainModule],
    declarations: [RelatedContentComponent, CurrencyFormatPipe, NoProductAvailableComponent],
    providers: [RelatedContentService, HttpService, UrlBuilderService, RelatedContentConfig, SiteCoreConfig, BaseService, CurrencyPipe],
    exports: [RelatedContentComponent],
    bootstrap: [RelatedContentComponent]
})

export class RelatedContentModule { }