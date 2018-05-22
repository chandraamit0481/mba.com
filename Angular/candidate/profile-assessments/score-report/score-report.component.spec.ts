import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IBaseModel } from "../../../shared/models/common.models";
import { MainModule } from '../../../shared/modules/main.module';
import { HttpService } from '../../../shared/services/http.service';
import { MockHttpService } from '../../../shared/services/mock-http.services';
import { SiteCoreConfig } from '../../../shared/config/sitecore.config';
import { ScoreReportComponent } from './score-report.compnent';
import { ScoreReportService } from './score-report.service';
import { ScoreReportConfig } from './score-report.config';
import { scoreReportsMockData } from '../../../test-mock-up/score-reports';
import { DateFormatPipe } from '../../../shared/pipes/date-format';

let component: ScoreReportComponent;
let fixture: ComponentFixture<ScoreReportComponent>;
let page: Page;

describe('Score Report Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule],
            declarations: [ScoreReportComponent],
            providers: [ScoreReportService, { provide: HttpService, useValue: new MockHttpService(scoreReportsMockData) }, SiteCoreConfig, ScoreReportConfig]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have university name', () => {
        let expectedResult = component.model[0].universityName;
        const actualResult = page.pageData[0].querySelector('.university').textContent;
        expect(actualResult).toEqual(expectedResult);

    });

    it('should have school name', () => {
        let expectedResult = component.model[0].schoolName;
        const actualResult = page.pageData[0].querySelector('.schoolname').textContent;
        expect(actualResult).toEqual(expectedResult);

    });

    it('should have requested date', () => {
        let dateFormat = new DateFormatPipe();
        let expectedResult = dateFormat.transform((component.model[0].dateTimeRequested || '').toString());
        const actualResult = page.pageData[0].querySelector('.rquested').textContent;
        expect(actualResult).toEqual(expectedResult);

    });

    it('should have fullfilled date', () => {
        let dateFormat = new DateFormatPipe();
        let expectedResult = dateFormat.transform((component.model[0].dateTimeFulfilled || '').toString());
        const actualResult = page.pageData[0].querySelector('.fulfilled').textContent;
        expect(actualResult).toEqual(expectedResult);
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ScoreReportComponent);
    component = fixture.componentInstance;
    component.appointmentId = '2591877';
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