import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { BottomColumnComponent } from "./bottom-column.component";
import { BottomColumnConfig } from "./bottom-column.config";
import { HomeModule } from "../home.module";
import { MainModule } from "../../shared/modules/main.module";
import { HttpService } from '../../shared/services/http.service';
import { MockHttpService } from '../../shared/services/mock-http.services';
import { featuredArticlesMockData } from '../../test-mock-up/featured-articles';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html';

let component: BottomColumnComponent;
let fixture: ComponentFixture<BottomColumnComponent>;
let page: Page;

describe('Bottom Column Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HomeModule],
            providers: [BottomColumnConfig, { provide: HttpService, useValue: new MockHttpService(featuredArticlesMockData)}]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 9 items', () => {
        component.getdata();
        expect(component.itemList.length).toBe(9);
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(BottomColumnComponent);
    component = fixture.componentInstance;
    component.item = {};
    component.item.displayType = "Topic";
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    items: HTMLLIElement[];

    constructor() {
        this.items = fixture.debugElement.queryAll(By.css('items > li')).map(de => de.nativeElement);
    }
}

