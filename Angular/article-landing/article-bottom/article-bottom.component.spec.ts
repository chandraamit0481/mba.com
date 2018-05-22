import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ArticleBottomComponent } from "./article-bottom.component";
import { ArticleBottomService } from "./article-bottom.service";
import { topicTagMockData } from "../../test-mock-up/topic-tags";
import { HttpModule } from "@angular/http";
import { MockComponent } from "../../shared/config/mock-component";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { ArticleLandingConfig } from "../article-landing.config";
import { MainModule } from "../../shared/modules/main.module";
import 'rxjs/add/observable/of';
import { HttpService } from "../../shared/services/http.service";
import { MockHttpService } from "../../shared/services/mock-http.services";

let component: ArticleBottomComponent;
let fixture: ComponentFixture<ArticleBottomComponent>;
let page: Page;

describe('ArticleBottomComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, MainModule],
            declarations: [ArticleBottomComponent, MockComponent({ selector: "article-items", inputs: ["SelectedTopic", "IsViewAll"] })],
            providers: [ArticleBottomService, { provide: HttpService, useValue: new MockHttpService(topicTagMockData) }, SiteCoreConfig, ArticleLandingConfig],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 4 items', () => {
        expect(page.topicItemList.length).toBe(4);
    });

    it('should have First element selected', () => {
        expect(component.selectedTopic).toBe("Engineering");
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ArticleBottomComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    topicItemList: HTMLLIElement[];
    constructor() {
        this.topicItemList = fixture.debugElement.queryAll(By.css('ul.topics li')).map(de => de.nativeElement);
    }
}

