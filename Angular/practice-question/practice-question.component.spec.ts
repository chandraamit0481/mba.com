import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { PracticeQuestionModule } from "./practice-question.module";
import { practiceQuestionMockData } from "../test-mock-up/practice-question-mock";
import { PracticeQuestionDataModel } from "./practice-question.model";
import { PracticeQuestionComponent } from "./practice-question.component";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { PracticeQuestionConfig } from "./practice-question.config";
import { HttpService } from "../shared/services/http.service";
import { ResponseModel } from "../shared/models/response.model";
import { MockHttpService } from "../shared/services/mock-http.services";
import { SafeHtmlPipe } from "../shared/pipes/safe-html";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { inject } from "@angular/core/testing";

let component: PracticeQuestionComponent;
let fixture: ComponentFixture<PracticeQuestionComponent>;
let page: Page;

describe('Practice Question Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PracticeQuestionModule],
            providers: [{ provide: SiteCoreConfig, useValue: { apiUrl: "", currentAccount: { identityID: 46289745 } } }, PracticeQuestionConfig, { provide: HttpService, useValue: new MockHttpService(practiceQuestionMockData)}]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have matching practice question content', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
        let practiceElement = page.practiceQuestionElement;
        let practiceElementContent = practiceElement[0].querySelector('[name="rootQuestion"]').innerHTML;
        let safeHtmlPipe = new SafeHtmlPipe(domSanitizer);
        let actual: any = safeHtmlPipe.transform(practiceElementContent);
        let expected: any = safeHtmlPipe.transform(component.practiceQuestion.questionText);
        expect(expected.changingThisBreaksApplicationSecurity.trim().toString()).toEqual(actual.changingThisBreaksApplicationSecurity.trim().toString());
    }));
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(PracticeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    practiceQuestionElement: HTMLLIElement[];
    constructor() {
        this.practiceQuestionElement = fixture.debugElement.queryAll(By.css('div.question')).map(de => de.nativeElement);
    }
}
