import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { MockComponent } from "../../shared/config/mock-component";
import { ProductRightSectionComponent } from "./product-detail-right-section.component";
import { giftVoucherSample } from "../../test-mock-up/giftVoucherSample";
import { RangePipe } from "../../shared/pipes/range";
import { ProductDetailConfig } from "../product-detail.config";
import { CurrencyPipe } from '@angular/common';
import { CurrencyFormatPipe } from '../../shared/pipes/currency';

let component: ProductRightSectionComponent;
let fixture: ComponentFixture<ProductRightSectionComponent>;
let page: Page;

describe('Gift Voucher Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductRightSectionComponent, CurrencyFormatPipe, RangePipe,
                MockComponent({ selector: "related-content" }),
                MockComponent({ selector: "save" }),
                MockComponent({ selector: "product-select-button", inputs: ["product", "qty"] })],
            providers: [SiteCoreConfig, ProductDetailConfig, CurrencyPipe],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have message above price ', () => {
        const expectedResult = giftVoucherSample.productFormat;
        const actualResult = page.msgAbvPrice[0].querySelector('p').textContent;
        expect(expectedResult).toEqual(actualResult);
    });

    it('should have productPrice ', () => {
        if (page.rightSide && page.rightSide[0] && page.rightSide[0].querySelector('div.price').textContent) {
            const actualResult = page.rightSide[0].querySelector('div.price').textContent;
            const expectedResult = "$" + giftVoucherSample.productPrice;
            expect(expectedResult).toEqual(actualResult);
        }
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ProductRightSectionComponent);
    component = fixture.componentInstance;
    component.productContent = giftVoucherSample;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    msgAbvPrice: HTMLLIElement[];
    rightSide: HTMLLIElement[];

    constructor() {
        this.msgAbvPrice = fixture.debugElement.queryAll(By.css('div.wrap')).map(de => de.nativeElement);
        this.rightSide = fixture.debugElement.queryAll(By.css('div.shippingCheckout')).map(de => de.nativeElement);
    }
}