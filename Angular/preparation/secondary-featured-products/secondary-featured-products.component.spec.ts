import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SecondaryFeaturedProductComponent } from "./secondary-featured-products.component";
import { FeaturedProductsList } from "../../test-mock-up/featured-products";
import { MockComponent } from '../../shared/config/mock-component';
import { CurrencyFormatPipe } from '../../shared/pipes/currency';
import { CurrencyPipe } from '@angular/common';

let component: SecondaryFeaturedProductComponent;
let fixture: ComponentFixture<SecondaryFeaturedProductComponent>;
let page: Page;
describe('SecondaryFeaturedProductComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SecondaryFeaturedProductComponent, CurrencyFormatPipe, MockComponent({ selector: "product-select-button", inputs: ["product"] }) , MockComponent({ selector: "add-to-cart", inputs: ["configKey", "productId"] }), MockComponent({ selector: "no-product-available" })],
            providers: [CurrencyPipe]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 2 items', () => {
        let secondaryProductCount = fixture.debugElement.nativeElement.querySelectorAll('li').length;
        expect(component.secondaryProduct.length).toBe(secondaryProductCount);
    });

    it('secondaryFeature should have title', () => {
        const actualResult = page.secondaryFeature[0].querySelector('a').textContent;
        expect(actualResult).toEqual(component.secondaryProduct[0].productTitle);
    });

    it('secondaryFeature should have productPrice', () => {
        if (page.secondaryFeature[0].querySelector('div.price').textContent) {
            const actualResult = page.secondaryFeature[0].querySelector('div.price').textContent;
            expect(actualResult).toContain("$" + component.secondaryProduct[0].productPrice);
        }
    });


});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(SecondaryFeaturedProductComponent);
    component = fixture.componentInstance;
    component.secondaryProduct = FeaturedProductsList;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    secondaryFeature: HTMLLIElement[];
    constructor() {
        this.secondaryFeature = fixture.debugElement.queryAll(By.css('li.items1')).map(de => de.nativeElement);
    }
}