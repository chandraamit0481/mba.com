import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PagerComponent } from "./pager.component";
import { PagerService } from "./pager.service";

let component: PagerComponent;
let fixture: ComponentFixture<PagerComponent>;

describe('PagerComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PagerComponent],
            providers: [PagerService]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 5 pages', () => {
        let pagerService = new PagerService();
        component.pager = pagerService.getPager(45, 1, 10);
        component.totalItems = 45;
        fixture.detectChanges();
        this.pageElements = fixture.debugElement.queryAll(By.css('li.page-number')).map(de => de.nativeElement);
        expect(5).toEqual(this.pageElements.length);
    });

    it('should have 0 pages', () => {
        let pagerService = new PagerService();
        component.pager = pagerService.getPager(6, 1, 10);
        component.totalItems = 6;
        fixture.detectChanges();
        this.pageElements = fixture.debugElement.queryAll(By.css('li.page-number')).map(de => de.nativeElement);
        expect(0).toEqual(this.pageElements.length);
    });

    it('should have 2 pages', () => {
        let pagerService = new PagerService();
        component.pager = pagerService.getPager(11, 1, 10);
        component.totalItems = 11;
        fixture.detectChanges();
        this.pageElements = fixture.debugElement.queryAll(By.css('li.page-number')).map(de => de.nativeElement);
        expect(2).toEqual(this.pageElements.length);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
    });
}

