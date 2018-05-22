import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { PreparationLandingConfig } from "../preparation.config";
import { PrimaryFeaturedProductsComponent } from "./primary-featured-products.component";
import { PreparationModule } from "../preparation.module";
import { Products } from "../preparation.models";
import { MockHttpService } from '../../shared/services/mock-http.services';
import { productListingMockData } from '../../test-mock-up/product-listing-mock';
import { HttpService } from '../../shared/services/http.service';
import { ProductDetailConfig } from '../../product-detail/product-detail.config';
import { MockComponent } from '../../shared/config/mock-component';

let component: PrimaryFeaturedProductsComponent;
let fixture: ComponentFixture<PrimaryFeaturedProductsComponent>;
let page: Page;

describe('PrimaryFeaturedProductsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PreparationModule],
            declarations: [MockComponent({ selector: "product-select-button", inputs: ["product"] }), MockComponent({ selector: "no-product-available" })],
            providers: [{ provide: HttpService, useValue: new MockHttpService(productListingMockData) }, ProductDetailConfig]

        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have primaryProductOne', () => {
        expect(component.products.primaryProductOne).toBeTruthy();
    });

    it('primaryProductOne should hvae title', () => {
        const actualResult = page.primaryProductOne[0].querySelector('a').textContent;
        expect(actualResult).toEqual(component.primaryProductOne.productTitle);
    });

    it('primaryProductOne should have productFormat', () => {
        const actualResult = page.primaryProductOne[0].querySelector('div.byline').textContent;
        expect(actualResult).toContain(component.primaryProductOne.productFormat);
    });

    it('primaryProductOne should have productCaption', () => {
        const actualResult = page.primaryProductOne[0].querySelector('p').textContent;
        expect(actualResult).toEqual(component.primaryProductOne.productCaption);
    });

    it('should have primaryProductOne', () => {
        expect(component.products.secondaryProduct).toBeTruthy();
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(PrimaryFeaturedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    primaryProductOne: HTMLLIElement[];

    constructor() {
        this.primaryProductOne = fixture.debugElement.queryAll(By.css('article.featured-item')).map(de => de.nativeElement);

    }
}
