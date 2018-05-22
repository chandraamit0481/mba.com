import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class PreparationLandingConfig extends BaseConfig {
    config = {
        bottomConfig: {
            method: "productmatches",
            otherParams: ["switches", "showInCatalog"],
            showInCatalog: true,            
            fields: ["testSectionName"]
        },
        productPrimaryConfig: {
            method: "productmatches",
            otherParams: ["pageSize", "topResults", "switches"],
            fields: ["productId", "itemId", "sku", "price", "onSale", "itemUrl", "retailPrice", "caption", "productFormat", "bannerImageUrl",
                "bannerImage", "thumbnailImageUrl", "thumbnailImage", "title", "cartShowAddButton", "cartAltAddToCartButtonText",
                "cartAltAddToCartButtonLink"],
            queries: ["countryName", "regionName", "segmentationName"],
            filters: ["showInCatalog"],
            pageSize: "3",
            topResults: "",
            sort: "sortOrder asc",
            showInCatalog: true


        },
        productListing: {
            method: "productmatches",
            filters: ["testSectionName", "productFormat", "itemId", "showInCatalog"],
            fields: ["productId", "sku", "price", "retailPrice", "itemId", "itemUrl", "onSale", "caption", "productFormat", "bannerImageUrl", "bannerImage", "thumbnailImageUrl", "thumbnailImage", "title", "cartShowAddButton", "cartAltAddToCartButtonText",
                "cartAltAddToCartButtonLink"],
            otherParams: ["pageSize", "switches"],
            queries: ["countryName", "regionName", "segmentationName"],
            allProduct: "All Test Sections",
            sort: "sortOrder asc",
            showInCatalog: true

        },
        productPurchaseConfig: {
            method: "product-purchases",
            filters: ["productId"],
        }
    };
}