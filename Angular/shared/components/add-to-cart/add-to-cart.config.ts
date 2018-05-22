import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";

@Injectable()
export class AddToCartConfig extends BaseConfig {
    config = {
        shoppingCart: {
            post: {
                method: "shopping-cart",
                dataField: "shopping-cart",
                fields: ["identityId", "productId", "qty"],
                identityId: 0,
                productId: 0,
                qty: 0
            }            
            },
        getShoppingCart: {
            method: "shopping-cart",
            filters: ["identityId", "productId"]
        }
    };
    maxQuantity: number = 9;
    productFormat: string = "voucher"
}