import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { SecondaryFeaturedArticlesComponent } from "./secondary-featured-articles.component";
import { ArticleLandingModule } from "../article-landing.module";
import { SecondaryFeaturedArticlesList } from "../../test-mock-up/secondary-featured";
import { Articles } from "../article.model";
import { DateFormatPipe } from "../../shared/pipes/date-format";

let component: SecondaryFeaturedArticlesComponent;
let fixture: ComponentFixture<SecondaryFeaturedArticlesComponent>;
let page: Page;
describe('SecondaryFeaturedArticlesComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ArticleLandingModule]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have matching items', () => {
        expect(component.secondaryArticleList.length).toBe(page.secondaryFeature.length);
    });

    it('PrimaryfeaturedOne should have  published date', () => {
        let actualResult = page.secondaryFeature[0].querySelector('time').textContent;
        let dateformatPipe = new DateFormatPipe();
        let articleFormatDate = dateformatPipe.transform(component.secondaryArticleList[0].publishDate);
        expect(actualResult).toContain(articleFormatDate);
    });

    it('PrimaryfeaturedOne should have title', () => {
        const expectedResult = SecondaryFeaturedArticlesList[0].title;
        const actualResult = page.secondaryFeature[0].querySelector('a').textContent;
        expect(expectedResult).toContain(actualResult);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(SecondaryFeaturedArticlesComponent);
    component = fixture.componentInstance;
    component.secondaryArticle = <Articles[]>SecondaryFeaturedArticlesList;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    secondaryFeature: HTMLLIElement[];
    constructor() {
        this.secondaryFeature = fixture.debugElement.queryAll(By.css('li.items1')).map(de => de.nativeElement);
    }
}