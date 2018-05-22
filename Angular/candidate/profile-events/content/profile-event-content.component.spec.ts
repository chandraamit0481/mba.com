import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { EventsService } from "../events.service";
import { EventsMockData } from "../../../test-mock-up/candidate-saved-event-mock";
import { HttpService } from "../../../shared/services/http.service";
import { EventsModel, EventsDataModel } from "../events.models";
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileEventContentComponent } from "../content/profile-event-content.component";
import { MainModule } from '../../../shared/modules/main.module';
import { SiteCoreConfig } from '../../../shared/config/sitecore.config';

let fixture: ComponentFixture<ProfileEventContentComponent>,
    component: ProfileEventContentComponent,
    element: HTMLElement,
    page: Page,
    service: EventsService = new EventsService(null, null);

describe('Profile Event Content Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MainModule],
            declarations: [ProfileEventContentComponent],
            providers: [SiteCoreConfig]
            
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileEventContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.model = service.filterRecords(service.processResponse(JSON.parse(EventsMockData))).recentEvent;
        return fixture.whenStable().then(() => {
            fixture.detectChanges();
            page = new Page();
        });
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('address should match', () => {        
        const actualResult = component.model[0].eventLocation.getAddress();
        const expectedResult = page.eventItem[0].querySelector('.location').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

    it('event name should match', () => {        
        const actualResult = component.model[0].eventName;
        const expectedResult = page.eventItem[0].querySelector('#eventname').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

    it('time should match', () => {        
        const actualResult = "04:00 AM";
        const expectedResult = page.eventItem[0].querySelector('#time').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

    it('date should match', () => {
        const actualResult = "April 10, 2003";
        const expectedResult = page.eventItem[0].querySelector('.headline').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

});

class Page {
    eventItem: HTMLLIElement[];
    constructor() {
        this.eventItem = fixture.debugElement.queryAll(By.css('div.content-container')).map(de => de.nativeElement);
    }
}