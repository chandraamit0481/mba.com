import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ArticleSaveComponent } from "./article-save.component";
import { CookieModule } from 'ngx-cookie';
import { MainModule } from "../shared/modules/main.module";
import { SaveComponent } from "../shared/components/save/save.component";
import { SaveService } from "../shared/components/save/save.service";
import { HttpModule } from '@angular/http';
import { HttpService } from "../shared/services/http.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { BaseService } from "../shared/services/base.service";
import { SaveConfig } from "../shared/components/save/save.config";
import { SiteCoreConfig } from "../shared/config/sitecore.config";

@NgModule({
    imports: [BrowserModule, MainModule, HttpModule, CookieModule.forRoot()],
    declarations: [ArticleSaveComponent, SaveComponent],
    providers: [SaveService, HttpService, UrlBuilderService, BaseService, SaveConfig, SiteCoreConfig],
    bootstrap: [ArticleSaveComponent]
})

export class ArticleSaveModule { }