import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CartIconConfig } from "./cart-icon.config";
import { HttpService } from "../../services/http.service";
import { BaseService } from "../../services/base.service";
import { CartModel } from "../../models/common.models";

@Injectable()
export class CartIconService extends BaseService {

    constructor(private http: HttpService, private baseService: BaseService, private cartIConconfig: CartIconConfig) {
        super();
    }

    getCount(config: any): Observable<number> {
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response, "ShoppingCart")) {
                    let count = this.getShoppingCartCount(response.data[0].ShoppingCart);
                    return count;
                } else {
                    return null;
                }
            });
    }

    getCountFromSession(): number {        
        let productInformation = sessionStorage.getItem("productInformation");
        let cartCount: number = null;
        if (productInformation) {
            let cartInfo = <CartModel[]>JSON.parse(productInformation);
            if (cartInfo) {
                cartInfo.map(i => { cartCount = cartCount + Number(i.qty) });
            }
        }
        return cartCount;

    }
    private getShoppingCartCount(data: any): number {
        let cartCount: number = 0;
        if (data.length > 0) {
            for (let item of data) {
                if (item.fields) {
                    cartCount = cartCount + this.getIntValue(item.fields.qty);
                }
            }
        }
        return cartCount;
    }

}

