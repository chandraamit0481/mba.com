import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";


@Injectable()
export class RelatedTopicConfig extends BaseConfig {
    config = {
        articleTopic: {
            method: "search",
            itemId: "",
            pageSize: 7,
            fields: "contentTypeName,topicName,topicUrl,schoolName,schoolUrl",
            filters: ["itemId"],
            otherParams: ["pageSize", "switches"],
            queries: ["segmentationName"],

        }
    };
}