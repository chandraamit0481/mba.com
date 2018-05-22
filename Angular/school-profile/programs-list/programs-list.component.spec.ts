import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import { SchoolProfileModule } from "../school-profile.module";
import { ProgramsListService } from "./programs-list.service";
import { programListSample } from "../../test-mock-up/program-list";
import { ProgramDataModel } from "./program-list.model";
import { ProgramsListComponent } from "./programs-list.component";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { ProgramsListConfig } from "./programs-list.config";
import { ProfileService } from "../../shared/services/profile.service";
import { HttpService } from "../../shared/services/http.service";
import { Observable } from "rxjs/Observable";
import { ResponseModel } from "../../shared/models/response.model";
import { savedItemSample } from "../../test-mock-up/saved-item";
import { MockHttpService } from "../../shared/services/mock-http.services";
let component: ProgramsListComponent;
let fixture: ComponentFixture<ProgramsListComponent>;
let page: Page;

describe('Programs List Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SchoolProfileModule],
            providers: [{ provide: SiteCoreConfig, useValue: { apiUrl: "", currentAccount: { identityID: 46289745 } } }, ProgramsListConfig, ProfileService, { provide: HttpService, useValue: new MockHttpService(savedItemSample) }]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 2 programs', () => {
        expect(programListSample.length).toBe(page.programList.length);
    });

    it('should have 2 test score for 1st program', () => {
        let parentDiv = page.programList[0].querySelector('div.score');
        let testDiv = parentDiv.querySelectorAll('div.col-md-12');
        expect(programListSample[0].programTest.length).toBe(testDiv.length);
    });

    it('should have 2 test score for 2nd program', () => {
        let parentDiv = page.programList[1].querySelector('div.score');
        let testDiv = parentDiv.querySelectorAll('div.col-md-12');
        expect(programListSample[1].programTest.length).toBe(testDiv.length);
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ProgramsListComponent);
    component = fixture.componentInstance;
    component.programData = [];
    component.programData = programListSample;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    programList: HTMLLIElement[];
    constructor() {
        this.programList = fixture.debugElement.queryAll(By.css('div.program-content-wrap')).map(de => de.nativeElement);
    }
}
