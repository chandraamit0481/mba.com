import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { EventSearchResultComponent } from "./event-search-result.component";
import { EventSearchResultService } from "./event-search-result.service";
import { EventSearchSample } from "../../test-mock-up/eventSearchResult";
import { EventSearchResultConfig } from "./event-search-result.config";
import { SaveEventSample } from "../../test-mock-up/saveEventList";
import { SaveModel } from "../../shared/models/common.models";
import { MockComponent } from "../../shared/config/mock-component";
import { TruncatePipe } from "../../shared/pipes/truncate";
import { DataService } from "../../shared/services/share-data.service";
import { BaseService } from "../../shared/services/base.service";
import { PagerService } from "../../shared/components/pager/pager.service";
import { PagerComponent } from "../../shared/components/pager/pager.component";
import { AddressDirective } from "../../shared/directives/address.directive";
import { MainModule } from "../../shared/modules/main.module";
import { SafeHtmlPipe } from '../../shared/pipes/safe-html';

let component: EventSearchResultComponent;
let fixture: ComponentFixture<EventSearchResultComponent>;
let page: Page;

describe('EventSearchResultComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule],
            declarations: [EventSearchResultComponent, AddressDirective, PagerComponent, TruncatePipe, SafeHtmlPipe, MockComponent({ selector: "save", inputs: ["id", "list", "configKey", "isLast"] })],
            providers: [SiteCoreConfig, EventSearchResultConfig, DataService, BaseService, PagerService, { provide: EventSearchResultService, useClass: EventSearchMockService }]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have event content data', () => {
        expect(component.eventResult).toBeTruthy();
    });

    it('test should have address ', () => {        
        const expectedResult = EventSearchSample[0].fields.address1.value + ',' + ' ' + EventSearchSample[0].fields.address2.value + ',' + ' ' + EventSearchSample[0].fields.eventCityName.value;
        const actualResult = page.eventAddress[0].querySelector('div.location').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have description ', () => {
        const expectedResult = EventSearchSample[0].fields.description.value + " more";
        const actualResult = page.eventDescription[0].querySelector('p.desc').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have hosts if more that one ', () => {
        const expectedResult = EventSearchSample[0].fields.eventHostName.value;
        const actualResult = page.eventAddress[0].querySelector('p').querySelector('a').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have event name ', () => {
        const expectedResult = EventSearchSample[0].fields.eventName.value;
        const actualResult = page.eventName[0].querySelector('h1').querySelector('a').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('event should have date', () => {
        let actualResult = page.eventDate[0].querySelector('p').textContent;
        expect(actualResult).toContain('November 18, 2002');
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(EventSearchResultComponent);
    component = fixture.componentInstance;
    component.eventResult = EventSearchSample;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    eventDate: HTMLLIElement[];
    eventName: HTMLLIElement[];
    eventAddress: HTMLLIElement[];
    eventEmail: HTMLLIElement[];
    eventContact: HTMLLIElement[];
    eventDescription: HTMLLIElement[];
    eventHosts: HTMLLIElement[];

    constructor() {
        this.eventDate = fixture.debugElement.queryAll(By.css('div.time')).map(de => de.nativeElement);
        this.eventAddress = fixture.debugElement.queryAll(By.css('div.collage-type')).map(de => de.nativeElement);
        this.eventHosts = fixture.debugElement.queryAll(By.css('div.host-name')).map(de => de.nativeElement);
        this.eventContact = fixture.debugElement.queryAll(By.css('p.email')).map(de => de.nativeElement);
        this.eventDescription = fixture.debugElement.queryAll(By.css('div')).map(de => de.nativeElement);
        this.eventName = fixture.debugElement.queryAll(By.css('div.content-container')).map(de => de.nativeElement);
    }
}

class EventSearchMockService extends EventSearchResultService {
    constructor() {
        super(null);
    }

    getAll(): Observable<any> {
        return Observable.of(EventSearchSample);
    }

    getSavedEvents(): Observable<SaveModel[]> {
        return Observable.of(SaveEventSample.map(response => { return response; }));
    }
}