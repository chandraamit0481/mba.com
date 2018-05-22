import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { EventHeaderComponent } from "./event-detail-header.component";
import { EventHeaderSample } from "../../test-mock-up/event-header";

let component: EventHeaderComponent;
let fixture: ComponentFixture<EventHeaderComponent>;
let page: Page;

describe('EventHeaderComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventHeaderComponent]
        }).compileComponents().then(createComponent);
    }));
    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });
    it('should have event name', () => {
        const expectedResult = EventHeaderSample.eventName;
        const actualResult = page.eventHeader[0].querySelector('h1').textContent;
        expect(expectedResult).toContain(actualResult);
    });
    it('should have organisation name', () => {
        const expectedResult = EventHeaderSample.hostNames;
        const actualResult = page.eventHeader[0].querySelector('h2').textContent;
        expect(expectedResult).toContain(actualResult);
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(EventHeaderComponent);
    component = fixture.componentInstance;
    component.eventHeader = EventHeaderSample;   

    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
   eventHeader: HTMLLIElement[];
    constructor() {
        this.eventHeader = fixture.debugElement.queryAll(By.css('div.container')).map(de => de.nativeElement);
    }
}
