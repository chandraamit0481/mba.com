import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";

@Injectable()
export class ShoppingCartConfig extends BaseConfig {
    config = {
        shoppingCart: {
            method: "shopping-cart",
            filters: ["identityId"],
            id: ""
        },
        deleteItem: {
            method: "shopping-cart",
            id: "",
        },
        productConfig: {
            method: "productmatches",
            filters: ["productId"],
            fields: ["productId", "sku", "price", "thumbnailImageUrl", "thumbnailImage", "title", "onSale"],
            otherParams: ["switches"]
        }
    };

}