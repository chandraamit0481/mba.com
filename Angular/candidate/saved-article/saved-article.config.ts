import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";
import { OperatorsEnum } from "../../shared/enums/operators.enum";


@Injectable()
export class SavedArticleConfig extends BaseConfig {
    config = {
        allSavedArticle: {
            method: "saved-articles",
            filters: ["identityId"],
            rowCount: ""
        },
        savedArticle: {
            method: "saved-articles",
            filters: ["identityId"],
            isProfile: true,
            rowCount: 2
        },
        articleDetails: {
            method: "search",
            filters: ["itemId", "contentTypeName"],
            fields: ["contentTypeName", "title", "authorName", "publishDate", "thumbnailImageUrl", "thumbnailImage", "itemUrl"],
            contentTypeName: OperatorsEnum.In + " " + "article,announcement",
            otherParams: ["pageSize", "switches"],
            sort: "publishDate desc"
        },

    };
}