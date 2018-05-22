import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { SegmentationComponent } from './segmentation.compnent';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { HttpService } from '../shared/services/http.service';
import { MockHttpService } from '../shared/services/mock-http.services';
import { segmentationHomeMock, segmentationQuestionMock } from '../test-mock-up/segmentation-mock';
import { By } from '@angular/platform-browser';
import { MainModule } from '../shared/modules/main.module';
import { SegmentationModule } from './Segmentation.module';
import { SegmentationTypeEnum } from './segmentation.enum';

let component: SegmentationComponent;
let fixture: ComponentFixture<SegmentationComponent>;
let page: Page;

describe('Segmentation Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule, SegmentationModule],
            providers: [{
                provide: HttpService, useValue: new MockHttpService({ "segmentation-content/home": segmentationHomeMock, "segmentation-content/questions": segmentationQuestionMock })
            }, {
                provide: SiteCoreConfig, useValue: {}
            }]
        }).compileComponents().then(createComponent);


    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should match welcome title', () => {
        const expectedResult = component.homeModel.welcomeTitle;
        const actualResult = page.pageData[0].querySelector('.context span').textContent || "";
        expect(actualResult).toContain(expectedResult);
    });

    it('should match welcome message', () => {
        const expectedResult = component.homeModel.welcomeMessage;
        const actualResult = page.pageData[0].querySelector('.context h6').textContent || "";
        expect(actualResult).toContain(expectedResult);
    });
    it('should match logo image', () => {

        const expectedResult = component.homeModel.logoImage;
        const actualResult = page.pageData[0].querySelector('#logo img').attributes["src"].value;
        expect(actualResult).toBe(expectedResult);
    });
    it('should match button text', () => {
        const expectedResult = component.homeModel.btnNextText;
        const actualResult = page.pageData[0].querySelector('.second-col button').textContent || "";
        expect(actualResult).toContain(expectedResult);
    });

    it('should match email consent text', () => {
        component.segmentType = SegmentationTypeEnum.Email;
        const expectedResult = component.homeModel.emailConsentText;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const actualResult = page.pageData[0].querySelector('.consent-text-container h6').textContent || "";
            expect(actualResult).toContain(expectedResult);
        });
    });
    it('should match segmentType', () => {
        component.homeNextClick();
        const expectedResult = SegmentationTypeEnum.Questions;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.segmentType).toEqual(expectedResult);
        });
    });

    it('should match question options length', () => {
        component.homeNextClick();
        const expectedResult = component.questionModel.options.length;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const actualResult = page.pageData[0].querySelectorAll('.survey-row').length;
            expect(actualResult).toEqual(expectedResult);
        });
    });

    it('should match questions text', () => {
        component.homeNextClick();
        const expectedResult = component.questionModel.questionText;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const actualResult = page.pageData[0].querySelector('.survey-row>motivation').textContent || "";
            expect(actualResult).toEqual(expectedResult);
        });
    });

});
/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(SegmentationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    pageData: HTMLLIElement[];
    constructor() {
        this.pageData = fixture.debugElement.queryAll(By.css('div.modal-background')).map(de => de.nativeElement);
    }
}