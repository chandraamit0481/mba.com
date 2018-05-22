import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SiteCoreConfig } from "../../config/sitecore.config";
import { CartIconConfig } from "./cart-icon.config";
import { CartIconComponent } from "./cart-icon.component";
import { HttpService } from "../../services/http.service";
import { MockHttpService } from "../../services/mock-http.services";
import { PreparationModule } from "../../../preparation/preparation.module";
import { cartCountMockData } from "../../../test-mock-up/cart-count-mock";
let component: CartIconComponent;
let fixture: ComponentFixture<CartIconComponent>;
let page: Page;

describe('Cart Icon Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PreparationModule],
            providers: [{ provide: SiteCoreConfig, useValue: { currentAccount: { identityID: "44835692" }, apiUrl: "" } },
                { provide: HttpService, useValue: new MockHttpService(cartCountMockData) },
                CartIconConfig
            ]
        }).compileComponents().then(createComponent);
    }));


    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 1 product in cart', () => {
        let actual = page.cartSpan[0].textContent;
                expect(component.count.toString()).toBe(actual);
    });

   });

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(CartIconComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    cartSpan: HTMLLIElement[];
    constructor() {
        this.cartSpan = fixture.debugElement.queryAll(By.css('span.cart-total')).map(de => de.nativeElement);
    }
}