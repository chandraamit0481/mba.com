import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { MockComponent } from "../../shared/config/mock-component";
import { ProductDetailContentComponent } from "./product-detail-content.component";
import { productDetailSample } from "../../test-mock-up/productDetailSample";
import { SafeHtmlPipe } from '../../shared/pipes/safe-html';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { inject } from '@angular/core/testing';

let component: ProductDetailContentComponent;
let fixture: ComponentFixture<ProductDetailContentComponent>;
let page: Page;

describe('Product Detail Content Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductDetailContentComponent, SafeHtmlPipe,
                MockComponent({ selector: "related-content" }),
                MockComponent({ selector: "save" })],
            providers: [SiteCoreConfig],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have title ', () => {
        const expectedResult = productDetailSample.productTitle;
        const actualResult = page.productTitle[0].querySelector('h1.articleheading').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have caption ', () => {
        const expectedResult = productDetailSample.productCaption;
        const actualResult = page.productCaption[0].querySelector('p').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have description', inject([DomSanitizer], (domSanitizer) => {
        let safeHtmlPipe = new SafeHtmlPipe(domSanitizer);
        let productDescription: any = safeHtmlPipe.transform(productDetailSample.productDetailDescription);
        let expectedResult: string;
        if (productDescription) {
            expectedResult = productDescription.changingThisBreaksApplicationSecurity;
        }
        const actualResult = page.productCaption[0].querySelector('p.body').textContent;
        expect(expectedResult).toEqual(actualResult);
    }));
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ProductDetailContentComponent);
    component = fixture.componentInstance;
    component.productContent = productDetailSample;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    productTitle: HTMLLIElement[];
    productCaption: HTMLLIElement[];

    constructor() {
        this.productTitle = fixture.debugElement.queryAll(By.css('div.col-lg-12')).map(de => de.nativeElement);
        this.productCaption = fixture.debugElement.queryAll(By.css('div.productContent')).map(de => de.nativeElement);
    }
}