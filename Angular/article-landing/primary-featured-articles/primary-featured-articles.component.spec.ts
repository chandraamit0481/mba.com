import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ArticleLandingModule } from "../article-landing.module";
import { inject } from "@angular/core/testing";
import { ArticleItems } from "../../test-mock-up/Article-Items";
import { Observable } from "rxjs/Observable";
import { PrimaryFeaturedArticlesComponent } from "./primary-featured-articles.component";
import { featuredArticlesMockData } from "../../test-mock-up/featured-articles";
import { FeaturedArticleService } from "./primary-featured-articles.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { ArticleLandingConfig } from "../article-landing.config";
import { MainModule } from "../../shared/modules/main.module";
import 'rxjs/add/observable/of';
import { MockHttpService } from "../../shared/services/mock-http.services";
import { HttpService } from "../../shared/services/http.service";
import { DateFormatPipe } from "../../shared/pipes/date-format";
import { TruncatePipe } from "../../shared/pipes/truncate";

let component: PrimaryFeaturedArticlesComponent;
let fixture: ComponentFixture<PrimaryFeaturedArticlesComponent>;
let page: Page;

describe('PrimaryFeaturedArticlesComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ArticleLandingModule, MainModule],
            providers: [SiteCoreConfig, FeaturedArticleService, { provide: HttpService, useValue: new MockHttpService(featuredArticlesMockData) }, ArticleLandingConfig]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have PrimaryArticleOne', () => {
        expect(component.articles.primaryArticleOne).toBeTruthy();
    });

    it('PrimaryfeaturedOne should have  published date', () => {
        let actualResult = page.primaryFeatureOne[0].querySelector('div.byline').textContent;
        let dateformatPipe = new DateFormatPipe();
        let articleFormatDate = dateformatPipe.transform(component.articles.primaryArticleOne.publishDate);
        expect(actualResult).toContain(articleFormatDate);
    });

    it('PrimaryfeaturedOne should have title', () => {
        const actualResult = page.primaryFeatureOne[0].querySelector('a').textContent;
        expect(actualResult).toEqual(component.articles.primaryArticleOne.title);
    });

    it('PrimaryfeaturedOne should have description', () => {
        const actualResult = page.primaryFeatureOne[0].querySelector('p').textContent;
        expect(actualResult).toEqual(component.articles.primaryArticleOne.description);
    });

    it('should have PrimaryArticleTwo', () => {
        expect(component.articles.primaryArticleTwo).toBeTruthy();
    });

    it('primaryFeatureTwo should have  published date', () => {
        let actualResult = page.primaryFeatureTwo[0].querySelector('time').textContent;
        let dateformatPipe = new DateFormatPipe();
        let articleFormatDate = dateformatPipe.transform(component.articles.primaryArticleTwo.publishDate);
        expect(actualResult).toContain(articleFormatDate);
    });

    it('primaryFeatureTwo should have title', () => {
        const actualResult = page.primaryFeatureTwo[0].querySelector('a').textContent;
        expect(actualResult).toContain(component.articles.primaryArticleTwo.title);
    });

    it('primaryFeatureTwo should have description', () => {
        const actualResult = page.primaryFeatureTwo[0].querySelector('p').innerHTML;
        expect(actualResult).toContain(component.articles.primaryArticleTwo.description);
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(PrimaryFeaturedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    primaryFeatureOne: HTMLLIElement[];
    primaryFeatureTwo: HTMLLIElement[];
    constructor() {
        this.primaryFeatureOne = fixture.debugElement.queryAll(By.css('article.featured-item')).map(de => de.nativeElement);
        this.primaryFeatureTwo = fixture.debugElement.queryAll(By.css('article.featured-item1')).map(de => de.nativeElement);
    }
}
