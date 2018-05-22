import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergemap';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartDataModel } from "./shopping-cart.model";
import { BaseService } from "../../services/base.service";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { HttpService } from "../../services/http.service";
import { CartModel } from "../../models/common.models";
import { OperatorsEnum } from '../../enums/operators.enum';
import { CookieService } from 'ngx-cookie';


@Injectable()
export class ShoppingCartService extends BaseService {

    productData: string;

    constructor(private http: HttpService, private sitecoreConfig: SiteCoreConfig, private cookieService: CookieService) {
        super();
    }

    getProducts(configObject, shoppingCartConfigObject, cartData): Observable<ShoppingCartDataModel[]> {
       
        let model = <ShoppingCartDataModel[]>[];
        let productQuantity = [];
        configObject.identityId = this.sitecoreConfig.currentAccount.identityID;
        if (!!configObject.identityId) {
           
            return this.http.getData(configObject).mergeMap(response => {

                if (this.hasResults(response, "ShoppingCart")) {

                    let productIds = <string[]>[];
                    response.data[0]["ShoppingCart"].map(cart => {
                        productIds.push(this.getValue(cart.fields.productID));
                        let qty = {};
                        qty['productId'] = Number(this.getValue(cart.fields.productID));
                        qty['quantity'] = this.getValue(cart.fields.qty);
                        qty['cartItemId'] = Number(this.getValue(cart.id));
                        productQuantity.push(qty);
                    });
                    shoppingCartConfigObject.productId = OperatorsEnum.In + " " + productIds.join(",");
                    return this.http.getData(shoppingCartConfigObject).map(productData => {

                        model = this.processResponse(productData, productQuantity);
                        return model;
                    });
                }
                return Observable.of(null);
            });
        } else {
            
            let cartInformation = JSON.parse(sessionStorage.getItem("productInformation"));
           
            if (cartInformation) {
                let productIds = <string[]>[];
                for (let cart of cartInformation) {
                    productIds.push(String(cart.productId));
                    let qty = {};
                    qty['productId'] = Number(cart.productId);
                    qty['quantity'] = Number(cart.qty);
                    qty['cartItemId'] = 0;
                    productQuantity.push(qty);
                }
                shoppingCartConfigObject.productId = OperatorsEnum.In + " " + productIds.join(",");
                return this.http.getData(shoppingCartConfigObject).map(productData => {
                    model = this.processResponse(productData, productQuantity);
                    return model;
                });
            }

            return Observable.of(null);
        }
    }

    processResponse(productData, productQuantity): ShoppingCartDataModel[] {
        if (this.hasResults(productData)) {

            let shoppingCartModel = <ShoppingCartDataModel[]>[];
            let total: number;
            total = 0;
            let idNo: number;
            idNo = 0;
            for (let data of productData.data[0].searchResults) {

                let product = data.fields;
                let qtyItem = productQuantity.filter(x => x.productId === this.getIntValue(product.productId));
                let item = new ShoppingCartDataModel();
                item.productId = this.getValue(product.productId);               
                item.productTitle = this.getValue(product.title);  
                item.productPrice = this.getIntValue(product.price);
                item.productImageURL = this.getValue(product.thumbnailImageUrl);
                item.productImage = this.getValue(product.thumbnailImage); 
                let quantityItem = qtyItem ? qtyItem[0] : qtyItem;
                if (qtyItem && qtyItem[0]) {
                    item.productQuantity = qtyItem[0].quantity;
                    item.cartItemId = qtyItem[0].cartItemId;
                    total = Number(Number(total) + (item.productPrice) * Number(item.productQuantity));
                    item.itemTotal = total;

                }
                shoppingCartModel.push(item);
                if (idNo === 0) {
                    this.productData = "ID=" + this.getValue(product.sku) + "&AM=" + item.productQuantity;
                } else {
                    this.productData = this.productData + "&ID" + idNo + "=" + this.getValue(product.sku) + "&AM" + idNo + "=" + item.productQuantity;
                }
                idNo = idNo + 1;

            }
            return shoppingCartModel;
        }
        return null;
    }

    checkout(): Observable<any> {
        return this.http.getJSON(this.sitecoreConfig.askNetControllerUrl).map(response => {
            if (this.productData) {
                this.cookieService.put("CheckoutData", this.productData);
                response = response.indexOf('?') > -1 ? response + '&' : response + '?';
                return response + this.productData;
            }
        });
    }

    delete(configObject, id): Observable<any> {

        configObject.id = id;
        return this.http.delete(configObject)
            .map(response => {
                return response;
            });
    }
}