import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { EventsComponent } from "./events.component";
import { EventsService } from "./events.service";
import { EventsMockData } from "../../test-mock-up/candidate-saved-event-mock";
import { HttpService } from "../../shared/services/http.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { EventsModel, EventsDataModel } from "./events.models";
import { By } from '@angular/platform-browser';
import { CandidateEventConfig } from "./events.config";
import { RouterTestingModule } from '@angular/router/testing';

let fixture: ComponentFixture<EventsComponent>,
    component: EventsComponent,
    element: HTMLElement,
    profileUrl: string = "http://mbadev/candidate-profile";


describe('Events Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [EventsComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{ provide: EventsService, useClass: MockEventsService },
            { provide: SiteCoreConfig, useValue: { identityKey: "1", candidateProfileUrl: profileUrl } },
                CandidateEventConfig
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        return fixture.whenStable().then(() => {
            fixture.detectChanges();            
        });
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should match page URLs', () => {
        component.ngOnInit();
        expect(profileUrl).toBe(component.profileUrl);
    });

    it('should have a recent event', () => {        
        const expectedResult = component.model.recentEvent.length;    
        expect(expectedResult).toBe(1);
    });

    it('should have a rest event', () => {
        const expectedResult = component.model.restEvent.length;
        expect(expectedResult).toBe(1);
    });
});

class MockEventsService extends EventsService {
    constructor() {
        super(null, null);
    }
    getEvents(key: any, matchConfig: any): Observable<EventsDataModel> {
        let obj = JSON.parse(EventsMockData);
        let item = this.processResponse(obj);
        let eventModel = this.filterRecords(item);
        let model: EventsDataModel;
        model = eventModel;
        return Observable.of(model);
    }
}

