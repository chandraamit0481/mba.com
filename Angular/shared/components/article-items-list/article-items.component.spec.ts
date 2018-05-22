import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ArticleItemsService } from "./article-items.service";
import { EngineeringFullList, EngineeringList } from "../../../test-mock-up/engineering-paging";
import { ArticleItemsComponent } from "./article-items.component";
import { ArticleLandingModule } from "../../../article-landing/article-landing.module";
import { ArticleListConfig } from "./article-items.config";
import { PagerComponent } from "../pager/pager.component";
import { MockComponent } from "../../config/mock-component";

let component: ArticleItemsComponent;
let fixture: ComponentFixture<ArticleItemsComponent>;
let page: Page;

describe('Article bottom Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ArticleLandingModule],
            declarations: [MockComponent({ selector: "pager", inputs: ["totalItems", "rows"] })],
            providers: [{ provide: ArticleItemsService, useClass: ArticleItemsMockService }, ArticleListConfig],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(function () {
            fixture = TestBed.createComponent(ArticleItemsComponent);
            component = fixture.componentInstance;
            component.selectedTopic = "Military";
            component.configKey = "articleBottom";

            fixture.detectChanges();

            return fixture.whenStable().then(() => {
                fixture.detectChanges();
                page = new Page();
            });
        });
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 9 items', () => {
        component.getArticleList();
        expect(component.articleItems.length).toBe(9);
    });
});

describe('Topic bottom Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ArticleLandingModule],
            providers: [{ provide: ArticleItemsService, useClass: ArticleItemsMockService }, ArticleListConfig]
        }).compileComponents().then(function () {
            fixture = TestBed.createComponent(ArticleItemsComponent);
            component = fixture.componentInstance;
            component.selectedTopic = "Engineering";
            component.configKey = "topicBottom";

            fixture.detectChanges();

            return fixture.whenStable().then(() => {
                fixture.detectChanges();
                page = new Page();
            });
        });
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 12 items', () => {
        component.getArticleList();
        expect(component.articleItems.length).toBe(12);
    });
});

class Page {
    ArticleItems: HTMLLIElement[];

    constructor() {
        this.ArticleItems = fixture.debugElement.queryAll(By.css('article')).map(de => de.nativeElement);
    }
}

class ArticleItemsMockService extends ArticleItemsService {
    constructor() {
        super(null, null);
    }

    getData(config: any): Observable<any> {
        let rows = config.pageSize;
        if (rows !== 9)
            return Observable.of(EngineeringFullList);
        else
            return Observable.of(EngineeringList);
    }
}
