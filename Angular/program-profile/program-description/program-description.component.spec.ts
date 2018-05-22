import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { ProgramDescriptionComponent } from "./program-description.component";
import { programDescriptionSample } from "../../test-mock-up/program-description";
import { programDetailSample } from "../../test-mock-up/program-details";
import { MockComponent } from "../../shared/config/mock-component";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { CandidateProfileModel } from "../../shared/models/candidate-profile.models";

let component: ProgramDescriptionComponent;
let fixture: ComponentFixture<ProgramDescriptionComponent>;
let page: Page;

describe('ProgramDescriptionComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: SiteCoreConfig, useValue: { currentAccount: { identityID: "123" } } } ],
            declarations: [ProgramDescriptionComponent, MockComponent({
                selector: "save", inputs: ["isDetail", "configKey"]
            })]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });
    it('Program Profile should have a heading for description ', () => {
        let actualResult = page.programDescription[0].querySelectorAll('h3')[0].textContent;
        expect(actualResult).toContain('Program Description ');
    });

    it('Program Profile should have heading for details  ', () => {
        const expectedResult = "Program Details ";
        const actualResult = page.programDescription[0].querySelectorAll('h3')[1].textContent;
        expect(expectedResult).toContain(actualResult);
    });
    it('Program Profile should have program overview', () => {
        const expectedResult = programDescriptionSample.programOverview;
        const actualResult = page.programDescription[0].querySelector('p').textContent;
        expect(expectedResult).toContain(actualResult);
    });
    it('should have program details', () => {
        expect(component.programDetail.length).toBe(5);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ProgramDescriptionComponent);
    component = fixture.componentInstance;
    component.programDescriptionData = programDescriptionSample;
   
    component.programDescription = programDescriptionSample;
    component.programDetailData = programDetailSample;
    component.programDetail = programDetailSample;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    programDescription: HTMLLIElement[];
    programDetail: HTMLLIElement[];
    constructor() {
        this.programDescription = fixture.debugElement.queryAll(By.css('div.prog')).map(de => de.nativeElement);
        this.programDetail = fixture.debugElement.queryAll(By.css('li.details')).map(de => de.nativeElement);
    }
}