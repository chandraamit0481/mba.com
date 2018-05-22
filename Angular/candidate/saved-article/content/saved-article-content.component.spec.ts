import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { EventsMockData } from "../../../test-mock-up/candidate-saved-event-mock";
import { HttpService } from "../../../shared/services/http.service";
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SavedArticleContentComponent } from "./saved-article-content.component";
import { SavedArticleService } from "../saved-article.service";
import { savedArticleMockData } from "../../../test-mock-up/candidate-saved-article-mock";
import { MainModule } from '../../../shared/modules/main.module';
import { SiteCoreConfig } from '../../../shared/config/sitecore.config';

let fixture: ComponentFixture<SavedArticleContentComponent>,
    component: SavedArticleContentComponent,
    element: HTMLElement,
    page: Page,
    service: SavedArticleService = new SavedArticleService(null);

describe('Profile Saved Article Content Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MainModule],
            declarations: [SavedArticleContentComponent],
            providers: [SiteCoreConfig]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SavedArticleContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.model = service.filterRecords(service.processResponse(JSON.parse(savedArticleMockData))).recentArticle;
        return fixture.whenStable().then(() => {
            fixture.detectChanges();
            page = new Page();
        });
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    
    it('article title should match', () => {
        const actualResult = component.model[0].title;
        const expectedResult = page.savedArticleTest[0].querySelector('.topic-view').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

    it('article author should match', () => {
        const actualResult = component.model[0].authorName;
        const expectedResult = page.savedArticleTest[0].querySelector('.byline').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });
    
    it('date should match', () => {
        const actualResult = "April 27, 2017";
        const expectedResult = page.savedArticleTest[0].querySelector('.byline').textContent || "";
        expect(expectedResult).toContain(actualResult);
    });

});

class Page {
    savedArticleTest: HTMLLIElement[];
    constructor() {
        this.savedArticleTest = fixture.debugElement.queryAll(By.css('div.content-container')).map(de => de.nativeElement);
    }
}
