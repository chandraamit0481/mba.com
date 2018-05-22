import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { OverviewComponent } from "./overview.component";
import { programOverviewSample, programTutionData } from "../../test-mock-up/program-overview";
let component: OverviewComponent;
let fixture: ComponentFixture<OverviewComponent>;
let page: Page;

describe('OverviewComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OverviewComponent]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });
    it('should have program overview data', () => {
        expect(component.programOverview).toBeTruthy();
    });

    it('should have programTest', () => {
        expect(component.programOverviewData.programTest).toBeTruthy();
    });

    it('should have programCost', () => {
        expect(component.programOverviewData.programCost).toBeTruthy();
    });

    it('Program test should have content ', () => {
        const expectedResult = programOverviewSample.programTest[0].programTestScoreAverage.value + ' ' + '-' + ' ' + programOverviewSample.programTest[0].programTestIdLookupName.value;
        const actualResult = (page.programTest[0].querySelectorAll('li')[0].textContent).trim();
        expect(expectedResult).toContain(actualResult);
    });

    it('Program Admission should have heading ', () => {
        const expectedResult = "Admissions";
        const actualResult = page.programTest[0].querySelector('h1').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('Program Tution should have heading ', () => {
        const expectedResult = "Tuition";
        const actualResult = page.programCost[0].querySelector('h1').textContent;
        expect(expectedResult).toContain(actualResult);
    });
    
    it('Program Admission should have programWorkExperience ', () => {
        const expectedResult = programOverviewSample.programWorkExperience[0].programWorkExperienceYears.value + ' yrs' + ' ' + '-' + ' ' + programOverviewSample.programWorkExperience[0].programWorkExperienceTypeIdLookupName.value + ' ' + 'work experience';
        const actualResult = page.workExperience[0].querySelectorAll('li')[0].textContent;
        expect(expectedResult.trim()).toContain(actualResult.trim());
    });

    it('Program Admission should have employmentData ', () => {
        const expectedResult = programOverviewSample.programEmployment[0].programEmploymentWithinXMonths.value + '%' + ' ' + '-' + ' ' + 'Graduates offered employment within' + ' ' + programOverviewSample.programEmployment[0].programEmploymentMonths.value + ' ' + 'months';
        const actualResult = page.employmentData[0].querySelectorAll('li')[0].textContent;
        expect(expectedResult.trim()).toContain(actualResult.trim());
    });

    it('Program Admission should have Class size ', () => {
        const expectedResult = programOverviewSample.programSizeAverage + ' ' + '-' + ' ' + 'Average class size' ;
        const actualResult = page.programSizeAverage[0].querySelectorAll('li')[0].textContent;
        expect(expectedResult.trim()).toContain(actualResult.trim());
    });

    it('Program Admission should have Credits Required ', () => {
        const expectedResult = programOverviewSample.programCreditsRequired + ' ' + '-' + ' ' + 'Credits required';
        const actualResult = page.programCreditsRequired[0].querySelectorAll('li')[0].textContent;
        expect(expectedResult.trim()).toContain(actualResult.trim());
    });

    it('Program test should have content ', () => {
        const expectedResult = '$' + programOverviewSample.programCost[0].programCostAmount.value + ' ' + '(' + programOverviewSample.programCost[0].programCostCurrencyIdLookupName.value + ')' + ' ' + '-' + ' ' + programOverviewSample.programCost[0].programCostPeriodIdLookupName.value + ';' + ' ' + programOverviewSample.programCost[0].programCostCategoryIdLookupName.value;
        const actualResult = page.programCost[0].querySelectorAll('li')[0].textContent;
        expect(expectedResult.trim()).toContain(actualResult.trim());
    });

    it('Program tution should have content ', () => {
        const expectedResult = programTutionData[0];
        const actualResult = page.tutionData[0].querySelectorAll('li')[0].textContent;
        expect(expectedResult.trim()).toContain(actualResult.trim());
    });

    it('Program tution should have Program is FullyFunded ', () => {
        expect(component.tutionData.length).toBe(1);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    component.programOverview = programOverviewSample;
    component.programOverviewData = programOverviewSample;
    component.tutionData = [];
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    programCost: HTMLLIElement[];
    programTest: HTMLLIElement[];
    workExperience: HTMLLIElement[];
    employmentData: HTMLLIElement[];
    programSizeAverage: HTMLLIElement[];
    programCreditsRequired: HTMLLIElement[];
    tutionData: HTMLLIElement[];
    constructor() {
        this.programCost = fixture.debugElement.queryAll(By.css('div.cost')).map(de => de.nativeElement);
        this.workExperience = fixture.debugElement.queryAll(By.css('ul.workExperience')).map(de => de.nativeElement);
        this.employmentData = fixture.debugElement.queryAll(By.css('ul.employmentData')).map(de => de.nativeElement);
        this.programSizeAverage = fixture.debugElement.queryAll(By.css('ul.size')).map(de => de.nativeElement);
        this.programCreditsRequired = fixture.debugElement.queryAll(By.css('ul.credits')).map(de => de.nativeElement);
        this.programTest = fixture.debugElement.queryAll(By.css('div.test')).map(de => de.nativeElement);
        this.tutionData = fixture.debugElement.queryAll(By.css('ul.tutionData')).map(de => de.nativeElement);
    }
}