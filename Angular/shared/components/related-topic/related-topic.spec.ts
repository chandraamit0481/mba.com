import { async, ComponentFixture, getTestBed, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RelatedTopicModule } from "./related-topic.module";
import { RelatedTopicComponent } from "./related-topic.component";
import { RelatedTopicService } from "./related-topic.service";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../../services/http.service";
import { MockHttpService } from "../../services/mock-http.services";
import { relatedTopicItemMoqData } from "../../../test-mock-up/related-topic";
import { SiteCoreConfig } from "../../config/sitecore.config";

let component: RelatedTopicComponent;
let fixture: ComponentFixture<RelatedTopicComponent>;
let page: Page;

describe('Related Topic Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RelatedTopicModule],
            providers: [SiteCoreConfig, RelatedTopicService, { provide: HttpService, useValue: new MockHttpService(relatedTopicItemMoqData) }]
        }).compileComponents().then(createComponent);

    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 5 items', () => {        
        expect(component.tags.length).toBe(5);
    });

    it('should match related Li count', () => {
        const actualLiCount = page.relatedItems.length;
        expect(5).toBe(actualLiCount);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(RelatedTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    relatedItems: HTMLLIElement[];

    constructor() {
        this.relatedItems = fixture.nativeElement.querySelectorAll('.tags li');
    }
}
