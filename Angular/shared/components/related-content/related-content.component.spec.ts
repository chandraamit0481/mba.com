import { async, ComponentFixture, getTestBed, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RelatedContentModule } from "./related-content.module";
import { RelatedContentComponent } from "./related-content.component";
import { RelatedContentService } from "./related-content.service";
import { Observable } from "rxjs/Observable";
import { RelatedContentItem } from "../../../test-mock-up/related-content";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { HttpService } from "../../services/http.service";
import { MockHttpService } from "../../services/mock-http.services";
import { BaseService } from '../../services/base.service';

let component: RelatedContentComponent;
let fixture: ComponentFixture<RelatedContentComponent>;
let page: Page;

describe('RelatedContentComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RelatedContentModule],
            providers: [SiteCoreConfig, BaseService,
                { provide: HttpService, useValue: new MockHttpService(RelatedContentItem) },
            ]
        }).compileComponents().then(createComponent);

    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 5 items', () => {

        expect(component.relatedContent.length).toBe(5);
    });

    it('should match related content', () => {

        const firstAtualRelatedContentForAssessment = page.relatedItems[0].querySelector('h6.topic').textContent;
        const firstExpectedRelatedContentForAssessment = component.relatedContent[0].fields.contentTypeName.value;
        expect(firstExpectedRelatedContentForAssessment).toBe(firstAtualRelatedContentForAssessment);

        const firstAtualRelatedContentForArticle = page.relatedItems[1].querySelector('div.topic').textContent;
        const firstExpectedRelatedContentForArticle = component.relatedContent[1].fields.contentTypeName.value;
        expect(firstExpectedRelatedContentForArticle).toBe(firstAtualRelatedContentForArticle);

        const firstAtualRelatedContentForProgram = page.relatedItems[2].querySelector('div.topic').textContent;
        const firstExpectedRelatedContentForProgram = component.relatedContent[2].fields.contentTypeName.value;
        expect(firstExpectedRelatedContentForProgram).toBe(firstAtualRelatedContentForProgram);

        const firstAtualRelatedContentForEvent = page.relatedItems[3].querySelector('div.topic').textContent;
        const firstExpectedRelatedContentForEvent = component.relatedContent[3].fields.contentTypeName.value;
        expect(firstExpectedRelatedContentForEvent).toBe(firstAtualRelatedContentForEvent);

        const firstAtualRelatedContentForProduct = page.relatedItems[4].querySelector('h6.product').textContent;
        const firstExpectedRelatedContentForProduct = component.relatedContent[4].fields.contentTypeName.value;
        expect(firstExpectedRelatedContentForProduct).toBe(firstAtualRelatedContentForProduct);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(RelatedContentComponent);
    component = fixture.componentInstance;

    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    relatedItems: HTMLLIElement[];

    constructor() {
        this.relatedItems = fixture.debugElement.queryAll(By.css('div.relArticle')).map(de => de.nativeElement);
    }
}

