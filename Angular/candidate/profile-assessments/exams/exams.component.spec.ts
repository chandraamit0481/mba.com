import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ExamsComponent } from "./exams.component";
import { IAssessmentAttributes } from "../assessments.models";
import { examMockData } from "../../../test-mock-up/assessments-mock";
import { IBaseModel } from "../../../shared/models/common.models";
import { MainModule } from '../../../shared/modules/main.module';
import { HttpService } from '../../../shared/services/http.service';
import { ExamsService } from './exams.service';
import { MockHttpService } from '../../../shared/services/mock-http.services';
import { ScoreReportKey } from '../../../test-mock-up/score-report-mock';
import { SiteCoreConfig } from '../../../shared/config/sitecore.config';
import { ExamsConfig } from './exams.config';
import { MockComponent } from '../../../shared/config/mock-component';
import { ProductPurchaseMock, productLicense } from '../../../test-mock-up/product-purchase';


let component: ExamsComponent;
let fixture: ComponentFixture<ExamsComponent>;
let page: Page;

describe('Exam Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({            
            imports: [MainModule],          
            declarations: [ExamsComponent, MockComponent({ selector: "score-report", inputs: ["appointmentId"] }), MockComponent({ selector: "apply-esr", inputs: ["appointmentId"] })],
            providers: [ExamsService, { provide: SiteCoreConfig, useValue: { currentAccount: { identityID: 43713105 }, candidateProfileLabels: { officialScoreReportsBaseURL: "" } } }, {
                provide: HttpService, useValue: new MockHttpService({
                    "official-score-report-key": ScoreReportKey, "product-purchases": ProductPurchaseMock, "license": productLicense}) }, ExamsConfig]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have exam data', () => {
        expect(component.model).toBeTruthy();
    });

    it('centername should match', () => {
        const expectedResult = component.model[0].fields.testCenterName.value;
        const actualResult = page.pageData[0].querySelector('#centername').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });
    it('location should match', () => {
        const expectedResult = component.location(component.model[0].fields);
        const actualResult = page.pageData[0].querySelector('.location').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('should have appoinment number ', () => {
        const expectedResult = component.model[0].fields.appointmentID.value;
        const actualResult = page.pageData[0].querySelector('#appointmentid').textContent || "";
        expect(actualResult).toContain(expectedResult);
    });

    it('should have date', () => {
        const expectedResult = "November 10, 1999";
        const actualResult = page.pageData[0].querySelector('#date').textContent || "";
        expect(actualResult).toContain(expectedResult);
    });

    it('should have status', () => {
        const expectedResult = component.model[0].fields.status.value;
        const actualResult = page.pageData[0].querySelector('#status').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

    it('should have get ESR code', () => {
        component.currentAppointmentId = 305750860;
        component.getESRCode(component.currentAppointmentId);        
        fixture.detectChanges();
        fixture.whenStable().then(() => {           
            const actualResult = page.pageData[0].querySelector('.activationcode').textContent || "";
            const expectedResult = component.activationCode;
            expect(expectedResult).toContain(actualResult);
        });        
    });
   

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ExamsComponent);
    component = fixture.componentInstance;
    
    component.model = <IBaseModel<IAssessmentAttributes>[]>JSON.parse(examMockData);
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    pageData: HTMLLIElement[];
    constructor() {
        this.pageData = fixture.debugElement.queryAll(By.css('div.grid-content')).map(de => de.nativeElement);
    }
}