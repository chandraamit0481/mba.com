import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { EventContentComponent } from "./event-detail-content.component";
import { eventDetailSample } from "../../test-mock-up/event-content";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { MockComponent } from "../../shared/config/mock-component";
import { MainModule } from '../../shared/modules/main.module';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html';

let component: EventContentComponent;
let fixture: ComponentFixture<EventContentComponent>;
let page: Page;

describe('Event Content Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule],
            declarations: [EventContentComponent, SafeHtmlPipe,
                MockComponent({ selector: "related-content" }),
                MockComponent({ selector: "map-comp" }),
                MockComponent({ selector: "save" }),
                MockComponent({ selector: "related-topic" })],
            providers: [{
                provide: SiteCoreConfig,
                useValue: {
                    labels: '{ "date": "Date", "email": "Email", "location": "Location", "isRegistrationRequired": "Is Registration required for this event?", "programs": "Participating Programs and Organizations", "moreInformation": "More Information", "website": "Website", "phone": "Phone", "time": "Time", "organizationHostingEvent": "Organization Hosting Event", "format": "Format" }'                }
            }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have event content data', () => {
        expect(component.eventContent).toBeTruthy();
    });

    it('test should have address ', () => {
        const expectedResult = eventDetailSample.address1 + eventDetailSample.address2 + eventDetailSample.address3 + eventDetailSample.eventCityName + eventDetailSample.eventStateName + eventDetailSample.eventPostalCode + eventDetailSample.eventCountryName;
        const actualResult = page.eventAddress[0].querySelector('div.address').textContent.trim();
        expect(expectedResult).toEqual(actualResult);
    });

    it('should have contact details ', () => {
        const expectedResult = eventDetailSample.phoneNumber;
        const actualResult = page.eventAddress[0].querySelector('div.email').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have description ', () => {
        const expectedResult = eventDetailSample.description;
        const actualResult = page.eventDescription[0].querySelector('p.information').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have hosts if more that one ', () => {
        const expectedResult = eventDetailSample.hostNames[0];
        const actualResult = page.eventDescription[0].querySelector('ul.eventListing').textContent;
        expect(expectedResult).toContain(actualResult);
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(EventContentComponent);
    component = fixture.componentInstance;
    component.eventContent = eventDetailSample;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    eventDate: HTMLLIElement[];
    eventTime: HTMLLIElement[];
    eventAddress: HTMLLIElement[];
    eventEmail: HTMLLIElement[];
    eventContact: HTMLLIElement[];
    eventDescription: HTMLLIElement[];
    eventHosts: HTMLLIElement[];

    constructor() {
        this.eventDate = fixture.debugElement.queryAll(By.css('div.time')).map(de => de.nativeElement);
        this.eventAddress = fixture.debugElement.queryAll(By.css('div.contact-info')).map(de => de.nativeElement);
        this.eventContact = fixture.debugElement.queryAll(By.css('div.email')).map(de => de.nativeElement);
        this.eventDescription = fixture.debugElement.queryAll(By.css('div.contact-info')).map(de => de.nativeElement);
        this.eventHosts = fixture.debugElement.queryAll(By.css('ul.content')).map(de => de.nativeElement);
    }
}