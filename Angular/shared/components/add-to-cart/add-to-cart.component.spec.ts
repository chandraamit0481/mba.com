import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { AddToCartService } from "./add-to-cart.service";
import { AddToCartConfig } from "./add-to-cart.config";
import { AddToCartComponent } from "./add-to-cart.component";
import { CartModel } from "../../models/common.models";
import { DataService } from '../../services/share-data.service';
import { HttpService } from '../../services/http.service';
import { MockHttpService } from '../../services/mock-http.services';
import { MockComponent } from '../../config/mock-component';
import { ProductDetailConfig } from '../../../product-detail/product-detail.config';
import { CookieService } from 'ngx-cookie';

let component: AddToCartComponent;
let fixture: ComponentFixture<AddToCartComponent>;
let page: Page;
let qty: number = 1;
describe('Add To Cart Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddToCartComponent, MockComponent({ selector: "shopping-cart" })],
            providers: [DataService, SiteCoreConfig, AddToCartConfig, ProductDetailConfig, AddToCartService, { provide: HttpService, useValue: new MockHttpService(null) }, { provide: CookieService }]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });


    it('Add to cart button title', () => {
        const expectedResult = "Add to cart";
        const actualResult = page.addToCartPage[0].querySelector('button.button-primary').textContent;
        expect(expectedResult).toContain(actualResult);
    });

    it('should have data in session storage', () => {
        component.addToCart();
        let totalCartData = <CartModel[]>JSON.parse(sessionStorage.getItem(component.cartSessionKey));
        expect(totalCartData.length).toBe(qty);
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    component.productId = 1;
    component.qty = qty;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    addToCartPage: HTMLLIElement[];

    constructor() {
        this.addToCartPage = fixture.nativeElement.querySelectorAll('div.addToCart');
    }
}
