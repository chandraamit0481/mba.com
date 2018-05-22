import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { MockComponent } from "../../shared/config/mock-component";
import { ProductBottomComponent } from "./product-bottom.component";
import { ProductBottomService } from "./product-bottom.service";
import { PreparationLandingConfig } from "../preparation.config";
import { SiteCoreConfig } from '../../shared/config/sitecore.config';
import { HttpService } from '../../shared/services/http.service';
import { MockHttpService } from '../../shared/services/mock-http.services';
import { productBottomMockData } from '../../test-mock-up/product-bottom';

let component: ProductBottomComponent;
let fixture: ComponentFixture<ProductBottomComponent>;
let page: Page;

describe('ProductBottomComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [ProductBottomComponent, MockComponent({ inputs: ["SelectedTopic"] })],
            providers: [SiteCoreConfig, ProductBottomService, { provide: HttpService, useValue: new MockHttpService(productBottomMockData) }, PreparationLandingConfig],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have testSection', () => {
        let sectionCount = fixture.debugElement.nativeElement.querySelectorAll('li').length;
        expect(component.testSection.length).toBe(sectionCount);
    });

    it('First section', () => {
        const actualResult = page.testSectionName[0].querySelector('a').textContent;
        expect(actualResult).toEqual(component.testSection[0]);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ProductBottomComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    testSectionName: HTMLLIElement[];
    constructor() {
        this.testSectionName = fixture.debugElement.queryAll(By.css('ul.topics')).map(de => de.nativeElement);
    }
}
