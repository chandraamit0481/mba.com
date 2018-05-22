import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MainModule } from '../shared/modules/main.module';
import { HttpModule } from "@angular/http";
import { IRPrepSigninComponent } from './ir-prep-signin.compnent';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { HttpService } from '../shared/services/http.service';
import { UrlBuilderService } from '../shared/services/url-builder.service';
import { IRPrepSigninService } from './ir-prep-signin.service';import { IRPrepSignInConfig } from './ir-prep-signin.config';
import { CookieModule } from 'ngx-cookie'; 

@NgModule({
    imports: [FormsModule, BrowserModule, MainModule, HttpModule, CookieModule.forRoot()],
    declarations: [IRPrepSigninComponent],
    providers: [HttpService, UrlBuilderService, SiteCoreConfig, IRPrepSigninService, IRPrepSignInConfig],
    bootstrap: [IRPrepSigninComponent]
})

export class IRPrepSigninModule { }