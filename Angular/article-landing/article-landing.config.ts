import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class ArticleLandingConfig extends BaseConfig {
    config = {
        bottomConfig: {
            method: "search",
            filters: ["contentTypeName"],
            queries: ["countryName", "regionName", "segmentationName"],
            fields: ["title", "bannerImageUrl", "itemUrl", "publishDate", "authorName", "body", "featureImageUrl"],
            otherParams: ["include", "pageSize", "page", "switches"],
            contentTypeName: "topic",
            pageSize: "10",
            sort: "topicArticleCount desc"
        },
        primaryConfig: {
            method: "search",
            filters: ["contentTypeName"],
            otherParams: ["topResults", "pageSize", "page", "switches"],
            fields: ["title", "bannerImageUrl", "itemUrl", "topicName", "itemId", "publishDate", "authorName", "body", "featureImageUrl", "description"],
            queries: ["topicName", "regionName", "countryName", "segmentationName"],
            contentTypeName: "article",
            pageSize: "5",
            page: "1",
        }
    };
}