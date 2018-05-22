import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { Observable } from "rxjs/Observable";
import { ResponseObject, ResponseModel } from "../../shared/models/response.model";
import { articleDataSample } from "../../test-mock-up/articles";
import { SavedArticleService } from "./saved-article.service";
import { SavedArticleComponent } from "./saved-article.component";
import { ArticleModel, ArticleDataModel } from "./saved-article.model";
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent } from "../../shared/config/mock-component";
import { SavedArticleConfig } from "./saved-article.config";
import { savedArticleMockData } from "../../test-mock-up/candidate-saved-article-mock";


let fixture: ComponentFixture<SavedArticleComponent>,
    component: SavedArticleComponent,
    element: HTMLElement,
    profileUrl: string = "http://mbadev/candidate-profile";

describe('Saved Article Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [SavedArticleComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{ provide: SavedArticleService, useClass: SavedArticleMockService },
            { provide: SiteCoreConfig, useValue: { currentAccount: { identityID: "1", candidateProfileUrl: profileUrl  } } }, SavedArticleConfig] ,    
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SavedArticleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        return fixture.whenStable().then(() => {
            fixture.detectChanges();
         });
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have a recent event', () => {
        const expectedResult = component.model.recentArticle.length;
        expect(expectedResult).toBe(1);
    });

    it('should have a rest event', () => {
        const expectedResult = component.model.restArticle.length;
        expect(expectedResult).toBe(1);
    });
});

class Page {
    savedArticleTest: HTMLLIElement[];
    constructor() {
        this.savedArticleTest = fixture.debugElement.queryAll(By.css('div.content-container')).map(de => de.nativeElement);
    }
}

class SavedArticleMockService extends SavedArticleService {
    constructor() {
        super(null);
    }

    getArticles(key: any, matchConfig: any): Observable<ArticleDataModel> {
        let obj = JSON.parse(savedArticleMockData);
        let item = this.processResponse(obj);
        let articleModel = this.filterRecords(item);
        let model: ArticleDataModel;
        model = articleModel;
        return Observable.of(model);
    }
}