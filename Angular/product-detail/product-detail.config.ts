import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class ProductDetailConfig extends BaseConfig {
    config = {
        productDetails: {
            productId: "",
            method: "productmatches",
            otherParams: ["switches"],
            filters: ["productId"],
            fields: ["productId", "title", "caption", "body", "productImageAltText", "productImageUrl", "onSale", "retailPrice", "price", "cartMessageBelowPrice",
                "productFormat", "cartShowAddButton", "cartAltAddToCartButtonText", "cartAltAddToCartButtonLink", "cartQuantityMaxAllowed", "sku"],
            minLimit: 1,
            alertMessage: "select a quantity"
        },
        productPurchaseConfig: {
            method: "product-purchases",
            id: "",
            filters: ["productId"]
        }
    };
    maxQuantity: number = 9;
}