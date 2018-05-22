import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EventSearchComponent } from "./event-search.component";
import { EventSearchResultComponent } from "./event-search-result/event-search-result.component";
import { HttpService } from "../shared/services/http.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { EventSearchResultConfig } from "./event-search-result/event-search-result.config";
import { SaveComponent } from "../shared/components/save/save.component";
import { SaveService } from "../shared/components/save/save.service";
import { SaveConfig } from "../shared/components/save/save.config";
import { EventSearchLeftComponent } from "./event-search-left-sidebar/event-search-left.component";
import { ViewSavedComponent } from "../shared/components/ViewSaved/viewsaved.component";
import { TruncatePipe } from "../shared/pipes/truncate";
import { MapModule } from "../shared/modules/map/map.module";
import { DataService } from "../shared/services/share-data.service";
import { BaseService } from "../shared/services/base.service";
import { EventSearchResultService } from "./event-search-result/event-search-result.service";
import { PagerComponent } from "../shared/components/pager/pager.component";
import { PagerService } from "../shared/components/pager/pager.service";
import { AddressDirective } from "../shared/directives/address.directive";
import { CookieModule } from 'ngx-cookie';
import { MainModule } from "../shared/modules/main.module";
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { SafeHtmlPipe } from '../shared/pipes/safe-html';
import { MyDatePickerModule } from 'mydatepicker';
import { MultiselectDropdownComponent } from '../shared/components/multiselect-dropdown/multiselect-dropdown.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MultiSelectDropdownService } from '../shared/components/multiselect-dropdown/multiselect-dropdown.service';
import { MultiSelectDropdownConfig } from '../shared/components/multiselect-dropdown/multiselect-dropdown.config';
import { AboutTextComponent } from '../shared/components/about-text/about-text.component';

@NgModule({
    imports: [InfiniteScrollModule, BrowserModule, HttpModule, FormsModule, MapModule, MainModule, CookieModule.forRoot(), MyDatePickerModule],
    declarations: [AboutTextComponent, MultiselectDropdownComponent, EventSearchComponent, EventSearchResultComponent, AddressDirective, SaveComponent, TruncatePipe, SafeHtmlPipe, EventSearchLeftComponent, PagerComponent, ViewSavedComponent],
    providers: [MultiSelectDropdownConfig, MultiSelectDropdownService, EventSearchResultService, HttpService, UrlBuilderService, BaseService, EventSearchResultConfig, SaveConfig, SaveService, DataService, PagerService, SiteCoreConfig],
    bootstrap: [EventSearchComponent]
})

export class EventSearchPageModule { }