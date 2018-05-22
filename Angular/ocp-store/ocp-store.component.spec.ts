import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OcpStoreComponent } from "./ocp-store.component";
import { HttpService } from "../shared/services/http.service";
import { productListingMockData } from "../test-mock-up/product-listing-mock";
import { MockHttpService } from "../shared/services/mock-http.services";
import { MockComponent } from "../shared/config/mock-component";
import { Observable } from 'rxjs/Observable';
import { OcpStoreConfig } from './ocp-store.config';
import { OcpStoreService } from './ocp-store.service';
import { DataService } from '../shared/services/share-data.service';
import { MainModule } from '../shared/modules/main.module';
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { CurrencyFormatPipe } from '../shared/pipes/currency';
import { CurrencyPipe } from '@angular/common';

let component: OcpStoreComponent;
let fixture: ComponentFixture<OcpStoreComponent>;
let page: Page;

describe('OCP store Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule],
            declarations: [OcpStoreComponent, CurrencyFormatPipe, MockComponent({ selector: "product-select-button", inputs: ["product"] }), MockComponent({ selector: "no-product-available" }), MockComponent({ selector: "cart-icon" }), MockComponent({ selector: "shopping-cart" })],
            providers: [OcpStoreService, CurrencyPipe, DataService, OcpStoreConfig, SiteCoreConfig,
            { provide: HttpService, useValue: new MockHttpService(productListingMockData) },
                OcpStoreConfig
            ]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {

        expect(component).toBeDefined();
        expect(component).toBeTruthy();

    });

    it('should have 6 ocp product list', () => {
        let actual = page.OcpStoreListingPage[0].querySelectorAll('li').length;
        expect(component.ocpStoreListing.length).toBe(actual);
    });

    it('should display ocp product price stike throu for first product', () => {
        if (page.OcpStoreListingPage[0].querySelector('span.price') && page.OcpStoreListingPage[0].querySelector('span.price').textContent) {
            let actualPrice = page.OcpStoreListingPage[0].querySelector('span.price').textContent;
            let testPrice = "$" + component.ocpStoreListing[0].productPrice.toFixed(2);
            expect(testPrice).toBe(actualPrice);
        }

    });

    it('should display ocp product caption', () => {

        let actualCaption = page.OcpStoreListingPage[0].querySelector('div.content').textContent;
        let testCaption = component.ocpStoreListing[0].productCaption;
        expect(testCaption).toBe(actualCaption);
    });

    it('should display ocp product format', () => {

        let actualFormat = page.OcpStoreListingPage[0].querySelector('div.byline').textContent;
        let testFormat = "Format: " + component.ocpStoreListing[0].productFormat;
        expect(testFormat).toBe(actualFormat);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(OcpStoreComponent);
    component = fixture.componentInstance;  
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}


class Page {
    OcpStoreListingPage: HTMLLIElement[];
    constructor() {
        this.OcpStoreListingPage = fixture.debugElement.queryAll(By.css('div.item-container')).map(de => de.nativeElement);
    }
}

