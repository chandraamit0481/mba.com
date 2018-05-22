import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PreparationModule } from "../../../preparation/preparation.module";
import { ShoppingCartDataModel } from "./shopping-cart.model";
import { ShoppingCartConfig } from "./shopping-cart.config";
import { ShoppingCartComponent } from "./shopping-cart.component";
import { HttpService } from "../../services/http.service";
import { shoppingCartMockData, quantityMockData } from "../../../test-mock-up/shopping-cart-mock";
import { MockHttpService } from "../../services/mock-http.services";
import { ShoppingCartService } from "./shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { MockComponent } from "../../config/mock-component";
import { DataService } from '../../services/share-data.service';
import { CurrencyFormatPipe } from '../../pipes/currency';
import { CurrencyPipe } from '@angular/common';
import { MainModule } from '../../modules/main.module';
import { SiteCoreConfig } from '../../config/sitecore.config';
import { CookieService } from 'ngx-cookie';

let component: ShoppingCartComponent;
let fixture: ComponentFixture<ShoppingCartComponent>;
let page: Page;


describe('Shopping Cart Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule], 
            providers: [DataService, SiteCoreConfig, CurrencyPipe, { provide: ShoppingCartService, useClass: MockShoppingCartService }, ShoppingCartConfig, { provide: CookieService }],
            declarations: [ShoppingCartComponent, CurrencyFormatPipe,
                MockComponent({
                    selector: "shopping-cart"
                })]
        }).compileComponents().then(createComponent);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingCartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        return fixture.whenStable().then(() => {
            fixture.detectChanges();
            page = new Page();
        });
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });


    it('should have a title', () => {
        const actualResult = page.shoppingCart[0].querySelector('strong').textContent;
        expect(actualResult).toEqual(component.shoppingCartDetails[0].productTitle);
    });

    it('should have a price', () => {
        const actualResult = page.shoppingCart[0].querySelector('td.price-value').textContent;
        expect(actualResult).toContain("$" + component.shoppingCartDetails[0].productPrice);
    });

    it('should have a quantity', () => {
        const actualResult = page.shoppingCart[0].querySelector('td.quantity').textContent;
        expect(actualResult).toContain(component.shoppingCartDetails[0].productQuantity);
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class MockShoppingCartService extends ShoppingCartService {

    constructor() {
        super(null, null, null);
    }
    getProducts(key: any, matchConfig: any): Observable<ShoppingCartDataModel[]> {
        let productQuantity = [];
        let shoppingCartProduct = JSON.parse(shoppingCartMockData);
        let item = this.processResponse(shoppingCartProduct, JSON.parse(quantityMockData));
        let model: ShoppingCartDataModel[];
        model = item;
        return Observable.of(model);
    }
}


class Page {
    shoppingCart: HTMLLIElement[];
    constructor() {
        this.shoppingCart = fixture.debugElement.queryAll(By.css('tbody.shopping-cart-details')).map(de => de.nativeElement);
    }
}