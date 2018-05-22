import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ProgramsComponent } from "./programs.compnent";
import { ProgramsService } from "./programs.service";
import { programsMockData } from "../../test-mock-up/candidate-saved-program-mock";
import { ResponseObject } from "../../shared/models/response.model";
import { HttpService } from "../../shared/services/http.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { ProgramsModel } from "./programs.models";
import { By } from '@angular/platform-browser';
import { CandidateProgramConfig } from "./programs.config";
import { RouterTestingModule } from '@angular/router/testing';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/observable/forkJoin';
import { MainModule } from "../../shared/modules/main.module";
import { MockHttpService } from '../../shared/services/mock-http.services';
import { savedProgramsMockData } from '../../test-mock-up/saved-program-mock';
import { ProgramMatchesMockData } from '../../test-mock-up/program-matches-mock';
import { ProgramsMockData } from '../../test-mock-up/programs-mock';

let fixture: ComponentFixture<ProgramsComponent>,
    component: ProgramsComponent,
    element: HTMLElement,
    profileUrl: string = "http://mbadev/candidate-profile",
    programUrl: string = "http://mbadev/candidate-profile/programs",
   
    schoolProfileUrl: string = "schoolProfileUrl",
    page: Page;


describe('Programs Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MainModule],
            declarations: [ProgramsComponent],
            providers: [ProgramsService,
                {
                    provide: SiteCoreConfig, useValue: { currentAccount: { identityID: "123" }, identityKey: "1", candidateProfileUrl: profileUrl, schoolProfileUrl: schoolProfileUrl, programProfileUrl: programUrl },
                },
                { provide: HttpService, useValue: new MockHttpService({ "saved-programs": savedProgramsMockData, "programmatches": ProgramMatchesMockData, "programs": ProgramsMockData }) },

                CandidateProgramConfig
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgramsComponent);
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

    it('should match page URLs', () => {
        component.ngOnInit();
        expect(profileUrl).toBe(component.profileUrl);       

    });

    it('duration should match', () => {        
        const actualResult = component.model[0].programDuration;
        const expectedResult = page.programItem[0].querySelector('time').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });


    it('address should match', () => {
        const actualResult = component.model[0].schoolLocation.getAddress();
        const expectedResult = page.programItem[0].querySelector('.location').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

    it('address should match', () => {
        const actualResult = component.model[0].schoolLocation.getAddress();
        const expectedResult = page.programItem[0].querySelector('.location').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });
    it('program name should match', () => {
        const actualResult = component.model[0].programName;
        const expectedResult = page.programItem[0].querySelector('#programname').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

    it('school name should match', () => {
        const actualResult = component.model[0].schoolName;
        const expectedResult = page.programItem[0].querySelector('#schoolname').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

});

class Page {
    programItem: HTMLLIElement[];
    constructor() {
        this.programItem = fixture.debugElement.queryAll(By.css('div.saved-program-wrap')).map(de => de.nativeElement);
    }
}