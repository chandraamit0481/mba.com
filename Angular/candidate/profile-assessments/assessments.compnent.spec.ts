import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AssessmentsComponent } from "./assessments.compnent";
import { AssessmentsService } from "./assessments.service";
import { assessmentsMockData } from "../../test-mock-up/assessments-mock";
import { ResponseModel } from "../../shared/models/response.model";
import { HttpService } from "../../shared/services/http.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { AssessmentsConfig } from "./assessments.config";
import { ExamsComponent } from "./exams/exams.component";
import { RouterTestingModule } from '@angular/router/testing';
import 'rxjs/add/observable/of';
import { MockHttpService } from "../../shared/services/mock-http.services";
import { fakeAsync } from '@angular/core/testing';
import { BaseService } from '../../shared/services/base.service';
import { DataService } from '../../shared/services/share-data.service';

describe('AssessmentsComponent', () => {

    let fixture: ComponentFixture<AssessmentsComponent>,
        component: AssessmentsComponent,
        element: HTMLElement,
        debugEl: DebugElement,
        profileUrl: string = "http://mbadev/candidate-profile",
        assessmentUrl: string = "http://mbadev/candidate-profile/assessments";

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AssessmentsComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                AssessmentsService, AssessmentsConfig, DataService,
                { provide: HttpService, useValue: new MockHttpService(assessmentsMockData) },
                { provide: BaseService },
                { provide: SiteCoreConfig, useValue: { currentAccount: { gmatid: "1001001" }, candidateProfileUrl: profileUrl, candidateAssessmentUrl: assessmentUrl, apiUrl: "", candidateProfileLabels: { serviceTimeout: 0 } } }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AssessmentsComponent);
        component = fixture.componentInstance;
        component.configKey = "candidateAssessmentsConfig";
        return fixture.whenStable().then(() => {
            fixture.detectChanges();
        });
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should match past exam', fakeAsync(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.model.pastExam.length).toBe(2);
        });
    }));

    it('should match future exam', fakeAsync(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.model.futureExam.length).toBe(1);
        });
    }));

    it('should match action links', fakeAsync(() => {
        let expected: number;
        expected = 0;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            let actual = component.model.futureExam[0].fields.actions.length;
            let status = component.model.futureExam[0].fields.status.value.toUpperCase();
            if (status === "SCHEDULED" || status === "RESCHEDULED") {
                expected = 2;
            }
            expect(expected).toBe(actual);
        });
    }));
});

