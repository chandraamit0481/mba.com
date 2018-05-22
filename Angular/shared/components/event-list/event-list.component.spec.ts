import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Observable } from "rxjs/Observable";
import { EventListComponent } from "./event-list.component";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { EventListService } from "./event-list.service";
import { EventListConfig } from "./event-list.config";
import { MockComponent } from "../../config/mock-component";
import { TruncatePipe } from "../../pipes/truncate";
import { BaseService } from "../../services/base.service";
import { eventListSample } from "../../../test-mock-up/event-list";
import { savedEventsDataSample } from "../../../test-mock-up/saved-events";
import { MockHttpService } from '../../services/mock-http.services';
import { AddressDirective } from '../../directives/address.directive';
import { MainModule } from '../../modules/main.module';
import { ProfileService } from "../../services/profile.service";

let component: EventListComponent;
let fixture: ComponentFixture<EventListComponent>;
let page: Page;

describe('EventListComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule],
            declarations: [EventListComponent, TruncatePipe, AddressDirective, MockComponent({ selector: "save", inputs: ["id", "list", "configKey","isLast"] })],
            providers: [BaseService, ProfileService, { provide: SiteCoreConfig, useValue: { apiUrl: "", currentAccount: { identityID: "1234" } } }, EventListService, EventListConfig, { provide: HttpService, useValue: new MockHttpService(savedEventsDataSample) }]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 1 event', () => {

        expect(component.eventResult.length).toBe(page.eventList.length);
    });

    it('should have 2 saved events', () => {

        component.ngOnChanges({
            eventResult: new SimpleChange(null, {}, false)
        });

        let savedDataEvent = JSON.parse(savedEventsDataSample);
        expect(savedDataEvent.data[0]["saved-events"].length).toBe(component.savedEventList.length);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    component.eventResult = JSON.parse(eventListSample);
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    eventList: HTMLLIElement[];

    constructor() {
        this.eventList = fixture.debugElement.queryAll(By.css('div.event-content-wrap')).map(de => de.nativeElement);
    }
}

