import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";

@Injectable()
export class RelatedContentConfig extends BaseConfig {
    config = {
        articleDetail: {
            method: "search",
            pageSize: 4,
            filters: ["itemId"],
            queries: ["countryName", "regionName", "topicItemId", "schoolItemId"],
            otherParams: ["topResults", "pageSize", "switches"],
            fields: ["title", "eventName", "eventStartDate", "eventHostName", "eventUniversityName", "eventAddress1", "eventAddress2",
                "eventAddress3", "eventCityName", "eventStateName", "eventPostalCode", "eventCountryName", "itemUrl", "contentTypeName",
                "author", "publishDate", "thumbnailImage", "thumbnailImageUrl", "topicName", "schoolName", "eventDate", "programDisplayName",
                "programLogo", "schoolName", "programLength", "schoolUniversity", "schoolLogo", "schoolDisplayName",
                "price", "retailPrice", "PVUERegisterUrl"
            ]
        },

        productDetail: {
            method: "search",
            pageSize: 4,
            otherParams: ["topResults", "exclude", "pageSize", "switches"],
            filters: ["contentTypeName", "itemId", "showInCatalog"],
            showInCatalog: true,
            queries: ["countryName", "regionName", "segmentationName"],
            contentTypeName: "Product",
            fields: ["title", "price", "itemUrl", "contentTypeName", "thumbnailImageUrl", "thumbnailImage"]
        }, 


        assessmentProfile: {
            method: "search",
            pageSize: 2,
            filters: ["contentTypeName", "itemId"],
            otherParams: ["topResults", "pageSize", "switches"],
            queries: ["countryName", "regionName", "segmentationName"],
            fields: ["title", "itemUrl", "contentTypeName", "author", "publishDate", "thumbnailImage", "thumbnailImageUrl", "topicName", "schoolName", "eventDate"],

        },
    };
}