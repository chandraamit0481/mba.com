import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { By } from '@angular/platform-browser';
import { CandidateProfileComponent } from "./candidate-profile.compnent";
import { CandidateProfileModule } from "./candidate-profile.module";
import { HttpService } from "../shared/services/http.service";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { ResponseModel } from "../shared/models/response.model";
import { profileMockData } from "../test-mock-up/candidate-profile-info-mock";
import { APP_BASE_HREF } from '@angular/common';
import { MainModule } from '../shared/modules/main.module';
import { MockHttpService } from '../shared/services/mock-http.services';
import { DateFormatPipe } from '../shared/pipes/date-format';
import { CandidateProfileSitecoreModel } from '../shared/models/candidate-profile-sitecore.models';
import { ProfileProgressSettings } from '../shared/models/profile-pogress-settings';

let fixture: ComponentFixture<CandidateProfileComponent>,
    component: CandidateProfileComponent,
    element: HTMLElement,
    debugEl: DebugElement,
    page: Page;

describe('Candidate Profile Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CandidateProfileModule, MainModule],
            providers: [
                { provide: SiteCoreConfig, useValue: getSiteCoreMock() },
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: HttpService, useValue: new MockHttpService(profileMockData) }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CandidateProfileComponent);
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

    it('years of work experience should match', () => {
        const actualResult = (component.model.yearsOfWorkExperienceName);
        const expectedResult = page.workExperience[0].querySelector('#yearsOfWorkExperience').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('functional area experience before degree should match', () => {
        const actualResult = (component.model.functExpBeforeDegree);
        const expectedResult = page.workExperience[0].querySelector('#functExpBeforeDegree').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('Industry area experience before degree should match', () => {
        const actualResult = (component.model.indExpBeforeDegree);
        const expectedResult = page.workExperience[0].querySelector('#indExpBeforeDegree').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('military service should match', () => {
        const actualResult = (String(component.model.militaryService));
        const expectedResult = page.workExperience[0].querySelector('#militaryService').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('highest level of education attained should match', () => {
        const actualResult = (String(component.model.highestEducationLevel));
        const expectedResult = page.previousDegrees[0].querySelector('#highestEducationLevel').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('school of undergraduate/first degree should match', () => {
        const actualResult = (String(component.model.undergraduateInstitution));
        const expectedResult = page.previousDegrees[0].querySelector('#undergraduateInstitution').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('major/primary field of study should match', () => {
        const actualResult = (String(component.model.undergraduateMajor));
        const expectedResult = page.previousDegrees[0].querySelector('#undergraduateMajor').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('gpa should match', () => {
        const actualResult = (String(component.model.undergradGPA));
        const expectedResult = page.previousDegrees[0].querySelector('#undergradGPA').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('gmassOptin should match', () => {
        const actualResult = component.model.gmassOptin;
        const expectedResult = page.communicationPreferences[0].querySelector('#gmassOptin').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    //Graduate School Plan
    it('mba start date should match', () => {
        let dateFormet = new DateFormatPipe();
        const actualResult = dateFormet.transform(component.model.formattedMBAStartDate);
        const expectedResult = page.graduateschoolplan[0].querySelector('#expectedStartDate').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('mba usa study regions description should match', () => {
        const actualResult = (component.model.mbaWorldStudyRegions);
        const expectedResult = page.graduateschoolplan[0].querySelector('#mbaStudyRegions').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('mba degree pursued description should match', () => {
        const actualResult = (component.model.mbaDegreePursued);
        const expectedResult = page.graduateschoolplan[0].querySelector('#mbaDegreePursued').textContent || "";
        expect(expectedResult).toEqual(actualResult);
    });

    it('mba area of concentration description should match', () => {
        const actualResult = (component.model.mbaAreaOfConcentration);
        const expectedResult = page.graduateschoolplan[0].querySelector('#mbaAreaOfConcentration').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('gmatOptin should match', () => {
        const actualResult = component.model.gmatOptin;
        const expectedResult = page.communicationPreferences[0].querySelector('#gmatOptin').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('how MBA pursued description should match', () => {
        const actualResult = (component.model.howMBAPursued);
        const expectedResult = page.graduateschoolplan[0].querySelector('#howMBAPursued').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('full Or part Time Student description should match', () => {
        const actualResult = (component.model.fullOrPartTimeStudent);
        const expectedResult = page.graduateschoolplan[0].querySelector('#fullOrPartTimeStudent').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('work full time while pursue description should match', () => {
        const actualResult = (component.model.workFullTimeWhilePursue);
        const expectedResult = page.graduateschoolplan[0].querySelector('#workFullTimeWhilePursue').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('funct exp after degree description should match', () => {
        const actualResult = (component.model.functExpAfterDegree);
        const expectedResult = page.graduateschoolplan[0].querySelector('#functExpAfterDegree').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('ind Exp after degree description should match', () => {
        const actualResult = (component.model.indExpAfterDegree);
        const expectedResult = page.graduateschoolplan[0].querySelector('#indExpAfterDegree').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });
    //End Graduate School Plan

    it('careerOptin should match', () => {
        const actualResult = component.model.careerOptin;
        const expectedResult = page.communicationPreferences[0].querySelector('#careerOptin').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('full address should match', () => {
        const actualResult = (component.model.fullAddress);
        const expectedResult = page.personalInfo[0].querySelector('#fulladdress').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('city state province should match', () => {
        const actualResult = (component.model.cityStateProvince);
        const expectedResult = page.personalInfo[0].querySelector('#citystate').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('postal code should match', () => {
        const actualResult = (component.model.pvuePostalCode);
        const expectedResult = page.personalInfo[0].querySelector('#postalcode').textContent || "";
        expect(expectedResult).toEqual(actualResult);
    });

    it('country name should match', () => {
        const actualResult = (component.model.pvueCountryName);
        const expectedResult = page.personalInfo[0].querySelector('#country').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('phone number should match', () => {
        const actualResult = (component.model.dayPhoneNumber);
        const expectedResult = page.personalInfo[0].querySelector('#phonenumber').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('country citizenship should match', () => {
        const actualResult = (component.model.pvueCountryCitizenship);
        const expectedResult = page.personalInfo[0].querySelector('#cityzenship').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('native language should match', () => {
        const actualResult = (component.model.nativeLanguage);
        const expectedResult = page.personalInfo[0].querySelector('#language').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });

    it('email should match', () => {
        const actualResult = (component.model.email);
        const expectedResult = page.loginInfo[0].querySelector('#email').textContent || "";
        expect(expectedResult).toMatch(actualResult);
    });
});

class Page {
    previousDegrees: HTMLLIElement[];
    workExperience: HTMLLIElement[];
    graduateschoolplan: HTMLLIElement[];
    personalInfo: HTMLLIElement[];
    loginInfo: HTMLLIElement[];
    communicationPreferences: HTMLLIElement[];
    constructor() {
        this.previousDegrees = fixture.debugElement.queryAll(By.css('div.previous-degrees')).map(de => de.nativeElement);
        this.workExperience = fixture.debugElement.queryAll(By.css('div.work-experience')).map(de => de.nativeElement);
        this.graduateschoolplan = fixture.debugElement.queryAll(By.css('div.graduate-school-plan')).map(de => de.nativeElement);
        this.personalInfo = fixture.debugElement.queryAll(By.css('div.personal-info')).map(de => de.nativeElement);
        this.loginInfo = fixture.debugElement.queryAll(By.css('div.login-info')).map(de => de.nativeElement);
        this.communicationPreferences = fixture.debugElement.queryAll(By.css('div.communication-preferences')).map(de => de.nativeElement);
    }
}

function getSiteCoreMock() {
    let mock = new SiteCoreConfig();
    mock.candidateProfileLabels =<CandidateProfileSitecoreModel> {};
    mock.candidateProfileLabels.serviceTimeout = 0;
    mock.candidateProfileLabels.profileProgressSettings = <ProfileProgressSettings> { "firstName": 1, "lastName": 1, "streetAddress": 0, "city": 1, "zipOrPostalCode": 1, "country": 1, "email": 20, "phoneNumber": 1, "citizenship": 1, "firstOrNativeLanguage": 1, "expectedStartDate": 5, "preferredRegionOfStudy": 5, "degreeSought": 5, "areaOfConcentration": 5, "howPursueDegree": 5, "typeOfStudent": 5, "workPlan": 5, "desiredPostDegreeFunction": 5, "desiredPostDegreeIndustry": 5, "yearsOfExperience": 3, "functionalArea": 3, "industry": 3, "previousMilitaryExperience": 3, "highestLevelOfEductionAttained": 3, "schoolOfUndergraduateOrFirstDegree": 3, "dateOrExpectedDateOfGraduation": 3, "majorOrPrimaryFieldOfStudy": 3, "gpa": 3 };
    mock.currentAccount.isAuthenticated = true;
    mock.currentAccount.identityID = "46289745";

    return mock;
}

