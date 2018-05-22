import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FromYourProfileComponent } from "./from-your-profile.component";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { schoolProfileSample } from "../../test-mock-up/school-profile";
import { SchoolFinderModule } from "../school-finder.module";

let component: FromYourProfileComponent;
let fixture: ComponentFixture<FromYourProfileComponent>;
let page: Page;

describe('fromyourprofile Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SchoolFinderModule],
            providers: [{
                provide: SiteCoreConfig, useValue: {
                    currentAccount: {}, countryName: "United state", preferredCountry: { countryName: "United state" }
                }
            }],
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('current location should be United state', () => {
        let actualValue = page.currentLocation[0].value.toString();
        expect(component.fromProfile.programLocation).toBe(actualValue);
    });

    it('year of work experience should be 0', () => {
        let actualValue = page.yearsOfExpr[0].value.toString();
        expect(component.fromProfile.programYearsWorkExperience).toBe(actualValue);
    });

    it('score should be blank', () => {
        let actualValue = page.score[0].value.toString();
        expect(component.fromProfile.programGmatScore).toBe(actualValue);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(FromYourProfileComponent);
    component = fixture.componentInstance;
    component.isLoggedIn = true;
    component.fromProfile = schoolProfileSample;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    currentLocation: HTMLLIElement[];
    yearsOfExpr: HTMLLIElement[];
    score: HTMLLIElement[];
    constructor() {
        this.currentLocation = fixture.debugElement.queryAll(By.css('#currentLocation')).map(de => de.nativeElement);
        this.score = fixture.debugElement.queryAll(By.css('#score')).map(de => de.nativeElement);
        this.yearsOfExpr = fixture.debugElement.queryAll(By.css('#yearsOfExperience')).map(de => de.nativeElement);
    }
}
