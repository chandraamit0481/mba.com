import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { Observable } from "rxjs/Observable";
import { EventSearchLeftComponent } from "./event-search-left.component";
import { HttpService } from "../../shared/services/http.service";
import { IApiKeys, ILocation } from "../../shared/modules/map/map.models";
import { FormsModule } from '@angular/forms';
import { DataService } from "../../shared/services/share-data.service";
import { BaseService } from "../../shared/services/base.service";
import { MainModule } from '../../shared/modules/main.module';
import 'rxjs/add/observable/of';
import { MockHttpService } from '../../shared/services/mock-http.services';
import { googleMapMockData } from '../../test-mock-up/google-map-mock';
import { MapModule } from '../../shared/modules/map/map.module';
import { MyDatePickerModule } from 'mydatepicker';
import { CookieModule } from 'ngx-cookie';

let component: EventSearchLeftComponent;
let fixture: ComponentFixture<EventSearchLeftComponent>;
let page: Page;

describe('EventSearchLeft Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, MainModule, MapModule, MyDatePickerModule, CookieModule.forRoot()],
            declarations: [EventSearchLeftComponent],
            providers: [DataService, BaseService,
                {
                    provide: SiteCoreConfig,
                    useValue: {
                        currentAccount: {},
                        currentLocation: '{"CountryID":{"value":"2000062"},"countryName":{"value":"United States"},"regionID":{"value":"660015"},"regionName":{"value":"United States"},"stateProvinceName":{"value":"Virginia"},"cityName":{"value":"Ashburn"},"latitude":{"value":"39.03408"},"longitude":{"value":"-77.4885"}}'
                    }
                },
                { provide: HttpService, useValue: new MockHttpService(googleMapMockData) }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('Keyword entered in the search box', () => {
        let actualValue = page.keyword[0].value.toString();
        expect(component.keyword).toBe(actualValue);
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {

    fixture = TestBed.createComponent(EventSearchLeftComponent);
    component = fixture.componentInstance;
    component.keyword = "visit";
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    location: HTMLLIElement[];
    keyword: HTMLLIElement[];
    constructor() {
        this.location = fixture.debugElement.queryAll(By.css('#location')).map(de => de.nativeElement);
        this.keyword = fixture.debugElement.queryAll(By.css('#keyword')).map(de => de.nativeElement);
    }
}