import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class SegmentationConfig extends BaseConfig {
    config = {
        home: {
            method: "segmentation-content/home",
            otherParams: ["switches"]
        },
        questions: {
            method: "segmentation-content/questions",
            otherParams: ["switches"]
        },
        results: {
            method: "segmentation-content/results",
            otherParams: ["switches"]
        },
        save: {
            post: {
                method: "coordination/segmentation",
                dataField: "segments",
                fields: ["responses", "email", "consent", "ipAddress", "identityID", "source"],
                responses: {
                    fields: []
                },
                consent: true,
                source: "MBA"
            }
        }
    };
}