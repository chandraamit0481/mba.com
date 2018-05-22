import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { ProfileProductService } from "./profile-products.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { ProfileProductComponent } from "./profile-products.component";
import { ProfileProductPurchaseConfig } from "./profile-products.config";
import { profileProductDataSample, profileSearchDataSample } from "../../test-mock-up/profile-product";
import { HttpService } from "../../shared/services/http.service";
import { ResponseModel } from "../../shared/models/response.model";
import { MainModule } from "../../shared/modules/main.module";
import { BaseService } from '../../shared/services/base.service';
import 'rxjs/add/operator/mergemap';
let fixture: ComponentFixture<ProfileProductComponent>;
let component: ProfileProductComponent;
let page: Page;

describe('Profile Product Component', () => {
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [MainModule],
            providers: [ProfileProductService, { provide: HttpService, useClass: MockHttpService }, { provide: SiteCoreConfig, useValue: { currentAccount: { IdentityKey: "12312" } } }, ProfileProductPurchaseConfig, BaseService],
            declarations: [ProfileProductComponent]
        }).compileComponents().then(createComponent);
    }));
    it('should have a defined component', () => {

        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have all Product Purchased items ', () => {
        expect(page.productPurchaseTest.length).toBe(2);
    });

    it('productTitle should match', () => {
        const actualResult = component.productPurchase[0].title;
        const expectedResult = page.productPurchaseTest[0].querySelector('.headline').textContent;
        expect(expectedResult).toMatch(actualResult);
    });


    it('product Format should match', () => {

        const actualResult = component.productPurchase[0].productFormatText;
        const expectedResult = page.productPurchaseTest[0].querySelector('#productFormat').textContent;
        expect(expectedResult).toMatch(actualResult);
    });

    it('productOrderId should match', () => {

        const actualResult = component.productPurchase[0].orderId;
        const expectedResult = page.productPurchaseTest[0].querySelector('#productOrderId').textContent;
        expect(expectedResult).toMatch(actualResult);
    });

    it('purchaseQuantity should match', () => {

        const actualResult = component.productPurchase[0].purchaseQuantity;
        const expectedResult = page.productPurchaseTest[0].querySelector('#purchaseQuantity').textContent;
        expect(expectedResult).toMatch(actualResult);
    });

    it('orderDate should match', () => {

        const actualResult = component.productPurchase[0].orderDate;
        const expectedResult = page.productPurchaseTest[0].querySelector('#orderDate').textContent;
        let actualResultConversion: number = new Date(actualResult).setHours(0, 0, 0, 0);
        let expectedResultConversion: number = new Date(expectedResult).setHours(0, 0, 0, 0);
        expect(actualResultConversion).toEqual(expectedResultConversion);
    });


});


function createComponent() {

    fixture = TestBed.createComponent(ProfileProductComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    productPurchaseTest: HTMLLIElement[];
    constructor() {
        this.productPurchaseTest = fixture.debugElement.queryAll(By.css('div.content-container')).map(de => de.nativeElement);
    }
}

class MockHttpService extends HttpService {
    constructor() {
        super(null, null, <SiteCoreConfig>{ apiUrl: "" }, null);
    }
    getData<T>(config: any): Observable<ResponseModel<T>> {
        let obj;
        if (config && config.method === 'search')
            obj = <ResponseModel<T>>JSON.parse(profileSearchDataSample);
        else
            obj = <ResponseModel<T>>JSON.parse(profileProductDataSample);
        return Observable.of(obj);
    }
}