import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { SchoolHeaderComponent } from "./school-profile-header.component";
import { SchoolProfileModule } from "../school-profile.module";
import { schoolHeaderSample } from "../../test-mock-up/school-header";

let component: SchoolHeaderComponent;
let fixture: ComponentFixture<SchoolHeaderComponent>;
let page: Page;

describe('SchoolHeaderComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SchoolProfileModule]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have school display name', () => {
        const expectedResult = schoolHeaderSample.schoolDisplayName;
        const actualResult = page.schoolHeader[0].querySelector('h1').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have institutionName', () => {
        const expectedResult = schoolHeaderSample.institutionName;
        const actualResult = page.schoolHeader[0].querySelector('h2').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have school details', () => {
        const expectedResult = schoolHeaderSample.schoolAddressLine1 + ', ' + schoolHeaderSample.schoolAddressLine2 + ', ' + schoolHeaderSample.schoolCity + ', ' + schoolHeaderSample.schoolStateProvinceIdLookupName + ' ' + schoolHeaderSample.schoolPostalCode + ', ' + schoolHeaderSample.schoolCountryIdLookupName + schoolHeaderSample.schoolPhoneCountryCode + schoolHeaderSample.schoolPhoneNumber + ' ' + schoolHeaderSample.schoolWebsiteUrl;
        const actualResult = page.schoolHeader[0].querySelector('div.byline').textContent;
        expect(expectedResult.trim()).toContain(actualResult.trim());
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(SchoolHeaderComponent);
    component = fixture.componentInstance;
    component.schoolHeader = schoolHeaderSample;    
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    schoolHeader: HTMLLIElement[];
    constructor() {
        this.schoolHeader = fixture.debugElement.queryAll(By.css('div.container')).map(de => de.nativeElement);
    }
}

