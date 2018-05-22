import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { EventDetailComponent } from './event-detail.component';
import { EventDetailService } from './event-detail.service';
import { EventDetailConfig } from './event-detail.config';
import { HttpService } from '../shared/services/http.service';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { eventDetailMockData } from '../test-mock-up/event-detail-mock';
import { eventMatchMockData } from '../test-mock-up/event-match-moqup';
import { MockHttpService } from '../shared/services/mock-http.services';

describe('EventDetailComponent', () => {

    let fixture: ComponentFixture<EventDetailComponent>,
        component: EventDetailComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventDetailComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                SiteCoreConfig, EventDetailService, EventDetailConfig,
                {
                    provide: HttpService, useValue: new MockHttpService({ "events": eventDetailMockData })
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have events detail', () => {
        expect(component.eventDetail).toBeDefined();
        expect(component.eventDetail).toBeTruthy();
    });

    it('should have events detail header', () => {
        expect(component.eventDetail.eventHeaderData).toBeDefined();
        expect(component.eventDetail.eventHeaderData).toBeTruthy();
    });

    it('should have events detail content', () => {
        expect(component.eventDetail.eventContentData).toBeDefined();
        expect(component.eventDetail.eventContentData).toBeTruthy();
    });

    it('should have host name in event header ', () => {

        let actualResult = "University of Chicago, Booth School of Business";
        expect(component.eventDetail.eventHeaderData.hostNames).toEqual(actualResult);
    });

    it('should have event name in event header', () => {
        let actualResult = "Admissions Reception";
        expect(component.eventDetail.eventHeaderData.eventName).toEqual(actualResult);
    });

    it('should have  host name in event content', () => {
        let actualResult = ["Booth School of Business"];
        expect(component.eventDetail.eventContentData.hostNames).toEqual(actualResult);
    });

    it('should have description in event content', () => {
        let actualResult = "Come hear about our Full-Time MBA program from staff and GSB alumni.";
        expect(component.eventDetail.eventContentData.description).toEqual(actualResult);
    });

    it('should have isOnLine in event content', () => {
        let actualResult = false;
        expect(component.eventDetail.eventContentData.isOnLine).toEqual(actualResult);
    });

    it('should have registrationRequired in event content', () => {
        let actualResult = "No";
        expect(component.eventDetail.eventContentData.registrationRequired).toEqual(actualResult);
    });

    it('should have emailAddress in event content', () => {
        let actualResult = "admissions@gsb.uchicago.edu";
        expect(component.eventDetail.eventContentData.emailAddress).toEqual(actualResult);
    });
});
