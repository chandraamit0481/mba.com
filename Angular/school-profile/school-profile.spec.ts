import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { MockHttpService } from '../shared/services/mock-http.services';
import { HttpService } from '../shared/services/http.service';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { SchoolProfileComponent } from './school-profile.component';
import { SchoolProfileService } from './school-profile.service';
import { BaseService } from '../shared/services/base.service';
import { SchoolProfileConfig } from './school-profile.config';
import { schoolMockData } from '../test-mock-up/school-mock-data';
import { UrlBuilderService } from '../shared/services/url-builder.service';

describe('SchoolProfileComponent', () => {

    let fixture: ComponentFixture<SchoolProfileComponent>,
        component: SchoolProfileComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SchoolProfileComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                SchoolProfileService, BaseService, SchoolProfileConfig, UrlBuilderService,
                { provide: HttpService, useValue: new MockHttpService(schoolMockData) },
                { provide: SiteCoreConfig, useValue: { id: "2005796" } }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchoolProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have events detail', () => {
        expect(component.schoolProfile).toBeDefined();
        expect(component.schoolProfile).toBeTruthy();
    });

});

