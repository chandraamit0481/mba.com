import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";

@Injectable()
export class BottomColumnConfig extends BaseConfig {
    config = {
        Topic: {
            method: "search",
            contentTypeName: "article",
            filters: ["contentTypeName", "itemId", "topicName" ],
            queries: ["countryName", "regionName", "segmentationName"],           
            pageSize: 3,            
            sort: "publishDate desc",
            otherParams: ["topResults", "pageSize", "switches"],
            fields: ["title", "itemUrl", "itemId", "contentTypeName", "authorName", "publishDate"],
        },
        Announcements: {
            method: "search",
            contentTypeName: "announcement",
            filters: ["contentTypeName", "itemId"],
            queries: ["countryName", "regionName", "segmentationName"],
            pageSize: 3,            
            sort: "publishDate desc",
            otherParams: ["topResults", "pageSize", "switches"],
            fields: ["title", "itemUrl", "itemId", "contentTypeName", "authorName", "publishDate"],
        },
        Events: {
            method: "eventmatches",
            contentTypeName: "event",
            filters: ["contentTypeName", "eventStartDate"],
            queries: ["countryName", "regionName", "segmentationName"],
            pageSize: 3,            
            sort: "eventStartDate asc",
            otherParams: ["topResults", "pageSize", "switches"]
        }
    };
}
