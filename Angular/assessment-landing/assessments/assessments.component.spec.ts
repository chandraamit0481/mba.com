import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { assessmentsLandingMockData } from "../../test-mock-up/assessment-landing";
import { AssessmentsComponent } from "./assessments.component";
import { MockComponent } from "../../shared/config/mock-component";

let fixture: ComponentFixture<AssessmentsComponent>,
    component: AssessmentsComponent,
    element: HTMLElement,
    page: Page;


describe('Assessments  Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AssessmentsComponent, MockComponent({ selector: "related-content", inputs: ["relatedItemIds"] })],
            providers: [
                { provide: SiteCoreConfig, useValue: { assessments: assessmentsLandingMockData } }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AssessmentsComponent);
        component = fixture.componentInstance;
       
        fixture.detectChanges();
        return fixture.whenStable().then(() => {
            fixture.detectChanges();
            page = new Page();
        });
    });

   it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('assseement title should match', () => {
        
        const actualResult = component.assessments[0]['Title'];
        const expectedResult = page.assessmentsLanding[0].querySelector('h1').textContent;
        expect(expectedResult).toMatch(actualResult);
   });

    it('assseement tag line should match', () => {

        const actualResult = component.assessments[0]['TagLine'];
        const expectedResult = page.assessmentsLanding[0].querySelector('.byline').textContent;
        expect(expectedResult).toMatch(actualResult);
    });


});

class Page {

    assessmentsLanding: HTMLLIElement[];
    
    constructor() {
        
        this.assessmentsLanding = fixture.debugElement.queryAll(By.css('article.featured-item')).map(de => de.nativeElement);
       
    }
}