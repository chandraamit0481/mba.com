import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProductListingComponent } from "./product-listing.component";
import { HttpService } from "../../shared/services/http.service";
import { productListingMockData } from "../../test-mock-up/product-listing-mock";
import { MockHttpService } from "../../shared/services/mock-http.services";
import { MockComponent } from "../../shared/config/mock-component";
import { Observable } from 'rxjs/Observable';
import { PreparationLandingConfig } from '../preparation.config';
import { ProductListingService } from '../preparation.service';
import { DataService } from '../../shared/services/share-data.service';
import { MainModule } from '../../shared/modules/main.module';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { CurrencyFormatPipe } from '../../shared/pipes/currency';
import { CurrencyPipe } from '@angular/common';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html';

let component: ProductListingComponent;
let fixture: ComponentFixture<ProductListingComponent>;
let page: Page;

describe('Product Listing Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule],
            declarations: [ProductListingComponent, CurrencyFormatPipe, SafeHtmlPipe, MockComponent({ selector: "product-select-button", inputs: ["product"] }), MockComponent({ selector: "no-product-available" })],
            providers: [ProductListingService, CurrencyPipe, DataService, PreparationLandingConfig, SiteCoreConfig,
            { provide: HttpService, useValue: new MockHttpService(productListingMockData) },
                PreparationLandingConfig
            ]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {

        expect(component).toBeDefined();
        expect(component).toBeTruthy();

    });

    it('should have 6 product list', () => {
        let actual = page.productListingPage[0].querySelectorAll('li').length;
        expect(component.productListing.length).toBe(actual);
    });

    it('should display product price stike throu for first product', () => {
        if (page.productListingPage[0].querySelector('span.price') && page.productListingPage[0].querySelector('span.price').textContent) {
            let actualPrice = page.productListingPage[0].querySelector('span.price').textContent;
            let testPrice = "$" + component.productListing[0].productPrice.toFixed(2);
            expect(testPrice).toBe(actualPrice);
        }

    });

    it('should display product caption', () => {

        let actualCaption = page.productListingPage[0].querySelector('div.content').textContent;
        let testCaption = component.productListing[0].productCaption;
        expect(testCaption).toBe(actualCaption);
    });

    it('should display product format', () => {

        let actualFormat = page.productListingPage[0].querySelector('div.byline').textContent;
        let testFormat = "Format: " +component.productListing[0].productFormat;
        expect(testFormat.toLowerCase()).toBe(actualFormat.toLowerCase());
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
    component.selectedTopic = "All Test Sections";
    component.configKey = "productListing";
    component.ngOnInit();
    component.getProductList();
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}


class Page {
    productListingPage: HTMLLIElement[];
    constructor() {
        this.productListingPage = fixture.debugElement.queryAll(By.css('div.item-content-container')).map(de => de.nativeElement);
    }
}

