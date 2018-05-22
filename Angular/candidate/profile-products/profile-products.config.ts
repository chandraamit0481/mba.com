import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";

@Injectable()
export class ProfileProductPurchaseConfig extends BaseConfig {
    config = {
        allProductPurchaseConfig: {
            method: "product-purchases",
            filters: ["identityId"],
            sort: "orderDate desc"
        },
        productPurchaseConfig: {
            method: "product-purchases",
            filters: ["identityId"],
            otherParams: ["pageSize"],
            pageSize: 2,
            sort: "orderDate desc",
            isProfile: true
        },
        productSearchConfig: {
            method: "productmatches",
            filters: ["productId"],
            pageSize: 100,
            fields: ["itemUrl", "productId", "deliveryFormatName", "sku","mediaFilePath"],
            otherParams: ["pageSize", "page", "switches"]
        },
        productLicenseConfig: {
            method: "license",
            filters: ["licenseKey"],
        },
        productReportConfig: {
            method: "scorereportactivation",
            filters: ["licenseID"],
        },
        productConstantConfig: {
            emptyMessage: 'You do not have any purchased products.',
            keyAllProduct: 'allProductPurchaseConfig',
            keySearchProduct: 'productSearchConfig'
        }
    };
}