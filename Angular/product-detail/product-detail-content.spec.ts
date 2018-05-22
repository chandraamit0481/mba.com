import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockHttpService } from '../shared/services/mock-http.services';
import { HttpService } from '../shared/services/http.service';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { eventDetailMockData } from '../test-mock-up/event-detail-mock';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailService } from './product-detail.service';
import { ProductDetailConfig } from './product-detail.config';
import { productDetailMockData } from '../test-mock-up/product-detail-mock';

describe('ProductDetailComponent', () => {

    let fixture: ComponentFixture<ProductDetailComponent>,
        component: ProductDetailComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductDetailComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                ProductDetailService, ProductDetailConfig,
                { provide: HttpService, useValue: new MockHttpService(productDetailMockData) },
                { provide: SiteCoreConfig, useValue: { id: 5017 } }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have events detail', () => {
        expect(component.productDetail).toBeDefined();
        expect(component.productDetail).toBeTruthy();
    });

    it('should have productId ', () => {

        let actualResult = 5017;
        expect(component.productDetail.productId).toEqual(actualResult);
    });

    it('should have  productAlertMessage', () => {
        let actualResult = "";
        expect(component.productDetail.productAlertMessage).toEqual(actualResult);
    });

    it('should have productTitle', () => {
        let actualResult = "$50.00 GMAT Exam Gift Voucher ";
        expect(component.productDetail.productTitle).toEqual(actualResult);
    });

    it('should have productCaption', () => {
        let actualResult = "";
        expect(component.productDetail.productCaption).toEqual(actualResult);
    });

    it('should have productImage', () => {
        let actualResult = "no-image";
        expect(component.productDetail.productImage).toEqual(actualResult);
    });

    it('should have productImageUrl', () => {
        let actualResult = "";
        expect(component.productDetail.productImageUrl).toEqual(actualResult);
    });

    it('should have productPrice', () => {
        let actualResult = 0;
        expect(component.productDetail.productPrice).toEqual(actualResult);
    });

    it('should have productOnsale', () => {
        let actualResult = false;
        expect(component.productDetail.productOnsale).toEqual(actualResult);
    });

    it('should have productMessageBelowPrice', () => {
        let actualResult = "+ shipping calculated at checkout";
        expect(component.productDetail.productMessageBelowPrice).toEqual(actualResult);
    });

    it('should have productFormat', () => {
        let actualResult = "";
        expect(component.productDetail.productFormat).toEqual(actualResult);
    });

});

