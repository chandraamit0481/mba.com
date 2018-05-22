import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownComponent } from "../shared/components/multiselect-dropdown/multiselect-dropdown.component";
import { SchoolPreferencesComponent } from "./school-preferences/school-preferences.component";
import { JumpToSchoolComponent } from "./jump-to-school/jump-to-school.component";
import { ViewSavedComponent } from "../shared/components/ViewSaved/viewsaved.component";
import { DataService } from "../shared/services/share-data.service";
import { SchoolFinderService } from "./school-finder.service";
import { SchoolPreferencesConfig } from "./school-preferences/school-preferences.config";
import { SchoolFinderComponent } from "./school-finder.component";
import { SchoolFinderMatchRateComponent } from "./school-finder-match-rate/school-finder-match-rate.component";
import { HttpService } from "../shared/services/http.service";
import { SchoolFinderMatchRateService } from "./school-finder-match-rate/school-finder-match-rate.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { SchoolFinderMatchRateConfig } from "./school-finder-match-rate/school-finder-match-rate.config";
import { FromYourProfileComponent } from "./from-your-profile/from-your-profile.component";
import { SaveService } from "../shared/components/save/save.service";
import { SaveComponent } from "../shared/components/save/save.component";
import { SaveConfig } from "../shared/components/save/save.config";
import { BaseService } from "../shared/services/base.service";
import { PagerComponent } from "../shared/components/pager/pager.component";
import { PagerService } from "../shared/components/pager/pager.service";
import { CookieModule } from 'ngx-cookie';
import { MainModule } from "../shared/modules/main.module";
import { MultiSelectDropdownService } from '../shared/components/multiselect-dropdown/multiselect-dropdown.service';
import { MultiSelectDropdownConfig } from '../shared/components/multiselect-dropdown/multiselect-dropdown.config';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { FocusDirective } from '../shared/directives/focus.directive';
import { NumberOnlyDirective } from '../shared/directives/number-only.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AboutTextComponent } from '../shared/components/about-text/about-text.component';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, CookieModule.forRoot(), MainModule, InfiniteScrollModule],
    declarations: [AboutTextComponent, SchoolFinderComponent, FocusDirective, NumberOnlyDirective, SchoolFinderMatchRateComponent, MultiselectDropdownComponent, SchoolPreferencesComponent, JumpToSchoolComponent, FromYourProfileComponent, SaveComponent, PagerComponent, ViewSavedComponent],
    providers: [SiteCoreConfig, HttpService, BaseService, SchoolFinderMatchRateService, MultiSelectDropdownService, MultiSelectDropdownConfig, UrlBuilderService, SchoolFinderMatchRateConfig, DataService, SchoolFinderService, SchoolPreferencesConfig, PagerService, SaveService, SaveConfig],
    bootstrap: [SchoolFinderComponent]
})

export class SchoolFinderModule { }