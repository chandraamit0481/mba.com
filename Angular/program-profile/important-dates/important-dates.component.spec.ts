import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { ImportantDates } from "./important-dates.component";
import { programImportantDatesData } from "../../test-mock-up/program-important-dates";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";

let component: ImportantDates;
let fixture: ComponentFixture<ImportantDates>;
let page: Page;

describe('ImportantDatesComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImportantDates],
            providers: [SiteCoreConfig]
        }).compileComponents().then(createComponent);
    }));
    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });
    it('Important dates should have 3 rows', () => {
        expect(page.programDescription.length).toEqual(3);
    });
    it('First row should have Start Date and Deadlines', () => {
        let firstRowData = page.programDescription[0].querySelectorAll('.col-md-3');
        const actualStartDate = firstRowData[0].textContent;
        const actualDeadlines = firstRowData[1].textContent;
        expect(actualStartDate.trim()).toEqual("September");
        expect(actualDeadlines.trim()).toEqual("July, November");
    });
    it('Second row should have Start Date and Deadlines', () => {
        let secondRowData = page.programDescription[1].querySelectorAll('.col-md-3');
        const actualStartDate = secondRowData[0].textContent;
        const actualDeadlines = secondRowData[1].textContent;
        expect(actualStartDate.trim()).toEqual("August");
        expect(actualDeadlines.trim()).toEqual("July");
    });
    it('Third row should have Start Date and Deadlines', () => {
        let thirdRowData = page.programDescription[2].querySelectorAll('.col-md-3');
        const actualStartDate = thirdRowData[0].textContent;
        const actualDeadlines = thirdRowData[1].textContent;
        expect(actualStartDate.trim()).toEqual("");
        expect(actualDeadlines.trim()).toEqual("August");
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ImportantDates);
    component = fixture.componentInstance;
    component.programImportantDates = programImportantDatesData;
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    programDescription: HTMLLIElement[];
    constructor() {
        this.programDescription = fixture.debugElement.queryAll(By.css('div.grid-content')).map(de => de.nativeElement);
    }
}