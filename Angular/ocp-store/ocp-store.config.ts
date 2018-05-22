import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class OcpStoreConfig extends BaseConfig {
    config = {
        ocpStoreListing: {
            method: "productmatches",
            filters: ["productId", "showInCatalog"],
            otherParams: ["switches"],
            fields: ["productId", "sku", "price", "retailPrice", "itemUrl", "onSale", "caption", "productFormat", "bannerImageUrl", "bannerImage", , "thumbnailImageUrl",
                "thumbnailImage", "title", "cartShowAddButton", "cartAltAddToCartButtonText",
                "cartAltAddToCartButtonLink"],
            queries: ["countryName", "regionName"],
            sort: "sortOrder asc",
            showInCatalog: true

        },
        productPurchaseConfig: {
            method: "product-purchases",
            filters: ["productId"],
        }
    };
}