import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { IRPrepSigninComponent } from './ir-prep-signin.compnent';
import { MainModule } from '../shared/modules/main.module';
import { IRPrepSigninModule } from './ir-prep-signin.module';
import { HttpService } from '../shared/services/http.service';
import { MockHttpService } from '../shared/services/mock-http.services';
import { licenceSample } from '../test-mock-up/licence';
import { IRPrepKeyStatusEnum } from './ir-prep-signin.enum';
let component: IRPrepSigninComponent;
let fixture: ComponentFixture<IRPrepSigninComponent>;
let page: Page;

describe('IR Prep Sign In Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule, IRPrepSigninModule],
            providers: [{ provide: HttpService, useValue: new MockHttpService(licenceSample)}]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should match license key status', () => {
        expect(IRPrepKeyStatusEnum.Invalid).toEqual(component.keyStatus);        
    });

    it('error div should be display', () => {        
        expect(page.irPrepError.length).toEqual(1);
    });

    it('customer support div should be display', () => {
        expect(page.custSupport.length).toEqual(1);
    });
    it('storePage div should not be displayed', () => {
        expect(page.storePage.length).toEqual(0);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(IRPrepSigninComponent);
    component = fixture.componentInstance;
    component.licenseKey = "TEST-d5L1-L0r4";
    component.validateKey();
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    irPrepError: HTMLLIElement[];
    custSupport: HTMLLIElement[];
    storePage: HTMLLIElement[];
    constructor() {
        this.irPrepError = fixture.debugElement.queryAll(By.css('div#error-div')).map(de => de.nativeElement);
        this.custSupport = fixture.debugElement.queryAll(By.css('div#cust-support')).map(de => de.nativeElement);
        this.storePage = fixture.debugElement.queryAll(By.css('div#store-page')).map(de => de.nativeElement);
    }
}