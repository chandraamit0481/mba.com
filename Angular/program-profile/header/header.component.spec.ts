import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { HeaderComponent } from "./header.component";
import { programHeaderSample } from "../../test-mock-up/program-header";
import { BaseService } from "../../shared/services/base.service";

let component: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let page: Page;

describe('HeaderComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [BaseService]
        }).compileComponents().then(createComponent);

    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('HeaderComponent should have program overview', () => {
        const expectedResult = programHeaderSample.programDisplayName;
        const actualResult = page.programHeader[0].querySelector('h1').textContent;
        expect(expectedResult).toContain(actualResult);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.programHeader = programHeaderSample;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    programHeader: HTMLLIElement[];
    constructor() {
        this.programHeader = fixture.debugElement.queryAll(By.css('div.container')).map(de => de.nativeElement);
    }
}