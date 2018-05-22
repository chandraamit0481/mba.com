import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";

@Injectable()
export class ArticleListConfig extends BaseConfig {

    config = {
        articleBottom: {
            method: "search",
            contentTypeName: "article",
            topicName: "",
            filters: ["contentTypeName", "text", "topicName", "itemId"],
            queries: ["countryName", "regionName", "segmentationName"],
            fields: ["title", "bannerImageUrl", "itemUrl", "publishDate", "itemId", "authorName", "body", "thumbnailImage", "thumbnailImageUrl", "topicName"],
            otherParams: ["topResults", "pageSize", "page", "switches"],
            pageSize: 9,
            column: 3,
            page: 1,
            containerClass: "item-content-container col-md-9",
            topResults: "",
            sort: "score desc",
            pagination: false,
            showSorting: true,
            showSearch: true,
            latestArticle: false
        },
        backfillArticle: {
            method: "search",
            contentTypeName: "article",
            topicName: "",
            filters: ["contentTypeName", "topicName", "itemId"],
            queries: ["countryName", "regionName", "segmentationName"],
            fields: ["title", "bannerImageUrl", "itemUrl", "publishDate", "itemId", "authorName", "body", "thumbnailImage", "thumbnailImageUrl", "topicName"],
            otherParams: ["topResults", "pageSize", "page", "switches"],
            pageSize: 9,
            page: 1,
            column: 3,
            containerClass: "item-content-container col-md-9",
            sort: "score desc",
            pagination: false,
            showSorting: true,
            showSearch: true,

        },
        topicBottom: {
            method: "search",
            contentTypeName: "article",
            queries: ["countryName", "regionName", "segmentationName"],
            filters: ["contentTypeName", "text", "topicName", "itemId"],
            fields: ["title", "bannerImageUrl", "itemUrl", "itemId", "publishDate", "authorName", "body", "topicName", "thumbnailImageUrl"],
            otherParams: ["pageSize", "topResults", "page", "switches"],
            pageSize: 12,
            column: 4,
            page: 1,
            containerClass: "item-content-container col-md-12",
            sort: "score desc",
            pagination: true,
            showSorting: true,
            showSearch: true
        },
        announcement: {
            method: "search",
            contentTypeName: "announcement",
            otherParams: ["topResults", "exclude", "switches"],
            queries: ["countryName", "regionName", "segmentationName"],
            filters: ["contentTypeName", "text", "itemId"],
            fields: ["title", "bannerImageUrl", "itemUrl", "publishDate", "itemId", "authorName", "body", "thumbnailImage", "thumbnailImageUrl", "topicName"],
            column: 3,
            page: 1,
            containerClass: "item-content-container col-md-12",
            sort: "publishDate desc",
            pagination: false,
            showSorting: false,
            showSearch: true
        },
        programProfile: {
            method: "search",
            contentTypeName: "article",
            otherParams: ["pageSize", "topResults", "exclude", "page", "switches"],
            filters: ["schoolItemId", "contentTypeName"],
            fields: ["title", "itemUrl", "publishDate", "authorName", "body", "thumbnailImage", "thumbnailImageUrl"],
            queries: ["countryName", "regionName", "segmentationName"],
            column: 3,
            page: 1,
            pageSize: 6,
            sort: "publishDate desc",
            pagination: false,
            showSorting: false,
            showSearch: false
        },
        programPreview: {
            method: "search",
            contentTypeName: "article",
            otherParams: ["pageSize", "topResults", "exclude", "page", "switches"],
            filters: ["contentTypeName"],
            fields: ["title", "itemUrl", "publishDate", "authorName", "body", "thumbnailImage", "thumbnailImageUrl"],
            queries: ["countryName", "regionName"],
            column: 3,
            page: 1,
            pageSize: 6,
            containerClass: "",
            sort: "score desc",
            pagination: false,
            showSorting: false,
            showSearch: false
        },
        schoolProfile: {
            method: "search",
            contentTypeName: "article",
            schoolItemId: "",
            filters: ["contentTypeName", "schoolItemId"],
            fields: ["title", "itemUrl", "publishDate", "authorName", "body", "thumbnailImage", "thumbnailImageUrl"],
            queries: ["countryName", "regionName", "segmentationName"],
            otherParams: ["pageSize", "page", "switches"],
            column: 3,
            page: 1,
            pageSize: 6,
            sort: "publishDate desc",
            pagination: false,
            showSorting: false
        }
    };
}