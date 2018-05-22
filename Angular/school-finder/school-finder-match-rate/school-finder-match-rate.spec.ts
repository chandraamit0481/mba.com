import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { SchoolFinderModule } from "../school-finder.module";
import { SchoolFinderMatchRateComponent } from "./school-finder-match-rate.component";
import { schoolFinderData } from "../../test-mock-up/school-finder";
import { SchoolFinderMatchRateService } from "./school-finder-match-rate.service";
import { SchoolFinderMatchRateConfig } from "./school-finder-match-rate.config";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { SchoolFinderModel } from "./school-finder-match-rate.model";
import { SaveModel } from "../../shared/models/common.models";
import { HttpService } from "../../shared/services/http.service";
import { ResponseModel } from "../../shared/models/response.model";
let component: SchoolFinderMatchRateComponent;
let fixture: ComponentFixture<SchoolFinderMatchRateComponent>;
let page: Page;

describe('School FinderMatch Rate Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SchoolFinderModule],
            providers: [SiteCoreConfig, SchoolFinderMatchRateService, { provide: HttpService, useValue: new MockHttpService() }, SchoolFinderMatchRateConfig]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });
    
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(SchoolFinderMatchRateComponent);
    component = fixture.componentInstance;
    component.configKey = "schoolFinder";
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    matchRate: HTMLLIElement[];
    constructor() {
        this.matchRate = fixture.debugElement.queryAll(By.css('div.match')).map(de => de.nativeElement);
    }
}

class MockHttpService extends HttpService {
    constructor() {
        super(null, null, <SiteCoreConfig>{ apiUrl: "" }, null);
    }
    getData<T>(config: any): Observable<ResponseModel<T>> {
        let obj;
        if (config && config.method === 'schoolFinder')
            obj = <ResponseModel<T>>JSON.parse(schoolFinderData);
        else
            obj = new Array<SaveModel>();
        return Observable.of(obj);
    }
}
