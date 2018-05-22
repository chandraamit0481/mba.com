import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { HttpService } from "../../services/http.service";
import { CartModel } from '../../models/common.models';
import { BaseService } from '../../services/base.service';
import { SiteCoreConfig } from '../../config/sitecore.config';
import { AddToCartConfig } from './add-to-cart.config';
import { ProductDetailConfig } from '../../../product-detail/product-detail.config';
import { DataService } from '../../services/share-data.service';


@Injectable()
export class AddToCartService extends BaseService {
    private cartSessionKey: string = "productInformation";
    private configKey = "shoppingCart";
    constructor(private http: HttpService, private siteCoreConfig: SiteCoreConfig, private addToCartConfig: AddToCartConfig, private productDetailConfig: ProductDetailConfig, private dataService: DataService) { super(); }
    post(config): Observable<any> {
        return this.http.post(config);
    }
    get(config: any): Observable<CartModel[]> {

        return this.http.getData(config).map(response => {
            if (response && response.data[0] && response.data[0].ShoppingCart)
                return this.processResponse(response.data[0].ShoppingCart);
        })
    }

    private processResponse(data): CartModel[] {
        
        let totalCartData = [];
        for (let item of data) {
            let cartData = <CartModel>{};
            let cartItem = item.fields
            cartData.productId = this.getIntValue(cartItem.productID);
            cartData.qty = this.getIntValue(cartItem.qty);
            totalCartData.push(cartData)
        }
        return totalCartData;

    }
    getSessionData(): CartModel[] {
        return <CartModel[]>JSON.parse(sessionStorage.getItem(this.cartSessionKey));
    }

    setSessionData(cartData: CartModel[]): void {
        sessionStorage.setItem(this.cartSessionKey, JSON.stringify(cartData));
    }

    private updateVoucherQuantity(isVoucher: CartModel[], productInCart: CartModel[]) {        
        let config = this.addToCartConfig.getConfiguration('getShoppingCart');
        config.identityId = this.siteCoreConfig.currentAccount.identityID;
        this.get(config).subscribe(response => {
            for (let v of isVoucher) {
                for (let s of response) {
                    if (v.productId === s.productId && (s.qty + v.qty) > this.productDetailConfig.maxQuantity) {
                        v.qty = this.productDetailConfig.maxQuantity - s.qty;
                    }
                }
            }
            this.processPost(productInCart);
        });
    }
    private processPost(productInCart: CartModel[]) {
        let promisArr = []
        for (let item of productInCart) {
            promisArr.push(this.saveToPost(item));
        }
        Observable.forkJoin(promisArr).subscribe(resp => {
            let config = this.addToCartConfig.getConfiguration('getShoppingCart');
            config.identityId = this.siteCoreConfig.currentAccount.identityID;
            this.get(config).subscribe(response => {
                if (response) {
                    this.dataService.setOption("cartItem", response);
                }
            });
        });
    }


    saveToCart(productInCart: CartModel[]): void {
        if (productInCart && productInCart.length) {
            let isVoucher = productInCart.filter(x => x.isVoucher === true);
            if (isVoucher.length > 0) {
                this.updateVoucherQuantity(isVoucher, productInCart)
            } else {
                this.processPost(productInCart);
            }
        }
    }

    private saveToPost(item: CartModel): Observable<boolean> {
        let config = this.addToCartConfig.getPostConfiguration(this.configKey);
        config.identityId = this.siteCoreConfig.currentAccount.identityID;
        config.productId = item.productId;
        config.qty = item.qty;
        return this.post(config).map(response => {
            if ((<Response>response).status === 201) {
                if (this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.identityID) {
                    let cartData = this.getSessionData();
                    if (cartData && cartData.length > 1) {
                        let index = cartData.indexOf(item);
                        cartData.splice(index, 1);
                        this.setSessionData(cartData);
                    } else {
                        sessionStorage.removeItem(this.cartSessionKey);
                    }
                }

            }
            return true;
        });
    }
}